"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Search, Users, FileText, CheckCircle, TrendingUp, Clock, 
  UserCheck, ChevronRight, Edit3, MessageSquare, AlertTriangle, 
  ShieldAlert, BarChart3, BrainCircuit, X, Save, Plus, Mail
} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- Types ---

type ViewState = 'start' | 'loading' | 'dashboard';
type Chapter = 'discovery' | 'process' | 'alignment' | 'debrief' | null;

interface RoleData {
  id: string;
  title: string;
  location: string;
  salary: string;
  competition: string;
  timeToHire: string;
  availability: string;
  jd: string;
  responsibilities: string[];
  steps: ProcessStep[];
  profile: string;
  skills: string[];
}

interface ProcessStep {
  id: number;
  title: string;
  duration: string;
  type: 'screening' | 'interview' | 'assessment' | 'review' | 'offer';
  focusAreas: string[];
  questions: string[];
}

const ROLES: Record<string, RoleData> = {
  engineer: {
    id: 'engineer',
    title: 'Senior Full Stack Engineer',
    location: 'Dublin, Ireland (Hybrid)',
    salary: '€70k - €95k',
    competition: 'Very High',
    timeToHire: '45 Days',
    availability: '25%',
    jd: 'We are looking for an experienced Full Stack Engineer to join our growing team. The ideal candidate should have strong experience in modern web technologies (Python, React) and be comfortable working in an agile environment.',
    responsibilities: [
      'Design and implement scalable APIs using Python.',
      'Build responsive front-end interfaces using React.js.',
      'Collaborate with product managers and designers to define requirements.',
      'Write clean, maintainable, and testable code.'
    ],
    profile: "We're looking for a skilled full-stack developer. The ideal candidate should have strong experience in modern web technologies and be comfortable working in an agile environment.",
    skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    steps: [
        { id: 1, title: 'Application Review', duration: '2-3 days', type: 'screening', focusAreas: ['CV Match', 'Github Portfolio', 'Visa Status'], questions: [] },
        { id: 2, title: 'Phone Screening', duration: '30 mins', type: 'interview', focusAreas: ['Communication skills', 'Cultural fit', 'Motivation', 'Experience validation'], questions: ['What interests you about this role specifically?', 'Tell me about your current responsibilities and team structure.'] },
        { id: 3, title: 'Technical Assessment', duration: '1-2 hours', type: 'assessment', focusAreas: ['Technical skills', 'Problem solving', 'Code quality'], questions: ['Explain your approach to this problem and trade-offs made.', 'How would you optimize this solution for scale?'] },
        { id: 4, title: 'Final Interview', duration: '1 hour', type: 'interview', focusAreas: ['System Design', 'Team Fit', 'Leadership Potential'], questions: ['Describe a complex system you designed from scratch.', 'How do you mentor junior developers?'] },
        { id: 5, title: 'Reference Check', duration: '1-2 days', type: 'review', focusAreas: ['Background verification', 'Work History'], questions: [] },
        { id: 6, title: 'Offer Decision', duration: '1-2 days', type: 'offer', focusAreas: ['Negotiation', 'Start Date'], questions: [] },
    ]
  },
  marketing: {
    id: 'marketing',
    title: 'Product Marketing Manager',
    location: 'London, UK (Remote)',
    salary: '£60k - £85k',
    competition: 'High',
    timeToHire: '35 Days',
    availability: '40%',
    jd: 'We are seeking a creative and data-driven Product Marketing Manager to lead our market positioning and launch strategies. You will be the bridge between product development and our customers.',
    responsibilities: [
      'Develop product positioning and messaging.',
      'Manage product launches and go-to-market strategies.',
      'Conduct competitive analysis and market research.',
      'Create sales enablement materials and case studies.'
    ],
    profile: "A strategic thinker with a proven track record in B2B SaaS marketing. Excellent storytelling abilities and a data-driven approach to campaign optimization.",
    skills: ['Content Strategy', 'SEO/SEM', 'Product Launch', 'HubSpot'],
    steps: [
        { id: 1, title: 'CV Screening', duration: '1-2 days', type: 'screening', focusAreas: ['Portfolio', 'Brand Experience', 'SaaS knowledge'], questions: [] },
        { id: 2, title: 'Intro Call', duration: '20 mins', type: 'interview', focusAreas: ['Communication', 'Brand alignment', 'Salary expectations'], questions: ['Which brand launch do you admire most and why?', 'How do you handle tight deadlines?'] },
        { id: 3, title: 'Portfolio Review', duration: '45 mins', type: 'interview', focusAreas: ['Creativity', 'Strategic thinking', 'Messaging'], questions: ['Walk us through a campaign you led from start to finish.', 'How do you measure success?'] },
        { id: 4, title: 'Strategy Presentation', duration: '1 hour', type: 'assessment', focusAreas: ['Presentation skills', 'Market analysis', 'Execution plan'], questions: ['Present a 30-60-90 day plan for our upcoming feature launch.'] },
        { id: 5, title: 'Final Partner Meet', duration: '30 mins', type: 'interview', focusAreas: ['Stakeholder management', 'Leadership'], questions: ['How do you work with cross-functional teams?'] },
        { id: 6, title: 'Offer Stage', duration: '1 day', type: 'offer', focusAreas: ['Benefits', 'Onboarding'], questions: [] },
    ]
  },
  finance: {
    id: 'finance',
    title: 'Financial Controller',
    location: 'Manchester, UK (On-site)',
    salary: '£75k - £90k',
    competition: 'Medium',
    timeToHire: '55 Days',
    availability: '15%',
    jd: 'We are looking for a meticulous Financial Controller to oversee our financial operations. You will be responsible for financial reporting, budgeting, and ensuring compliance with regulations.',
    responsibilities: [
      'Oversee all accounts, ledgers, and reporting systems.',
      'Ensure compliance with appropriate GAAP standards and regulatory requirements.',
      'Coordinate all audit activity.',
      'Support the CFO in annual budgeting and planning process.'
    ],
    profile: "An ACA/ACCA qualified accountant with strong leadership skills and deep technical knowledge of financial reporting and compliance.",
    skills: ['Audit', 'Tax', 'Budgeting', 'Excel Expert'],
    steps: [
        { id: 1, title: 'Application Review', duration: '3 days', type: 'screening', focusAreas: ['Qualifications', 'Industry experience', 'Leadership history'], questions: [] },
        { id: 2, title: 'Technical Screening', duration: '45 mins', type: 'interview', focusAreas: ['GAAP knowledge', 'Financial reporting', 'Audit experience'], questions: ['Describe your experience with complex consolidated accounts.', 'How do you ensure data integrity?'] },
        { id: 3, title: 'CFO Interview', duration: '1 hour', type: 'interview', focusAreas: ['Strategic alignment', 'Leadership', 'Business acumen'], questions: ['How would you improve our current month-end process?', 'Tell me about a time you identified a major financial risk.'] },
        { id: 4, title: 'Board Presentation', duration: '1 hour', type: 'interview', focusAreas: ['Communication', 'Influence', 'Trustworthiness'], questions: ['Present your findings on the quarterly budget variance.'] },
        { id: 5, title: 'Reference & Credit Check', duration: '1 week', type: 'review', focusAreas: ['Integrity', 'Reliability'], questions: [] },
        { id: 6, title: 'Final Negotiation', duration: '2 days', type: 'offer', focusAreas: ['Package', 'Notice period'], questions: [] },
    ]
  }
};

