// ============================================================
// portfolioData.js — Centralized configuration for Himanshu Upraity's Portfolio
// All external links, personal info, and content in one place.
// Update this file to change any content across the entire site.
// ============================================================

export const personalInfo = {
  name: "Himanshu Upraity",
  firstName: "Himanshu",
  brandName: "Himanshu Upraity",
  title: "AI Engineer & SDET",
  location: "Agra, India · Open to Remote",
  phone: "+91 89234 48944",
  emails: {
    primary: "himanshu.upraity.14.hk@gmail.com",
  },
  summary:
    "Engineer with 4+ years spanning QA automation, device validation, and full-stack development. Currently building and testing AI-driven products at CosX — writing Playwright suites on scheduled GitHub Actions pipelines, developing frontend features in Next.js, and working through the command line with AI-assisted tooling.",
  resumeUrl: "/Himanshu_Upraity_CV.pdf",
};

export const socialLinks = {
  github: "https://github.com/Himanshuupraity",
  linkedin: "https://linkedin.com/in/himanshuupraity",
  email: "mailto:himanshu.upraity.14.hk@gmail.com",
};

// Prefilled hiring enquiry, reused by the Navbar CTA and the Hero secondary button.
export const hireMeMailto = `mailto:${personalInfo.emails.primary}?subject=${encodeURIComponent(
  "Hiring Inquiry – Portfolio"
)}&body=${encodeURIComponent(
  `Hello Himanshu,\n\nI came across your portfolio and would like to discuss an opportunity with you.\n\nLooking forward to hearing from you.\nBest Regards,`
)}`;

export const heroContent = {
  greeting: "Hi, I'm Himanshu",
  titleHighlight: "AI Engineer & SDET",
  subtitle:
    "I build and test AI-driven products — Playwright automation, CI pipelines, and Next.js frontends.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: { text: "Contact Me", href: hireMeMailto },
  ctaResume: { text: "Download Resume", href: personalInfo.resumeUrl },
};

export const aboutContent = {
  heading: "Hello!",
  bio: `Hi, my name is <span class="text-black text-xl font-black mx-1 tracking-wide uppercase">Himanshu Upraity</span>, an AI Engineer and SDET based in Agra, India, with 4+ years across QA automation, frontend development, and device validation — building products and the test suites that keep them honest.`,
  techStack: ["Python", "Playwright", "React & Next.js"],
};

export const skillsContent = {
  badge: "How I Work",
  heading: "Here's how I take a feature from requirement to release",
  description:
    "A structured loop that closes the gap between building a feature and proving it actually works.",
  cards: [
    {
      number: "01",
      title: "Understand",
      text: "I translate business requirements into testable acceptance criteria with product and engineering, so quality is defined before a line of code is written.",
    },
    {
      number: "02",
      title: "Build",
      text: "Developing frontend features in Next.js and React, then diagnosing and fixing UI defects directly — closing the dev-QA loop without handoff delay.",
    },
    {
      number: "03",
      title: "Automate",
      text: "Writing Playwright regression suites in Python and scheduling them through GitHub Actions, so failures surface without anyone triggering a run.",
    },
    {
      number: "04",
      title: "Ship & Monitor",
      text: "Driving deliverables through UAT sign-off, then monitoring application performance and system reliability to flag degradation before users see it.",
    },
  ],
  endText: "Ready to ship!",
};

export const technicalSkills = {
  categories: [
    {
      title: "Test Automation",
      skills: [
        { name: "Playwright (Python)", level: 92 },
        { name: "Selenium WebDriver", level: 88 },
        { name: "Selenium IDE", level: 80 },
        { name: "Apache JMeter", level: 78 },
      ],
    },
    {
      title: "QA Practices",
      skills: [
        { name: "Functional & Regression", level: 93 },
        { name: "End-to-End & UAT", level: 90 },
        { name: "Test Case Design", level: 90 },
        { name: "Defect Lifecycle Mgmt", level: 88 },
        { name: "Cross-Browser Testing", level: 85 },
      ],
    },
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: 88 },
        { name: "Next.js", level: 85 },
        { name: "JavaScript", level: 87 },
        { name: "HTML5 & CSS3", level: 90 },
        { name: "Bootstrap", level: 85 },
      ],
    },
    {
      title: "Languages & Databases",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 87 },
        { name: "SQL", level: 82 },
        { name: "MySQL", level: 80 },
        { name: "Java (Basic)", level: 55 },
      ],
    },
    {
      title: "CI/CD & Tooling",
      skills: [
        { name: "GitHub Actions", level: 88 },
        { name: "Git & GitHub", level: 90 },
        { name: "Jenkins", level: 75 },
        { name: "Postman", level: 88 },
        { name: "Jira", level: 90 },
        { name: "Linux / Bash CLI", level: 85 },
      ],
    },
    {
      title: "AI-Assisted Development",
      skills: [
        { name: "Claude (CLI)", level: 90 },
        { name: "AI Test Generation", level: 88 },
        { name: "AI-Assisted Debugging", level: 85 },
        { name: "Prompt Engineering", level: 85 },
      ],
    },
  ],
};

