import fs from 'fs';
import path from 'path';

const PAGES = [
    'about-us',
    'our-services',
    'testimonies',
    'jobs'
];
const BASE_URL = 'https://hirewise.ie/';
const OUTPUT_DIR = 'temp_pages';

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
}

const fetchPages = async () => {
    for (const page of PAGES) {
        try {
            const url = BASE_URL + page;
            console.log(`Fetching ${url}...`);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const html = await res.text();
            fs.writeFileSync(path.join(OUTPUT_DIR, `${page}.html`), html);
            console.log(`Saved ${page}.html`);
        } catch (e) {
            console.error(`Failed to fetch ${page}:`, e.message);
        }
    }
};

fetchPages();
