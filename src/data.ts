// ===================================================================
// data.ts — All portfolio content as typed structured data
// ===================================================================

import type { PortfolioData } from "./types";

export const PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "Sampath Kumar",
    lastName: "Veesam",
    initials: "SK.",
    title: "Software Test Engineer (STE)",
    phone: "+91 93906 94772",
    email: "sampathkumarveesam@gmail.com",
    location: "Hyderabad, India",
    linkedin: "https://www.linkedin.com/in/sampathkumarveesam/",
    github: "https://github.com/SampathKumarVeesam",
    profileImage: "/images/profile.png",
    heroBackground: "/images/hero-bg.png",
    summary:
      "Software Test Engineer (STE) with 1.5+ years of experience specializing in test automation, mobile testing, backend API validation, and full-stack development. Proficient in building robust frameworks using Playwright, JavaScript, and Node.js, with deep expertise in REST API testing and SQL database validation.",
    aboutParagraphs: [
      "I'm a Software Test Engineer (STE) based in Hyderabad, India, with hands-on experience in test automation, mobile testing, backend API validation, and full-stack development.",
      "Proficient in building robust automation frameworks using Playwright, JavaScript, and Node.js. I've demonstrated expertise in REST API testing, SQL database validation, and Agile QA methodologies with a proven track record of reducing manual testing effort by 40%.",
      "I hold a B.Tech in Computer Science from KasiReddy NarayanReddy College of Engineering & Research, and I'm passionate about designing scalable test architectures and building AI-driven knowledge systems.",
    ],
    aboutTags: [
      "Playwright",
      "JavaScript",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "GitHub Actions",
      "Agile/Scrum",
      "CI/CD",
      "Mobile Testing",
      "Manual/Automation Testing"
    ],
  },

  roles: [
    "Software Test Engineer (STE)",
    "Full Stack Developer",
    "QA Automation Engineer",
    "Test Automation Architect",
  ],

  stats: [
    { value: 1, suffix: ".5+", label: "Years Exp." },
    { value: 40, suffix: "%", label: "Testing Reduced" },
    { value: 98, suffix: "%", label: "Pass Rate" },
  ],

  floatingBadges: [
    { icon: "🎯", text: "STE (QA Automation)", position: "badge-1" },
    { icon: "⚡", text: "Playwright Expert", position: "badge-2" },
    { icon: "🚀", text: "Full Stack Dev", position: "badge-3" },
  ],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],

  skills: [
    {
      icon: "🔧",
      title: "Testing & Mobile Automation",
      items: [
        { name: "Playwright", level: 95 },
        { name: "Test Automation (POM)", level: 90 },
        { name: "Appium & Mobile Testing", level: 85 },
        { name: "Regression & E2E Testing", level: 92 },
        { name: "API & Backend Testing", level: 90 },
      ],
    },
    {
      icon: "💻",
      title: "Programming & Scripting",
      items: [
        { name: "JavaScript (ES6+)", level: 92 },
        { name: "Java", level: 80 },
        { name: "Node.js/Express.js", level: 85 },
        { name: "HTML5/CSS3/ReactJS", level: 88 },
      ],
    },
    {
      icon: "🗄️",
      title: "Database & DevOps Tools",
      items: [
        { name: "SQL & PostgreSQL", level: 88 },
        { name: "Git, GitHub & CI/CD", level: 90 },
        { name: "JIRA & Defect Tracking", level: 88 },
        { name: "Testing Methodologies (Agile/SDLC)", level: 90 },
      ],
    },
  ],

  experience: [
    {
      date: "February 2026 – Present",
      role: "SDET (Software Development Engineer in Test)",
      company: "Codinglimits",
      location: "Nellore, India",
      bullets: [
        "Architected and maintained Playwright-based test automation framework from scratch, achieving 40% reduction in manual regression testing effort and increasing test coverage by 60%",
        "Developed LinkedIn automation scraper using Playwright and JavaScript, enabling structured data extraction and reducing manual data collection time by 80%",
        "Prepared a structured technical knowledge base for Mockwin.ai using AI prompts, which boosted AI response accuracy by 35% for VLSI and SAP topics.",
        "Executed comprehensive REST API testing and backend validation, identifying and resolving 50+ critical defects before production release",
        "Collaborated in Agile cross-functional teams with sprint planning, daily standups, and defect triage using JIRA; maintained 95% on-time test delivery rate.",
        "Executed mobile app testing and verified device responsiveness using Appium across Android and iOS platforms..",
      ],
    },
    {
      date: "November 2025 – February 2026",
      role: "QA Automation Intern",
      company: "Codinglimits",
      location: "Nellore, India",
      bullets: [
        "Designed, documented, and executed 200+ comprehensive test cases for AI-powered platforms covering functional, regression, and edge-case scenarios",
        "Performed rigorous functional and regression testing across multiple product releases, ensuring zero critical defects escaped to production",
        "Tracked, prioritized, and verified 100+ defects through full lifecycle using JIRA, improving team defect resolution turnaround by 25%",
      ],
    },
    {
      date: "July 2025 – September 2025",
      role: "Full Stack Developer",
      company: "TEK-PAL",
      location: "Hyderabad, India",
      bullets: [
        "Developed full-featured real estate web application using Node.js, Express.js, and PostgreSQL, handling 1000+ property listings with optimized search",
        "Engineered secure REST APIs with OAuth2 authentication and role-based access control, serving 500+ daily API requests",
        "Implemented Excel bulk upload functionality with data validation and error handling, reducing manual data entry effort by 70%",
      ],
    },
    {
      date: "March 2025 – June 2025",
      role: "QA Trainee",
      company: "Spektra Systems",
      location: "Bangalore, India",
      bullets: [
        "Executed functional, regression, and system testing for enterprise cloud applications, maintaining 98% test case pass rate",
        "Applied Boundary Value Analysis (BVA) and Equivalence Partitioning techniques to design optimized test cases, reducing redundant test execution by 30%",
        "Authored detailed test plans, test cases, and defect reports with clear reproduction steps, improving developer-debugging efficiency",
      ],
    },
  ],

  projects: [
    {
      title: "LinkedIn Profile Automation Scraper",
      image: "/images/project-linkedin.png",
      description:
        "Built automated data extraction pipeline using Playwright to scrape and structure LinkedIn profile data, automating 500+ profile processing per run. Implemented headless browser automation with anti-detection measures, CAPTCHA handling, and data export to structured JSON/Excel formats.",
      tags: ["Playwright", "JavaScript", "GitHub Actions", "CI/CD"],
      link: "https://github.com/SampathKumarVeesam",
    },
    {
      title: "RAG-Based Knowledge Base System",
      image: "/images/project-rag.png",
      description:
        "Architected Retrieval-Augmented Generation system for domain-specific AI responses in VLSI and SAP technologies for Mockwin.ai. Structured and indexed 10,000+ technical documents into vector embeddings, achieving 35% improvement in response relevance scores.",
      tags: ["RAG", "Vector Embeddings", "AI/ML", "VLSI"],
      link: "https://github.com/SampathKumarVeesam",
    },
    {
      title: "Real Estate Web Application",
      image: "/images/project-tekpal.png",
      description:
        "Full-featured real estate platform built with Node.js, Express.js, and PostgreSQL. Features include optimized property search across 1000+ listings, OAuth2 authentication, role-based access control, and Excel bulk upload with data validation.",
      tags: ["Node.js", "Express.js", "PostgreSQL", "OAuth2"],
      link: "https://github.com/SampathKumarVeesam",
    },
  ],

  education: [
    {
      icon: "🎓",
      degree: "Bachelor of Engineering (Btech) - Computer Science and Engineering",
      school:
        "KasiReddy NarayanReddy College of Engineering & Research, Hyderabad",
      details: "Graduated: 2023 · CGPA: 7.14 / 10",
    },
    {
      icon: "📚",
      degree: "Intermediate",
      school: "Loyola Academy Junior College, Hyderabad",
      details: "Graduated: 2019 · Marks: 872 / 1000",
    },
    {
      icon: "🏫",
      degree: "SSC",
      school: "Bethel Velanganni Matha High school, Nellore",
      details: "Graduated: 2017 | Grade Points : 9.0/10",
    },
  ],

  certifications: [
    { title: "QA Internship Certification", org: "Codinglimits · 2026" },
    { title: "QA Internship Certification", org: "Spektra Systems · 2025" },
    {
      title: "Full Stack Development with Java",
      org: "Besant Technologies · 2024",
    },
    { title: "RPA Developer Foundation", org: "UiPath (Honeywell) · 2022" },
  ],
};