export const experienceList = [
  {
    organization: "CosX (CosxLive Technologies)",
    role: "Artificial Intelligence Engineer",
    duration: "Jan 2026 – Present",
    badge: "Current",
    skills: [
      "Own end-to-end quality for AI-driven products, from test protocol design to defect closure",
      "Automated Playwright regression suites scheduled daily via GitHub Actions",
      "Frontend feature development in Next.js and React, plus direct UI defect resolution",
      "CLI-first AI-assisted development — test generation, debugging, and code review",
      "Performance and reliability monitoring ahead of production impact",
    ],
    tech: ["Playwright", "Python", "Next.js", "React", "GitHub Actions", "Claude CLI"],
  },
  {
    organization: "Techeunoia International",
    role: "Full Stack Developer & Tester",
    duration: "Sep 2024 – Jul 2025",
    badge: "Full-Time",
    skills: [
      "Built the frontend of a commercial SaaS Office & Inventory Management platform",
      "Designed and maintained Selenium WebDriver automation, cutting manual regression cycles",
      "Ran functional, regression, and JMeter performance testing across client deployments",
      "Led QA for Indian Oil and Alvista through to UAT sign-off",
    ],
    tech: ["React.js", "Bootstrap", "Selenium", "JMeter", "MySQL", "Jira"],
  },
  {
    organization: "Marquis Technology",
    role: "Testing Engineer",
    duration: "Jan 2022 – Jul 2024",
    badge: "Full-Time",
    skills: [
      "End-to-end validation of mobile devices, Smart TVs, and IoT equipment",
      "5G (SA/NSA), 4G, 3G and 2G validation including Carrier Aggregation, CSFB and SRVCC",
      "BIS lab certification against IS 13252, IS 616 and IS 16242",
      "Root-caused call drops, call-forwarding failures, and system crashes",
    ],
    tech: ["MSM Tool", "SP Flash Tool", "PicoScope6", "G NET Tracker", "ISM Pro"],
  },
];

export const educationList = [
  {
    title: "B.Tech, Electronics & Communication Engineering",
    description:
      "Raja Balwant Singh Engineering Technical Campus, Agra. Four-year engineering degree covering electronics, communication systems, and programming fundamentals.",
    role: "2018 – 2022",
    badge: "Degree",
  },
  {
    title: "Python Full Stack Development",
    description:
      "Ducat Institute, Noida. Intensive full stack programme covering Python, databases, and modern web development end to end.",
    role: "2023 – 2024",
    badge: "Training",
  },
  {
    title: "Software Testing & Selenium",
    description:
      "Internshala. Six-week online training covering Java basics, automation testing fundamentals, Selenium WebDriver commands, and Selenium locators & methods.",
    role: "Completed March 2025",
    badge: "Training",
  },
  {
    title: "Python with Playwright",
    description:
      "Uncodemy Edutech Pvt. Ltd. Three-month training programme certified by Skill India, NASSCOM and FutureSkills Prime (MeitY).",
    role: "Completed July 2026",
    badge: "Certification",
  },
];