interface Candidate {
  id: number;
  name: string;
  role: string;
  stage: string;
  status: 'active' | 'rejected';
  yoe: string;
  matchScore: number;
}

// --- Main Component ---

export default function RecConnectApp() {
  const [view, setView] = useState<ViewState>('start');
  const [activeChapter, setActiveChapter] = useState<Chapter>(null);
  const [selectedRole, setSelectedRole] = useState<RoleData>(ROLES.engineer);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Simulating AI Generation Logic
  const handleSelectRole = (role: RoleData) => {
    setSelectedRole(role);
    setView('loading');
    // Simulate API delay
    setTimeout(() => {
      setView('dashboard');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative">
      {/* Exit Button - Fixed Top Right */}
      <a href="/" className="fixed top-6 right-6 z-[100] bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-100 hover:scale-110 transition-transform cursor-pointer group">
        <X size={24} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
      </a>

      <main className="max-w-[1920px] mx-auto px-6 md:px-12 pt-20 md:pt-56 pb-32">
        {view === 'start' && (
          <StartScreen 
            onSelectRole={handleSelectRole} 
          />
        )}

        {view === 'loading' && (
          <LoadingScreen />
        )}

        {view === 'dashboard' && !activeChapter && (
          <Dashboard onOpenChapter={setActiveChapter} role={selectedRole} />
        )}

        {/* Modal Overlay for Chapters */}
        {view === 'dashboard' && activeChapter && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[200] flex items-center justify-center p-0 md:p-12 animate-in fade-in duration-300">
            <div className="bg-[#FDFBF7] border border-white/50 rounded-none md:rounded-[2.5rem] w-full max-w-7xl h-[100dvh] md:h-full overflow-hidden flex flex-col shadow-2xl relative ring-1 ring-black/5">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 md:px-10 md:py-8 border-b border-slate-100 bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-3 md:gap-5">
                  <div className={`p-2 md:p-4 rounded-2xl ${
                    activeChapter === 'discovery' ? 'bg-blue-100 text-blue-600' :
                    activeChapter === 'process' ? 'bg-purple-100 text-purple-600' :
                    activeChapter === 'alignment' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {activeChapter === 'discovery' && <Search size={20} className="md:w-7 md:h-7" />}
                    {activeChapter === 'process' && <TrendingUp size={20} className="md:w-7 md:h-7" />}
                    {activeChapter === 'alignment' && <Users size={20} className="md:w-7 md:h-7" />}
                    {activeChapter === 'debrief' && <BrainCircuit size={20} className="md:w-7 md:h-7" />}
                  </div>
                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-900 truncate max-w-[200px] md:max-w-none">
                    {activeChapter === 'process' ? 'The Process' : activeChapter}
                  </h2>
                </div>
                <button 
                  onClick={() => setActiveChapter(null)}
                  className="p-2 md:p-3 hover:bg-slate-200 rounded-full transition-all text-slate-400 hover:text-slate-900"
                >
                  <X size={24} className="md:w-8 md:h-8" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-16 custom-scrollbar pb-24 md:pb-16">
                {activeChapter === 'discovery' && <DiscoveryChapter role={selectedRole} />}
                {activeChapter === 'process' && <ProcessChapter role={selectedRole} />}
                {activeChapter === 'alignment' && <AlignmentChapter role={selectedRole} />}
                {activeChapter === 'debrief' && <DebriefChapter />}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// --- Sub-Components ---

function StartScreen({ onSelectRole }: any) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 md:space-y-20 min-h-[70vh]">
      <div className="space-y-6" data-aos="fade-up">
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 uppercase">Rec+onnect</span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light px-4">
            Your digital recruiter providing tailored recruitment workflows.
        </p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-10 w-full max-w-6xl">
        {Object.values(ROLES).map((role, i) => (
            <button
                key={role.id}
                onClick={() => onSelectRole(role)}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group bg-white p-6 md:p-10 rounded-3xl md:rounded-[3rem] shadow-sm hover:shadow-2xl md:hover:-translate-y-2 border border-slate-100 transition-all duration-500 text-left flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8 relative overflow-hidden"
            >
                <div className="hidden md:block absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-[40px] group-hover:bg-indigo-100 transition-colors duration-700"></div>
                
                <div className="bg-slate-50 p-4 md:p-5 rounded-2xl md:rounded-3xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-500 text-slate-900 border border-slate-100 flex-shrink-0">
                    {role.id === 'engineer' && <BrainCircuit size={24} className="md:w-10 md:h-10" />}
                    {role.id === 'marketing' && <Sparkles size={24} className="md:w-10 md:h-10" />}
                    {role.id === 'finance' && <BarChart3 size={24} className="md:w-10 md:h-10" />}
                </div>
                
                <div className="space-y-1 relative z-10 flex-1 md:space-y-3">
                    <h3 className="text-lg md:text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">{role.title}</h3>
                    <p className="text-xs md:text-sm text-slate-400 font-mono uppercase tracking-widest">{role.location}</p>
                    <p className="text-slate-500 leading-relaxed line-clamp-2 text-sm md:text-lg font-light md:block hidden">
                        {role.jd}
                    </p>
                </div>
                
                <div className="md:mt-auto md:pt-8 flex items-center text-indigo-600 font-black text-sm tracking-widest uppercase group-hover:gap-4 transition-all">
                    <ChevronRight size={20} className="md:ml-2" />
                </div>
            </button>
        ))}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-12 animate-in fade-in duration-700">
      <div className="relative">
        <div className="w-32 h-32 border-[6px] border-slate-100 rounded-full"></div>
        <div className="w-32 h-32 border-[6px] border-indigo-600 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        <div className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center">
           <Sparkles className="text-indigo-600 animate-pulse" size={48} />
        </div>
      </div>
      <div className="text-center space-y-4 px-6">
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Synthesizing Playbook</h3>
        <p className="text-lg md:text-xl text-slate-500 font-light">
          Tailoring the recruitment process...
        </p>
      </div>
    </div>
  );
}

function Dashboard({ onOpenChapter, role }: { onOpenChapter: (c: Chapter) => void, role: RoleData }) {
  const cards = [
    {
      id: 'discovery',
      title: 'Chapter 1: Discovery',
      icon: Search,
      desc: 'Market insights, job description, deliverables & competitive analysis.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'hover:border-blue-200'
    },
    {
      id: 'process',
      title: 'Chapter 2: The Process',
      icon: TrendingUp,
      desc: 'Interview steps, assessments, focus areas, questions & follow-ups.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'hover:border-purple-200'
    },
    {
      id: 'alignment',
      title: 'Chapter 3: Alignment',
      icon: Users,
      desc: 'Collaborator management, interviewing team guidance & playbook access.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'hover:border-emerald-200'
    },
    {
      id: 'debrief',
      title: 'Chapter 4: Debrief',
      icon: BrainCircuit,
      desc: 'AI compared notes, pros/cons, hesitation detection & hiring decision support.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'hover:border-amber-200'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-32 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4 md:space-y-6" data-aos="fade-up">
        <h2 className="text-4xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">YOUR RECRUITMENT<br/>PLAYBOOK</h2>
        <p className="text-lg md:text-2xl text-slate-500 font-light italic">Generated for: <span className="text-indigo-600 font-bold not-italic block md:inline">{role.title}</span></p>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-10 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => onOpenChapter(card.id as Chapter)}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className={`group bg-white p-6 md:p-12 rounded-3xl md:rounded-[3.5rem] transition-all duration-500 text-left flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-10 border border-slate-100 shadow-sm hover:shadow-2xl md:hover:-translate-y-2 ${card.border}`}
          >
            <div className={`w-14 h-14 md:w-20 md:h-20 ${card.bg} ${card.color} rounded-2xl md:rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm flex-shrink-0`}>
              <card.icon size={24} className="md:w-10 md:h-10" />
            </div>
            <div className="space-y-1 md:space-y-4 flex-1">
                <h3 className="text-lg md:text-4xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {card.title}
                </h3>
                <p className="text-sm md:text-xl text-slate-500 leading-relaxed font-light hidden md:block">
                {card.desc}
                </p>
            </div>
            <div className="md:mt-auto flex justify-end opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-2">
              <ChevronRight size={24} className="text-slate-900 md:w-8 md:h-8" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Chapter 1: Discovery ---

function DiscoveryChapter({ role }: { role: RoleData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [jdText, setJdText] = useState(role.jd);

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Market Insights Section */}
      <section>
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="p-3 md:p-4 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100"><BarChart3 size={24} className="md:w-8 md:h-8"/></div>
          <h3 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">Market Insights</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
          <InsightCard label="Salary Range" value={role.salary} sub="+5% vs last year" color="text-slate-900" subColor="text-green-600" />
          <InsightCard label="Competition" value={role.competition} sub="Hot market" color="text-red-500" subColor="text-slate-400" icon={<AlertTriangle size={16} className="text-red-500 inline ml-1 md:ml-2"/>} />
          <InsightCard label="Time to Hire" value={role.timeToHire} sub="Avg duration" color="text-slate-900" subColor="text-slate-400" />
          <InsightCard label="Availability" value={role.availability} sub="Talent pool" color="text-slate-900" subColor="text-purple-600" />
        </div>
        
        <div className="bg-indigo-50 md:bg-white p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] md:border-l-8 md:border-l-indigo-500 relative overflow-hidden shadow-sm md:border border-slate-100 border-indigo-100">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={120} className="text-indigo-600" /></div>
          <h4 className="text-xl md:text-2xl font-black text-indigo-600 mb-6 md:mb-8 flex items-center gap-3 md:gap-4 uppercase tracking-wider"><Sparkles size={24}/> Strategic Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
             <div className="flex items-start gap-4 text-slate-600 text-base md:text-lg font-light leading-relaxed">
                <div className="min-w-[8px] h-[8px] md:min-w-[10px] md:h-[10px] mt-2 md:mt-2.5 rounded-full bg-indigo-500 shadow-sm"></div>
                Offer competitive equity packages to offset salary caps.
             </div>
             <div className="flex items-start gap-4 text-slate-600 text-base md:text-lg font-light leading-relaxed">
                <div className="min-w-[8px] h-[8px] md:min-w-[10px] md:h-[10px] mt-2 md:mt-2.5 rounded-full bg-indigo-500 shadow-sm"></div>
                Highlight flexibility and remote options.
             </div>
             <div className="flex items-start gap-4 text-slate-600 text-base md:text-lg font-light leading-relaxed">
                <div className="min-w-[8px] h-[8px] md:min-w-[10px] md:h-[10px] mt-2 md:mt-2.5 rounded-full bg-indigo-500 shadow-sm"></div>
                Focus on long-term career growth.
             </div>
          </div>
        </div>
      </section>

      {/* Job Description Section - Clean Layout on Mobile */}
      <section className="bg-transparent md:bg-white rounded-none md:rounded-[3rem] overflow-visible md:overflow-hidden border-0 md:border border-slate-100 md:shadow-md">
        <div className="bg-transparent md:bg-slate-50 p-0 md:p-8 md:px-12 border-b-0 md:border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-0">
          <h3 className="font-bold text-slate-900 flex items-center gap-3 md:gap-4 text-xl md:text-2xl"><FileText size={24}/> JOB DESCRIPTION</h3>
          <div className="flex gap-4 w-full md:w-auto">
             <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex-1 md:flex-none text-sm border px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all font-bold uppercase tracking-widest ${isEditing ? 'bg-white border-slate-300 text-slate-900' : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'}`}
              >
                {isEditing ? 'Cancel' : 'Edit Mode'}
             </button>
             {isEditing && (
               <button onClick={() => setIsEditing(false)} className="flex-1 md:flex-none text-sm bg-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-indigo-700 transition-all font-bold flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-indigo-200">
                 <Save size={18}/> Save
               </button>
             )}
          </div>
        </div>
        
        <div className="p-0 md:p-12 md:px-20 max-w-5xl mx-auto space-y-12 md:space-y-16 text-slate-600 font-light">
           <div className="text-left md:text-center border-b border-slate-200 md:border-slate-100 pb-8 md:pb-16">
             <div className="w-20 h-20 md:w-28 md:h-28 bg-white md:bg-slate-50 rounded-2xl md:rounded-[2rem] mx-0 md:mx-auto mb-6 md:mb-8 flex items-center justify-center text-slate-400 font-bold border border-slate-200 md:border-slate-100 shadow-sm md:shadow-inner">LOGO</div>
             <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2 md:mb-4 tracking-tight uppercase leading-none">{role.title}</h1>
             <p className="text-indigo-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">{role.location} • FULL-TIME</p>
           </div>
           
           <div className="space-y-8 md:space-y-12">
             <div>
               <h4 className="font-bold text-slate-900 mb-4 md:mb-6 text-lg md:text-2xl uppercase tracking-wider border-b border-slate-200 md:border-slate-100 pb-2 md:pb-4 inline-block">About the Role</h4>
               {isEditing ? (
                 <textarea 
                    value={jdText} 
                    onChange={(e) => setJdText(e.target.value)}
                    className="w-full p-4 md:p-6 bg-white border border-indigo-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none min-h-[200px] text-base md:text-xl text-slate-700 font-light leading-relaxed"
                 />
               ) : (
                 <p className="leading-relaxed text-base md:text-xl">{jdText}</p>
               )}
             </div>
             
             <div>
               <h4 className="font-bold text-slate-900 mb-4 md:mb-6 text-lg md:text-2xl uppercase tracking-wider border-b border-slate-200 md:border-slate-100 pb-2 md:pb-4 inline-block">Key Responsibilities</h4>
               <ul className="grid grid-cols-1 gap-4 md:gap-6 text-base md:text-xl">
                 {role.responsibilities.map((res, i) => (
                    <li key={i} className="flex items-start gap-4">
                        <div className="mt-2 md:mt-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                        {res}
                    </li>
                 ))}
               </ul>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}

function InsightCard({ label, value, sub, color, subColor, icon }: any) {
  return (
    <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 md:border-slate-100 shadow-sm md:hover:shadow-lg group">
      <p className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-[0.2em] mb-2 md:mb-4">{label}</p>
      <div className={`text-2xl md:text-4xl font-black ${color} mb-1 md:mb-3 flex items-center tracking-tighter`}>
        {value} {icon}
      </div>
      <p className={`text-[10px] md:text-sm font-bold uppercase tracking-wider ${subColor}`}>{sub}</p>
    </div>
  );
}

// --- Chapter 2: The Process ---

function ProcessChapter({ role }: { role: RoleData }) {
  const [activeStep, setActiveStep] = useState<number>(2);

  const steps = role.steps;
  const currentStep = steps.find(s => s.id === activeStep);

  return (
    <div className="flex flex-col lg:flex-row gap-8 md:gap-12 h-full">
      {/* Mobile: Step Dropdown */}
      <div className="lg:hidden w-full mb-6">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block">Select Stage</label>
          <div className="relative">
             <select 
                value={activeStep}
                onChange={(e) => setActiveStep(Number(e.target.value))}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl p-4 pr-10 text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
             >
                {steps.map((step) => (
                    <option key={step.id} value={step.id}>Step {step.id}: {step.title}</option>
                ))}
             </select>
             <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={20} />
          </div>
      </div>

      {/* Desktop Left Column: Timeline */}
      <div className="hidden lg:block w-full lg:w-1/3 space-y-5">
        <h3 className="font-black text-slate-400 uppercase text-xs tracking-[0.3em] mb-6 pl-4 border-l-2 border-indigo-500">TIMELINE</h3>
        {steps.map((step) => (
          <div 
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group shadow-sm ${activeStep === step.id ? 'bg-white border-indigo-500 scale-[1.02] shadow-md' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'}`}
          >
            {activeStep === step.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>}
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-black uppercase px-3 py-1.5 rounded-lg ${activeStep === step.id ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                STEP {step.id}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-2 font-mono"><Clock size={14}/> {step.duration}</span>
            </div>
            <h4 className={`font-bold text-xl ${activeStep === step.id ? 'text-indigo-900' : 'text-slate-500 group-hover:text-slate-800'}`}>{step.title}</h4>
            <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-black">{step.type}</p>
          </div>
        ))}
      </div>

      {/* Right Column: Detail View (Clean Web Layout on Mobile) */}
      <div className="w-full lg:w-2/3 bg-transparent md:bg-white md:rounded-[3rem] p-0 md:p-16 md:shadow-xl h-fit min-h-0 md:min-h-[700px] border-0 md:border border-slate-100">
        {currentStep ? (
          <div className="space-y-8 md:space-y-12 animate-in slide-in-from-right-8 duration-500" key={currentStep.id}>
            <div className="flex flex-col md:flex-row justify-between items-start border-b border-slate-200 md:border-slate-100 pb-6 md:pb-10 gap-6 md:gap-8">
               <div>
                 <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-2 md:mb-4">
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-none uppercase tracking-tighter">{currentStep.title}</h3>
                    <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-purple-50 text-purple-600 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border border-purple-100">{currentStep.type}</span>
                 </div>
                 <p className="text-slate-400 font-mono text-base md:text-lg font-light tracking-wide italic">Target Duration: <span className="text-slate-600 font-bold not-italic">{currentStep.duration}</span></p>
               </div>
               <button className="hidden md:block text-slate-400 hover:text-indigo-600 transition-all p-4 hover:bg-indigo-50 rounded-2xl border border-transparent hover:border-indigo-100"><Edit3 size={24}/></button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:gap-12">
                <div className="bg-transparent md:bg-indigo-50 p-0 md:p-10 rounded-none md:rounded-[2.5rem] border-0 md:border border-indigo-100 relative overflow-visible md:overflow-hidden">
                  <div className="hidden md:block absolute top-0 right-0 p-8 opacity-5"><CheckCircle size={100} className="text-indigo-600" /></div>
                  <h4 className="text-indigo-600 font-black mb-4 md:mb-8 flex items-center gap-3 md:gap-4 text-lg md:text-xl uppercase tracking-widest">
                    <CheckCircle size={20} className="md:w-6 md:h-6"/> FOCUS AREAS
                  </h4>
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {currentStep.focusAreas.map((area, i) => (
                      <span key={i} className="bg-white text-indigo-700 border border-indigo-100 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-sm hover:shadow-md transition-all cursor-default">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-slate-900 font-black mb-4 md:mb-8 flex items-center gap-3 md:gap-4 text-lg md:text-xl uppercase tracking-widest opacity-80">
                    <MessageSquare size={20} className="text-slate-400 md:w-6 md:h-6"/> SUGGESTED QUESTIONS
                  </h4>
                  <div className="space-y-4 md:space-y-6">
                    {currentStep.questions.length > 0 ? (
                      currentStep.questions.map((q, i) => (
                        <div key={i} className="bg-slate-50 p-4 md:p-8 rounded-2xl md:rounded-3xl text-slate-700 text-base md:text-lg border border-slate-200 md:border-slate-100 flex gap-4 md:gap-6 items-start hover:border-indigo-200 transition-all duration-300 cursor-default group">
                          <span className="bg-white text-slate-400 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-2xl flex items-center justify-center text-xs md:text-sm flex-shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 font-black border border-slate-200 shadow-sm">{i+1}</span>
                          <p className="font-light leading-relaxed">{q}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-base md:text-lg text-slate-400 italic p-8 md:p-12 rounded-2xl md:rounded-[2rem] border-2 border-dashed border-slate-200 text-center font-light">
                        No specific questions generated for this administrative step.
                      </div>
                    )}
                  </div>
                </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// --- Chapter 3: Alignment ---

function AlignmentChapter({ role }: { role: RoleData }) {
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [collabName, setCollabName] = useState('');
  
  const addCollaborator = () => {
    if(collabName) {
      setCollaborators([...collaborators, collabName]);
      setCollabName('');
    }
  }

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Candidate Profile Card */}
          <div className="bg-transparent md:bg-white p-0 md:p-10 rounded-none md:rounded-[3rem] border-0 md:border border-slate-100 md:shadow-lg flex flex-col h-full">
            <div className="flex justify-between items-center mb-6 md:mb-10">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-3 md:gap-4 uppercase tracking-tight">
                <UserCheck size={24} className="text-emerald-500 md:w-8 md:h-8"/> CANDIDATE PROFILE
              </h3>
              <button className="text-[10px] md:text-xs bg-slate-100 text-slate-500 px-4 md:px-6 py-2 md:py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-all font-black uppercase tracking-[0.2em]">Edit</button>
            </div>
            <p className="text-slate-600 text-lg md:text-2xl mb-8 md:mb-12 leading-relaxed font-light">
                {role.profile}
            </p>
            <div className="mt-auto grid grid-cols-2 gap-6 md:gap-10 pt-6 md:pt-10 border-t border-slate-200 md:border-slate-100">
              <div>
                <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-[0.3em] mb-2 md:mb-4">EXPERIENCE</p>
                <span className="bg-purple-50 text-purple-600 px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-black border border-purple-100 uppercase tracking-widest">Mid-Senior</span>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-slate-400 font-black uppercase tracking-[0.3em] mb-2 md:mb-4">SKILLS</p>
                <div className="flex gap-2 md:gap-3 flex-wrap">
                  {role.skills.map(s => (
                    <span key={s} className="bg-slate-50 text-slate-600 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold border border-slate-200 md:border-slate-100">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Process Summary */}
          <div className="bg-slate-50 md:bg-gradient-to-br md:from-white md:to-slate-50 rounded-2xl md:rounded-[3rem] border border-slate-200 md:border-slate-200 p-6 md:p-10 relative overflow-hidden shadow-sm md:shadow-xl">
             <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5"><TrendingUp className="text-indigo-600 w-[120px] h-[120px] md:w-[200px] md:h-[200px]" /></div>
             <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-10 flex items-center gap-3 md:gap-4 uppercase tracking-tight">
                <TrendingUp size={24} className="text-indigo-600 md:w-8 md:h-8"/> PROCESS SUMMARY
             </h3>
             <div className="flex gap-4 md:gap-8 mb-8 md:mb-12">
                <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-[2rem] border border-slate-100 flex-1 text-center shadow-sm group hover:border-indigo-200 transition-colors">
                   <div className="text-4xl md:text-6xl font-black text-indigo-600 group-hover:scale-110 transition-transform duration-500 leading-none mb-1 md:mb-2">{role.steps.length}</div>
                   <div className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-[0.3em]">STAGES</div>
                </div>
                <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-[2rem] border border-slate-100 flex-1 text-center shadow-sm group hover:border-purple-200 transition-colors">
                   <div className="text-4xl md:text-6xl font-black text-purple-600 group-hover:scale-110 transition-transform duration-500 leading-none mb-1 md:mb-2">2-3</div>
                   <div className="text-[10px] md:text-xs text-slate-400 uppercase font-black tracking-[0.3em]">WEEKS</div>
                </div>
             </div>
             
             <div className="space-y-4 md:space-y-6">
               <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4 md:mb-6 pl-4 border-l-2 border-indigo-500">ASSESSMENT GOALS</h4>
               <ul className="space-y-4 md:space-y-6">
                 <li className="text-base md:text-xl text-slate-600 flex items-start gap-4 md:gap-5 font-light leading-relaxed">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-500 mt-2 md:mt-2.5 shadow-sm"></div>
                    Assess technical competency and relevance.
                 </li>
                 <li className="text-base md:text-xl text-slate-600 flex items-start gap-4 md:gap-5 font-light leading-relaxed">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-500 mt-2 md:mt-2.5 shadow-sm"></div>
                    Evaluate cultural fit and communication.
                 </li>
                 <li className="text-base md:text-xl text-slate-600 flex items-start gap-4 md:gap-5 font-light leading-relaxed">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-500 mt-2 md:mt-2.5 shadow-sm"></div>
                    Verify background and references.
                 </li>
               </ul>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {/* Guidelines */}
        <div className="bg-transparent md:bg-white rounded-none md:rounded-[3rem] p-0 md:p-12 border-0 md:border border-slate-100 md:shadow-lg">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-10 tracking-tight uppercase">PANEL GUIDELINES</h3>
          <div className="space-y-6 md:space-y-8">
            <GuidelineItem icon={<Clock size={20} className="md:w-6 md:h-6"/>} title="Meticulous Preparation" desc="Review candidate profile and requirements before each stage." />
            <GuidelineItem icon={<CheckCircle size={20} className="md:w-6 md:h-6"/>} title="Systemic Consistency" desc="Use provided questions and focus areas for fair evaluation." />
            <GuidelineItem icon={<FileText size={20} className="md:w-6 md:h-6"/>} title="Real-time Documentation" desc="Record detailed feedback immediately after each interaction." />
          </div>
        </div>

        {/* Action Box: Collaborators */}
        <div className="bg-indigo-50 rounded-2xl md:rounded-[3rem] border-2 md:border-4 border-dashed border-indigo-100 p-6 md:p-12 flex flex-col justify-center relative hover:border-indigo-200 transition-all duration-500 group">
           <div className="space-y-2 md:space-y-4 mb-6 md:mb-10">
                <h3 className="font-black text-indigo-900 text-xl md:text-3xl uppercase tracking-tight">ADD COLLABORATORS</h3>
                <p className="text-base md:text-lg text-indigo-700/70 font-light leading-relaxed">Invite your interviewing team to align on the process.</p>
           </div>
           
           <div className="w-full space-y-4 md:space-y-5 mb-6 md:mb-8">
             <div className="space-y-3 md:space-y-4">
                <input 
                  className="w-full text-base md:text-lg p-4 md:p-6 bg-white border border-indigo-100 rounded-xl md:rounded-2xl focus:border-indigo-400 outline-none text-slate-900 placeholder:text-slate-400 transition-all shadow-sm" 
                  placeholder="Collaborator Name" 
                  value={collabName}
                  onChange={(e) => setCollabName(e.target.value)}
                />
                <input className="w-full text-base md:text-lg p-4 md:p-6 bg-white/50 border border-indigo-100 rounded-xl md:rounded-2xl outline-none text-slate-400 cursor-not-allowed italic font-light" placeholder="Email address (Auto-generated)" disabled />
             </div>
             <button 
                onClick={addCollaborator}
                className="w-full bg-indigo-600 text-white text-base md:text-lg py-4 md:py-6 rounded-xl md:rounded-2xl hover:bg-indigo-700 hover:scale-[1.02] transition-all font-black shadow-lg shadow-indigo-200 active:scale-95 uppercase tracking-widest"
             >
                Register Collaborator
             </button>
           </div>

           {/* List of added collaborators */}
           {collaborators.length > 0 && (
             <div className="mt-4 md:mt-6 pt-6 md:pt-10 border-t border-indigo-200/50 w-full">
               <p className="text-[10px] md:text-xs font-black text-indigo-400 uppercase mb-3 md:mb-5 tracking-[0.3em]">TEAM REGISTERED</p>
               <div className="flex flex-wrap gap-2 md:gap-4">
                 {collaborators.map((c, i) => (
                   <span key={i} className="bg-white text-indigo-600 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-black flex items-center gap-2 md:gap-3 animate-in zoom-in duration-300 border border-indigo-100 shadow-sm">
                     <CheckCircle size={14} className="md:w-4 md:h-4" /> {c}
                   </span>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}

function GuidelineItem({icon, title, desc}: any) {
  return (
    <div className="flex gap-4 md:gap-6 items-start group">
      <div className="bg-indigo-50 p-3 md:p-4 rounded-xl md:rounded-2xl h-fit text-indigo-600 shadow-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-base md:text-lg text-slate-500 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

// --- Chapter 4: Debrief ---

function DebriefChapter() {
  const [activeCandidateId, setActiveCandidateId] = useState<number>(1);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Reset analysis when switching candidates
  useEffect(() => {
    setShowAnalysis(false);
  }, [activeCandidateId]);

  const candidates: Candidate[] = [
    { id: 1, name: "Sarah O'Connor", role: "Senior Full Stack", stage: "Final Interview", status: "active", yoe: "7 Yrs", matchScore: 88 },
    { id: 2, name: "James Miller", role: "Full Stack Engineer", stage: "Technical Assessment", status: "rejected", yoe: "4 Yrs", matchScore: 65 }
  ];

  const activeCandidate = candidates.find(c => c.id === activeCandidateId);

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
      {/* Alert Banner */}
      <div className="bg-indigo-50 border border-indigo-100 p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start relative overflow-hidden shadow-sm md:shadow-lg">
        <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-[80px]"></div>
        <div className="bg-white p-3 md:p-5 rounded-2xl text-indigo-600 shadow-sm border border-indigo-100 relative z-10 flex-shrink-0"><BrainCircuit size={32} className="md:w-10 md:h-10" /></div>
        <div className="relative z-10 text-center md:text-left">
          <h4 className="font-black text-indigo-900 text-lg md:text-xl uppercase tracking-widest mb-2 md:mb-3">AI-Synthesized, Human-Decided</h4>
          <p className="text-base md:text-lg text-indigo-800/70 max-w-5xl leading-relaxed font-light">
            The AI does not make decisions. It organizes data to empower stakeholders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Candidate List Column - Simplified List */}
        <div className="col-span-1 space-y-4 md:space-y-6">
          <div className="flex justify-between items-center px-2 md:px-4 mb-2 md:mb-4">
             <h3 className="font-black text-slate-900 text-lg md:text-xl uppercase tracking-tight">CANDIDATES</h3>
             <span className="text-[10px] md:text-xs bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-slate-500 font-mono border border-slate-200">TOTAL: 2</span>
          </div>
          
          <div className="space-y-3">
          {candidates.map(c => (
            <div 
              key={c.id}
              onClick={() => setActiveCandidateId(c.id)}
              className={`p-4 md:p-8 rounded-xl md:rounded-[2rem] border transition-all duration-500 cursor-pointer shadow-sm ${
                activeCandidateId === c.id 
                ? 'bg-white border-indigo-600 shadow-md scale-[1.01] md:scale-[1.05]' 
                : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center md:items-start mb-2 md:mb-6">
                <h4 className="font-black text-slate-900 text-lg md:text-2xl leading-none">{c.name}</h4>
                <span className={`text-[10px] font-black px-2 py-1 md:px-3 md:py-1.5 rounded-lg uppercase tracking-widest border ${
                  c.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {c.status === 'active' ? 'Active' : 'Rejected'}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-500 font-bold mb-2 md:mb-6 tracking-widest uppercase">{c.role} • {c.yoe}</p>
              <div className="text-[10px] md:text-xs text-slate-500 bg-slate-100 p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-200">
                Current Stage: <span className="text-slate-900 font-black ml-1 md:ml-2 uppercase tracking-widest">{c.stage}</span>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Candidate Details & AI Analysis Column - Clean Mobile */}
        <div className="col-span-1 md:col-span-2 bg-transparent md:bg-white md:rounded-[3.5rem] p-0 md:p-16 md:min-h-[700px] border-0 md:border border-slate-100 md:shadow-xl">
           {activeCandidate && (
             <div className="h-full flex flex-col">
               <div className="flex flex-col xl:flex-row justify-between items-center mb-8 md:mb-12 pb-8 md:pb-12 border-b border-slate-200 md:border-slate-100 gap-6 md:gap-10">
                 <div className="flex items-center gap-4 md:gap-8">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-600 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-white font-black text-2xl md:text-4xl shadow-lg md:shadow-xl shadow-indigo-200">
                      {activeCandidate.name.charAt(0)}
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-1 md:mb-2">{activeCandidate.name}</h2>
                      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-xs md:text-sm text-slate-500 font-mono tracking-widest">
                        <span className="flex items-center gap-2 md:gap-3"><Mail size={14} className="text-indigo-600 md:w-[18px]"/> {activeCandidate.name.split(' ')[0].toLowerCase()}@example.com</span>
                      </div>
                    </div>
                 </div>
                 
                 <button 
                   onClick={() => setShowAnalysis(true)}
                   className="w-full md:w-auto bg-slate-900 text-white px-6 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-sm md:text-base font-black flex justify-center items-center gap-3 md:gap-4 hover:bg-indigo-600 hover:scale-110 transition-all shadow-xl uppercase tracking-[0.2em]"
                 >
                   <Sparkles size={20} className="md:w-6 md:h-6"/> COMPARE FEEDBACK
                 </button>
               </div>

               {!showAnalysis ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-2xl md:rounded-[2.5rem] border-2 md:border-4 border-dashed border-slate-200 p-8 md:p-16 text-center animate-in fade-in transition-all duration-700">
                   <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] shadow-sm md:shadow-lg mb-6 md:mb-10 border border-slate-100"><BrainCircuit size={48} className="text-slate-300 md:w-20 md:h-20"/></div>
                   <h3 className="text-slate-900 font-black text-xl md:text-3xl mb-2 md:mb-4 uppercase tracking-tight">AI ANALYSIS READY</h3>
                   <p className="max-w-md text-base md:text-xl text-slate-500 font-light leading-relaxed">Click "Compare Feedback" above to organize data.</p>
                 </div>
               ) : (
                 <div className="space-y-8 md:space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                   
                   {/* 2x2 Grid for Compliance-Friendly Feedback */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {/* 1. Consensus Points */}
                        <div className="bg-emerald-50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-black text-emerald-600 mb-4 md:mb-6 flex items-center gap-3 text-base md:text-lg uppercase tracking-wide">
                                <CheckCircle size={20} className="md:w-6 md:h-6"/> Consensus Points
                            </h4>
                            <ul className="space-y-3 md:space-y-4">
                                <li className="text-emerald-900/80 text-sm leading-relaxed flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                    Strong architectural knowledge demonstrated in Tech Assessment.
                                </li>
                                <li className="text-emerald-900/80 text-sm leading-relaxed flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                    Excellent cultural fit - highly collaborative communication style.
                                </li>
                            </ul>
                        </div>

                        {/* 2. Divergent Feedback */}
                        <div className="bg-amber-50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-amber-100 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-black text-amber-600 mb-4 md:mb-6 flex items-center gap-3 text-base md:text-lg uppercase tracking-wide">
                                <AlertTriangle size={20} className="md:w-6 md:h-6"/> Divergent Feedback
                            </h4>
                            <ul className="space-y-3 md:space-y-4">
                                <li className="text-amber-900/80 text-sm leading-relaxed flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></div>
                                    Reviewer A noted "strong leadership potential," while Reviewer B felt they were "more of a solo contributor" during the pair programming.
                                </li>
                            </ul>
                        </div>

                        {/* 3. Vague Responses */}
                        <div className="bg-purple-50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-purple-100 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-black text-purple-600 mb-4 md:mb-6 flex items-center gap-3 text-base md:text-lg uppercase tracking-wide">
                                <MessageSquare size={20} className="md:w-6 md:h-6"/> Vague Responses
                            </h4>
                            <ul className="space-y-3 md:space-y-4">
                                <li className="text-purple-900/80 text-sm leading-relaxed flex items-start gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></div>
                                    Response regarding "handling conflict with Product Managers" lacked specific examples or outcomes. Follow-up recommended.
                                </li>
                            </ul>
                        </div>

                        {/* 4. Keyword Match */}
                        <div className="bg-blue-50 p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-blue-100 shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-black text-blue-600 mb-4 md:mb-6 flex items-center gap-3 text-base md:text-lg uppercase tracking-wide">
                                <Search size={20} className="md:w-6 md:h-6"/> Keyword Match
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">React (High)</span>
                                <span className="bg-white text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100">Python (High)</span>
                                <span className="bg-white text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 opacity-60">AWS (Missing)</span>
                            </div>
                        </div>
                   </div>
                   
                   {/* Footer Score */}
                   <div className="pt-8 md:pt-10 border-t border-slate-200 md:border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                     <div className="flex items-center gap-6 md:gap-8 group">
                       <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] border-4 md:border-[6px] border-indigo-600 flex items-center justify-center font-black text-indigo-600 text-2xl md:text-3xl shadow-xl group-hover:scale-110 transition-transform duration-500 bg-white">
                         {activeCandidate.matchScore}%
                       </div>
                       <div>
                         <span className="text-xl md:text-2xl font-black text-slate-900 block tracking-tighter uppercase">ALIGNMENT SCORE</span>
                         <span className="text-xs md:text-sm text-slate-400 uppercase tracking-[0.3em] font-black">DATA-DRIVEN MATCH</span>
                       </div>
                     </div>
                     <p className="text-[10px] md:text-xs text-slate-400 italic max-w-[280px] text-center md:text-right font-light leading-relaxed">
                       *Hiring manager retains final decision authority. This score reflects data alignment, not character judgment.
                     </p>
                   </div>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}