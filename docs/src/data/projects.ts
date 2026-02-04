export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  techStack: string[];
  role: string;
  contributions: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const projects: Project[] = [
    {
    id: "chat-with-documents-ai",
    title: "Chat-with-Documents AI Application",
    description:
        "AI-powered web application that allows users to upload documents and interact with them through conversational Q&A.",
    problem:
        "Users needed an intuitive way to extract insights from large documents without manually searching through files.",
    techStack: [
        "Python",
        "FastAPI",
        "AWS S3",
        "MongoDB",
        "LangChain",
        "OpenAI API",
        "FAISS"
    ],
    role: "Backend Engineer",
    contributions: [
        "Built a FastAPI backend enabling document upload, storage, and conversational querying",
        "Implemented vector-based document retrieval using FAISS and OpenAI embeddings for context-aware responses",
        "Integrated AWS S3 for secure document storage and MongoDB for session-based conversation history"
    ],
    githubUrl: "https://github.com/sjnptl",
    liveUrl: undefined
    },
    {
    id: "full-stack-web-platform",
    title: "Full-Stack Web Platform",
    description:
        "Scalable web platform with REST APIs and responsive frontend components for web and mobile use cases.",
    problem:
        "The application required a maintainable backend architecture and responsive UI to support evolving business needs.",
    techStack: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Python",
        "REST APIs",
        "GitHub"
    ],
    role: "Full-Stack Engineer Intern",
    contributions: [
        "Designed and implemented backend REST APIs using Node.js and Spring Boot",
        "Developed interactive frontend features with a focus on responsiveness and usability",
        "Collaborated with designers and engineers to align technical solutions with product goals"
    ],
    githubUrl: "https://github.com/sjnptl",
    liveUrl: undefined
    },
    {
    id: "biosignal-monitoring-system",
    title: "Real-Time Bio-Signal Monitoring System",
    description:
        "Python-based application for real-time acquisition, visualization, and analysis of physiological sensor data.",
    problem:
        "Researchers needed a reliable way to collect and visualize EMG, ECG, and pulse oximeter data in real time.",
    techStack: [
        "Python",
        "Signal Processing",
        "Microcontrollers",
        "Embedded Systems"
    ],
    role: "Software Engineer",
    contributions: [
        "Engineered real-time data pipelines to interface with EMG, ECG, and pulse oximeter sensors",
        "Developed an interactive GUI for visualizing physiological signals",
        "Implemented signal-processing techniques to support analysis and feature extraction"
    ],
    githubUrl: "https://github.com/sjnptl",
    liveUrl: undefined
    },
    // {
    // id: "salesforce-data-automation",
    // title: "Salesforce Data Automation & Validation",
    // description:
    //     "Internal tooling and automation to improve data quality and consistency across Salesforce records.",
    // problem:
    //     "Inconsistent and error-prone client data created downstream reporting and operational issues.",
    // techStack: [
    //     "Salesforce",
    //     "Web Scraping",
    //     "Data Validation",
    //     "Automation Scripts"
    // ],
    // role: "Software Engineering Intern",
    // contributions: [
    //     "Automated data collection and ingestion using web scraping techniques",
    //     "Identified and resolved inconsistencies in Salesforce client records",
    //     "Improved overall data integrity and reduced manual correction efforts"
    // ],
    // githubUrl: "https://github.com/sjnptl",
    // liveUrl: undefined
    // }

];