export const softSkillsList = [
  { name: "Ownership", icon: "🎯", desc: "Owning quality end to end — from test protocol design through to defect closure." },
  { name: "Analytical Thinking", icon: "🧩", desc: "Root-causing defects by reading the code, not just reporting the symptom." },
  { name: "Attention to Detail", icon: "🔍", desc: "Catching the edge case that would otherwise ship broken to production." },
  { name: "Collaboration", icon: "🤝", desc: "Closing the dev-QA loop directly, without handoff delay between teams." },
  { name: "Communication", icon: "💬", desc: "Turning business requirements into clear, testable acceptance criteria." },
  { name: "Adaptability", icon: "🌟", desc: "Moved from telecom hardware validation to AI product engineering." },
  { name: "Continuous Learning", icon: "📚", desc: "Playwright, Next.js and AI-assisted workflows — self-driven and certified." },
  { name: "Creativity", icon: "🎨", desc: "Graphic design and image editing background, applied to every UI I touch." },
];

export const projects = [
  {
    id: "saas-office-inventory",
    number: "01",
    badge: "🚀 Flagship Product",
    title: "SaaS Office & Inventory Management Platform",
    description:
      "A commercial multi-module SaaS platform for office and inventory operations, shipped for both internal use and external sale. I built the frontend end to end — responsive dashboards, inventory and asset management screens, and role-driven views — then tested my own work, using development context to root-cause defects faster and push for a more testable codebase.",
    techTags: ["React.js", "JavaScript", "HTML5", "CSS3", "Bootstrap", "REST APIs", "MySQL"],
    links: {},
    isFlagship: true,
  },
  {
    id: "ai-quality-automation",
    number: "02",
    badge: "🤖 AI-Driven",
    title: "AI Product Quality Automation Suite",
    description:
      "An automated regression suite for AI-driven products at CosX, written in Playwright with Python and scheduled to run daily through GitHub Actions so failures surface without anyone triggering a run. Built almost entirely from the command line using AI-assisted tooling to generate and refine test scripts, debug failing runs, and review code before it reaches the repository.",
    techTags: ["Playwright", "Python", "GitHub Actions", "Pytest", "Claude CLI", "Linux/Bash"],
    links: {},
    isFlagship: false,
  },
  {
    id: "enterprise-qa-delivery",
    number: "03",
    badge: null,
    title: "Enterprise QA Delivery — Indian Oil & Alvista",
    description:
      "Led quality assurance for enterprise client projects, taking deliverables through to UAT sign-off against stringent acceptance criteria. Combined Selenium WebDriver regression automation with Apache JMeter performance testing to validate stability under load across multiple client deployments.",
    techTags: ["Selenium WebDriver", "Apache JMeter", "Postman", "Jira", "MySQL"],
    links: {},
    isFlagship: false,
  },
];

export const certificates = {
  featured: [
    {
      name: "Python with Playwright",
      issuer: "Uncodemy Edutech · NASSCOM & Skill India",
      icon: "🎭",
      file: "/certificates/python-with-playwright-uncodemy.png",
    },
    {
      name: "Python Full Stack Development",
      issuer: "Ducat Institute, Noida",
      icon: "🐍",
      file: "/certificates/python-full-stack-ducat.pdf",
    },
    {
      name: "Software Testing & Selenium",
      issuer: "Internshala",
      icon: "🤖",
      file: "/certificates/software-testing-internshala.pdf",
    },
    {
      name: "Advanced Excel",
      issuer: "Elearnmarkets",
      icon: "📊",
      file: "/certificates/advanced-excel-elearnmarkets.pdf",
    },
    {
      name: "Technical Workshop — ADRDE",
      issuer: "DRDO",
      icon: "🛡️",
      file: null,
    },
    {
      name: "Technical Workshops",
      issuer: "Indian Railways · 509 Army Base",
      icon: "🚄",
      file: null,
    },
  ],
  viewAllUrl: socialLinks.linkedin,
  viewAllLabel: "View Credentials on LinkedIn",
};

export const education = {
  degree: "B.Tech – Electronics & Communication Engineering",
  institution: "Raja Balwant Singh Engineering Technical Campus, Agra",
  graduation: "2022",
  experience: "4+ Years",
};

export const footerContent = {
  taglines: [
    "AI Engineering & QA Automation",
    "Playwright · Next.js · Python",
    "Test Automation & Frontend Development",
  ],
  credential: "4+ Years Experience · B.Tech ECE",
  copyright: `© ${new Date().getFullYear()} Himanshu Upraity | Built with React`,
};

// EmailJS Configuration
// Will read directly from environment variables in Vite (starting with VITE_)
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
