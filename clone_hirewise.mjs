import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE_URL = 'https://hirewise.ie';
const OUTPUT_DIR = 'scraped_site';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const downloadFile = async (url, filepath) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filepath, buffer);
        console.log(`Downloaded: ${url} -> ${filepath}`);
        return true;
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
        return false;
    }
};

const main = async () => {
    console.log(`Starting clone of ${SITE_URL}...`);

    try {
        const response = await fetch(SITE_URL);
        let html = await response.text();
        
        // Simple regex to find assets. 
        // Note: This is not a full parser and might miss dynamic assets or some edge cases.
        // It looks for src="..." and href="..." that end in common extensions or are likely assets.
        
        const assetPatterns = [
            /<link[^>]+href=["']([^"']+)["'][^>]*>/g,
            /<script[^>]+src=["']([^"']+)["'][^>]*>/g,
            /<img[^>]+src=["']([^"']+)["'][^>]*>/g,
            /<source[^>]+src=["']([^"']+)["'][^>]*>/g
        ];

        const assetsToDownload = new Set();

        for (const pattern of assetPatterns) {
            let match;
            while ((match = pattern.exec(html)) !== null) {
                let assetUrl = match[1];
                
                // Handle relative URLs
                if (assetUrl.startsWith('/')) {
                    assetUrl = SITE_URL + assetUrl;
                } else if (!assetUrl.startsWith('http')) {
                    assetUrl = SITE_URL + '/' + assetUrl;
                }
                
                // Only download assets from the same domain or specific CDNs if desired.
                // For a clone, we usually want everything that makes the page look right.
                // But let's prioritize assets hosted on the site itself to duplicate the structure.
                
                assetsToDownload.add(assetUrl);
            }
        }

        console.log(`Found ${assetsToDownload.size} potential assets.`);

        for (const fullUrl of assetsToDownload) {
            try {
                const parsedUrl = new URL(fullUrl);
                
                // logic to decide local path
                let localPath = parsedUrl.pathname;
                if (localPath.endsWith('/')) localPath += 'index.html';
                if (localPath.startsWith('/')) localPath = localPath.substring(1);
                
                // clean query params for filename
                localPath = localPath.replace(/[:*?"<>|]/g, '_'); 

                // If it's an external asset, put it in an 'assets' folder to avoid path collision
                if (parsedUrl.origin !== new URL(SITE_URL).origin) {
                    const filename = path.basename(parsedUrl.pathname) || 'resource';
                    localPath = path.join('external_assets', parsedUrl.hostname, filename);
                }

                const outputFilePath = path.join(OUTPUT_DIR, localPath);
                
                // Download
                await downloadFile(fullUrl, outputFilePath);

                // Rewrite HTML
                // This is a naive replace, might replace unintended text, but works for most static clones.
                // We assume the original link in HTML matches exactly what we extracted or close to it.
                // Since we extracted `match[1]`, we should search for that specific string.
                
                // However, `match[1]` inside the loop was the raw string. 
                // We need to map the raw string in HTML to the new local relative path.
                
                // To do this robustly, we'd iterate the regex again or cache the matches.
                // Let's just do a simple replace of the absolute version and the relative version.
                
                const relativeLocalPath = localPath.replace(/\\/g, '/'); // Ensure forward slashes for HTML
                
                // Replace absolute URL
                html = html.split(fullUrl).join(relativeLocalPath);
                
                // Replace root-relative URL (e.g. /css/style.css)
                if (parsedUrl.origin === new URL(SITE_URL).origin) {
                     const rootRelative = parsedUrl.pathname + parsedUrl.search;
                     html = html.split(`"${rootRelative}"`).join(`"${relativeLocalPath}"`);
                     html = html.split(`'${rootRelative}'`).join(`'${relativeLocalPath}'`);
                }

            } catch (e) {
                console.error(`Skipping invalid URL: ${fullUrl}`);
            }
        }

        fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), html);
        console.log(`\nClone complete! Open ${path.join(OUTPUT_DIR, 'index.html')} to view.`);

    } catch (error) {
        console.error("Critical error:", error);
    }
};

main();
