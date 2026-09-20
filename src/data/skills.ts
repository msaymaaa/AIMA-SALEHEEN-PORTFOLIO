import type { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming-development',
    name: 'Programming & Development',
    description: 'Core languages, modern frontend engineering, and mobile application frameworks.',
    skills: [
      { name: 'C++', focus: 'Data structures, pointers, OOP, systems programming' },
      { name: 'JavaScript', focus: 'ES6+, asynchronous patterns, web engines' },
      { name: 'TypeScript', focus: 'Strict type systems, generative interfaces' },
      { name: 'React', focus: 'State architectures, hooks, custom components' },
      { name: 'Next.js', focus: 'App Router, SSR, performant web applications' },
      { name: 'Astro', focus: 'Content-driven, ultra-fast static sites' },
      { name: 'Tailwind CSS', focus: 'Utility-first modern design & dark mode' },
      { name: 'Android Development', focus: 'Native app lifecycle, mobile UI/UX' },
      { name: 'HTML5 & CSS3', focus: 'Semantic markup, accessibility, modern CSS' },
    ]
  },
  {
    id: 'ai-application-dev',
    name: 'AI & Application Development',
    description: 'Generative AI engineering, intelligent agents, and API service integration.',
    skills: [
      { name: 'OpenAI API', focus: 'Prompt engineering, function calling, tool use' },
      { name: 'Gemini API', focus: 'Multimodal AI, structured outputs, Google AI Studio' },
      { name: 'Google AI Studio', focus: 'Prompt prototyping, system instructions, model fine-tuning' },
      { name: 'AI-Powered App Dev', focus: 'Context injection, agentic workflows, conversational UIs' },
      { name: 'REST APIs & Webhooks', focus: 'API design, payload serialization, rate limiting' },
      { name: 'API Integration', focus: 'Third-party OAuth, telemetry endpoints, webhook consumers' },
    ]
  },
  {
    id: 'automation-pipelines',
    name: 'Automation & Integration Pipelines',
    description: 'Autonomous workflows, multi-agent scheduling, and cloud media ingestion pipelines.',
    skills: [
      { name: 'n8n', focus: 'Self-hosted & cloud workflow orchestration, custom nodes' },
      { name: 'Make.com', focus: 'Multi-scenario business logic, automated routing' },
      { name: 'Apify', focus: 'Web scraping, proxy rotation, data extraction actors' },
      { name: 'Multi-Agent Scheduling', focus: 'Automated appointment booking & conflict resolution' },
      { name: 'Cloud Ingestion Pipelines', focus: 'Automated Google Drive media ingestion & storage' },
      { name: 'AI Brand Research Pipelines', focus: 'Automated market synthesis via LLMs & Sheets' },
      { name: 'Google Workspace APIs', focus: 'Gmail, Calendar, Sheets, Drive automated integrations' },
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Application Hardening',
    description: 'Offensive security fundamentals, vulnerability assessment, and web exploitation testing.',
    skills: [
      { name: 'Web App Security Assessment', focus: 'OWASP Top 10, auth bypass, injection vectors' },
      { name: 'Vulnerability Assessment', focus: 'Endpoint auditing, misconfiguration discovery' },
      { name: 'Penetration Testing Fundamentals', focus: 'Reconnaissance, active scanning, exploitation validation' },
      { name: 'Kali Linux', focus: 'Offensive toolchains, terminal auditing, network diagnostics' },
      { name: 'Burp Suite', focus: 'HTTP request interception, repeater, intruder, proxy testing' },
      { name: 'SQLMap', focus: 'Automated database vulnerability detection & testing' },
      { name: 'DVWA', focus: 'Damn Vulnerable Web App attack scenario simulation' },
      { name: 'Network Security Testing', focus: 'Traffic capture, port auditing, firewall inspection' },
      { name: 'Incident Response Fundamentals', focus: 'Log triage, attack surface containment, reporting' },
      { name: 'VirtualBox & Tor', focus: 'Isolated sandbox testbeds, anonymous security routing' },
    ]
  },
  {
    id: 'uav-systems',
    name: 'UAV & Systems Technology',
    description: 'Unmanned aerial vehicle avionics, flight simulation, and real-time telemetry protocols.',
    skills: [
      { name: 'ArduPilot', focus: 'Autopilot firmware configuration, mission parameters' },
      { name: 'Mission Planner', focus: 'Ground control station (GCS), waypoint navigation' },
      { name: 'MAVLink Protocol', focus: 'Micro air vehicle telemetry serialization & packet parsing' },
      { name: 'SITL Simulation', focus: 'Software In The Loop hardware-less flight testing' },
      { name: 'UAV Configuration', focus: 'ESC calibration, sensor PID tuning, failsafes' },
      { name: 'UDP Telemetry', focus: 'Low-latency flight telemetry & control data streaming' },
      { name: 'Real-Time Video Streaming', focus: 'RTSP/UDP video transmission & ground link auditing' },
      { name: 'RTK (Real-Time Kinematic)', focus: 'High-precision satellite positioning & GPS correction' },
    ]
  },
  {
    id: 'backend-mobile-cloud',
    name: 'Backend, Mobile & Cloud Infrastructure',
    description: 'Databases, native mobile architectures, and cloud deployment pipelines.',
    skills: [
      { name: 'Supabase', focus: 'PostgreSQL BaaS, Row-Level Security, Auth, Realtime' },
      { name: 'PostgreSQL Fundamentals', focus: 'Relational schemas, foreign keys, index optimization' },
      { name: 'CRUD Workflows', focus: 'Structured database operations, transaction handling' },
      { name: 'Kotlin & Android Studio', focus: 'StudyMate AI and CareerMate AI mobile applications' },
      { name: 'Cloud Hosting', focus: 'Vercel, Netlify, Railway continuous deployment' },
      { name: 'Docker Fundamentals', focus: 'Containerized environments, reproducible test environments' },
      { name: 'Git & GitHub', focus: 'Branching models, PR reviews, CI/CD actions' },
    ]
  },
  {
    id: 'business-professional',
    name: 'Business Development & Client Engagement',
    description: 'Market outreach, lead qualification, partnership execution, and commercial communications.',
    skills: [
      { name: 'Lead Generation', focus: 'Google Maps prospecting, market research, ICP filtering' },
      { name: 'Business Development', focus: 'Inbound & outbound pipelines, strategic growth' },
      { name: 'Client Engagement', focus: 'Live product demonstration calls & objection handling' },
      { name: 'Sales Communication', focus: 'Structured outreach scripts, professional value propositions' },
      { name: 'Partnership Documentation', focus: 'Commercial agreements, collaboration contracts' },
      { name: 'Technical Documentation', focus: 'Vulnerability reports, system architecture briefs' },
    ]
  },
  {
    id: 'analytical-strengths',
    name: 'Analytical Thinking & Strengths',
    description: 'Problem-solving methodologies, technical research, and digital workplace execution.',
    skills: [
      { name: 'Analytical Problem-Solving', focus: 'First-principles reasoning, root-cause isolation' },
      { name: 'Communication & Teamwork', focus: 'Cross-functional engineering & client liaison' },
      { name: 'Leadership & Adaptability', focus: 'Deloitte-simulated decision making under ambiguity' },
      { name: 'Technical Research & Fast Learning', focus: 'Rapid evaluation of cutting-edge frameworks' },
      { name: 'Digital Literacy', focus: 'Advanced Boolean search operators & source verification' },
      { name: 'Data Analysis Techniques', focus: 'Excel, Tableau, foundational forensic data triage' },
    ]
  }
];
