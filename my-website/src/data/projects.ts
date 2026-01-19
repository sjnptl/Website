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
    id: "distributed-task-queue",
    title: "Distributed Task Queue",
    description: "High-throughput task processing system handling 10K+ jobs/minute with fault tolerance and horizontal scaling.",
    problem: "Legacy cron-based job processing was unreliable and couldn't scale with growing workloads.",
    techStack: ["Go", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    role: "Lead Engineer",
    contributions: [
      "Designed message-passing architecture with exactly-once delivery guarantees",
      "Implemented dead-letter queues and automatic retry with exponential backoff",
      "Reduced processing latency by 85% compared to previous system"
    ],
    githubUrl: "https://github.com",
    liveUrl: undefined
  },
  {
    id: "realtime-analytics-dashboard",
    title: "Real-time Analytics Dashboard",
    description: "Live metrics visualization platform processing millions of events with sub-second latency.",
    problem: "Business stakeholders needed real-time visibility into system performance and user behavior.",
    techStack: ["React", "TypeScript", "WebSocket", "Node.js", "ClickHouse"],
    role: "Full-Stack Engineer",
    contributions: [
      "Built custom WebSocket layer handling 50K concurrent connections",
      "Optimized React rendering for smooth 60fps updates on complex charts",
      "Implemented efficient data aggregation reducing query times by 70%"
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com"
  },
  {
    id: "api-gateway",
    title: "API Gateway & Rate Limiter",
    description: "Centralized API gateway with intelligent rate limiting, request validation, and observability.",
    problem: "Microservices architecture needed unified authentication, rate limiting, and request routing.",
    techStack: ["Python", "FastAPI", "Redis", "AWS Lambda", "Terraform"],
    role: "Backend Engineer",
    contributions: [
      "Designed token bucket algorithm supporting tiered rate limits per client",
      "Implemented circuit breaker pattern preventing cascade failures",
      "Added distributed tracing with OpenTelemetry for debugging complex flows"
    ],
    githubUrl: "https://github.com",
    liveUrl: undefined
  },
  {
    id: "ml-feature-store",
    title: "ML Feature Store",
    description: "Centralized feature management platform serving ML models in production with low-latency lookups.",
    problem: "Data scientists were duplicating feature engineering work and production features drifted from training.",
    techStack: [".NET", "PostgreSQL", "Redis", "Apache Kafka", "Docker"],
    role: "Senior Engineer",
    contributions: [
      "Architected event-driven pipeline for real-time feature computation",
      "Built versioning system ensuring training-serving consistency",
      "Achieved p99 latency under 10ms for feature retrieval at scale"
    ],
    githubUrl: "https://github.com",
    liveUrl: undefined
  }
];