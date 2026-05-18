// src/data/courses.ts

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "assignment";
  duration: string; // e.g. "8:34"
  free?: boolean;
  completed?: boolean;
  videoUrl?: string; // YouTube embed or direct mp4
  description?: string;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Mandatory";
  duration: string;
  modules: number;
  icon: string; // lucide icon name reference kept as string for flexibility
  iconColor: string;
  iconBg: string;
  tagClass: string;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  lastUpdated: string;
  instructor: { name: string; title: string; initials: string };
  progress?: number;
  enrolled: boolean;
  mandatory?: boolean;
  description: string;
  whatYouLearn: string[];
  requirements: string[];
  curriculum: Section[];
}

export const COURSES: Course[] = [
  {
    id: "schema-design-mastery",
    title: "Schema Design Mastery",
    tagline:
      "Design resilient, scalable data schemas used in production systems.",
    category: "Schema",
    level: "Advanced",
    duration: "12h",
    modules: 6,
    icon: "Database",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tagClass: "bg-blue-50 text-blue-600",
    rating: 4.8,
    reviewCount: 312,
    enrolledCount: 1842,
    lastUpdated: "May 2025",
    instructor: {
      name: "Dr. Vikram Rao",
      title: "Principal Data Architect",
      initials: "VR",
    },
    progress: 68,
    enrolled: true,
    description:
      "A deep-dive into the principles and patterns of schema design for relational and NoSQL databases. You'll learn normalization, denormalization trade-offs, indexing strategies, and how to evolve schemas without downtime.",
    whatYouLearn: [
      "Master all normal forms from 1NF through BCNF",
      "Design schemas optimized for read-heavy vs write-heavy workloads",
      "Implement safe zero-downtime schema migrations",
      "Use foreign keys, constraints, and triggers effectively",
      "Apply indexing strategies for complex query patterns",
      "Model many-to-many and hierarchical relationships",
    ],
    requirements: [
      "Basic SQL knowledge (SELECT, JOIN, GROUP BY)",
      "Familiarity with at least one RDBMS (PostgreSQL, MySQL, etc.)",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Foundations of Schema Design",
        lessons: [
          {
            id: "l1",
            title: "What is a Schema?",
            type: "video",
            duration: "6:12",
            free: true,
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "Relational vs Document Models",
            type: "video",
            duration: "9:48",
            free: true,
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l3",
            title: "Reading: Schema Design Patterns",
            type: "reading",
            duration: "10 min",
            completed: true,
          },
          {
            id: "l4",
            title: "Knowledge Check Quiz",
            type: "quiz",
            duration: "5 min",
            completed: true,
          },
        ],
      },
      {
        id: "s2",
        title: "Normalization & Normal Forms",
        lessons: [
          {
            id: "l5",
            title: "First & Second Normal Form",
            type: "video",
            duration: "11:20",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l6",
            title: "Third Normal Form & BCNF",
            type: "video",
            duration: "13:05",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l7",
            title: "When to Denormalize",
            type: "video",
            duration: "8:44",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s3",
        title: "Indexing Strategies",
        lessons: [
          {
            id: "l8",
            title: "B-Tree vs Hash Indexes",
            type: "video",
            duration: "10:30",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l9",
            title: "Composite & Partial Indexes",
            type: "video",
            duration: "9:15",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l10",
            title: "Index Lab Exercise",
            type: "assignment",
            duration: "30 min",
            completed: false,
          },
        ],
      },
      {
        id: "s4",
        title: "Schema Migrations",
        lessons: [
          {
            id: "l11",
            title: "Zero-Downtime Migration Patterns",
            type: "video",
            duration: "14:22",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l12",
            title: "Versioning Your Schema",
            type: "video",
            duration: "8:10",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s5",
        title: "Advanced Patterns",
        lessons: [
          {
            id: "l13",
            title: "EAV Model & When to Avoid It",
            type: "video",
            duration: "11:55",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l14",
            title: "Polymorphic Associations",
            type: "video",
            duration: "9:40",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l15",
            title: "Module Assessment",
            type: "quiz",
            duration: "20 min",
            completed: false,
          },
        ],
      },
      {
        id: "s6",
        title: "Final Project & Certification",
        lessons: [
          {
            id: "l16",
            title: "Final Assignment Brief",
            type: "reading",
            duration: "5 min",
            completed: false,
          },
          {
            id: "l17",
            title: "Final Assignment Submission",
            type: "assignment",
            duration: "2h",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "etl-pipeline",
    title: "Ingestion & ETL Pipeline",
    tagline: "Build robust data ingestion pipelines from source to warehouse.",
    category: "ETL",
    level: "Intermediate",
    duration: "15h",
    modules: 7,
    icon: "GitMerge",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    tagClass: "bg-emerald-50 text-emerald-600",
    rating: 4.6,
    reviewCount: 198,
    enrolledCount: 1240,
    lastUpdated: "Apr 2025",
    instructor: {
      name: "Sneha Kulkarni",
      title: "Senior Data Engineer",
      initials: "SK",
    },
    progress: 32,
    enrolled: true,
    description:
      "Learn to design and operate production ETL pipelines that reliably move and transform data at scale. Covers batch and streaming patterns, error handling, monitoring, and orchestration with Apache Airflow.",
    whatYouLearn: [
      "Understand Extract, Transform, Load concepts end to end",
      "Build batch and streaming pipelines",
      "Handle errors, retries, and dead-letter queues",
      "Orchestrate workflows with Apache Airflow",
      "Monitor pipeline health and set up alerting",
    ],
    requirements: [
      "Python programming basics",
      "Basic SQL",
      "Familiarity with cloud storage (S3 / GCS)",
    ],
    curriculum: [
      {
        id: "s1",
        title: "ETL Fundamentals",
        lessons: [
          {
            id: "l1",
            title: "What is ETL?",
            type: "video",
            duration: "7:10",
            free: true,
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "ETL vs ELT",
            type: "video",
            duration: "8:45",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s2",
        title: "Data Extraction Patterns",
        lessons: [
          {
            id: "l3",
            title: "Full Load vs Incremental Load",
            type: "video",
            duration: "10:20",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l4",
            title: "Change Data Capture (CDC)",
            type: "video",
            duration: "12:30",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s3",
        title: "Transformation & Loading",
        lessons: [
          {
            id: "l5",
            title: "Data Cleansing Techniques",
            type: "video",
            duration: "9:55",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l6",
            title: "Slowly Changing Dimensions",
            type: "video",
            duration: "11:00",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l7",
            title: "Loading Strategies: Upsert, Merge",
            type: "video",
            duration: "8:30",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s4",
        title: "Orchestration with Airflow",
        lessons: [
          {
            id: "l8",
            title: "Airflow DAGs & Operators",
            type: "video",
            duration: "13:45",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l9",
            title: "Scheduling & Dependencies",
            type: "video",
            duration: "10:10",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
    ],
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    tagline:
      "Essential security concepts every developer and engineer must know.",
    category: "Cybersecurity",
    level: "Beginner",
    duration: "8h",
    modules: 5,
    icon: "ShieldCheck",
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
    tagClass: "bg-red-50 text-red-500",
    rating: 4.5,
    reviewCount: 156,
    enrolledCount: 2100,
    lastUpdated: "May 2025",
    instructor: {
      name: "Ananya Iyer",
      title: "Security Engineer",
      initials: "AI",
    },
    enrolled: false,
    description:
      "A beginner-friendly overview of cybersecurity principles covering threat modeling, common attack vectors, authentication best practices, and secure coding guidelines relevant for software teams.",
    whatYouLearn: [
      "Understand the CIA triad and core security principles",
      "Identify common attack vectors (OWASP Top 10)",
      "Implement secure authentication and session management",
      "Apply secure coding practices in daily development",
      "Conduct basic threat modeling",
    ],
    requirements: [
      "No prior security experience required",
      "Basic understanding of web applications",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Security Foundations",
        lessons: [
          {
            id: "l1",
            title: "CIA Triad Explained",
            type: "video",
            duration: "8:00",
            free: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "Threat Modeling Basics",
            type: "video",
            duration: "10:15",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s2",
        title: "OWASP Top 10",
        lessons: [
          {
            id: "l3",
            title: "Injection Attacks",
            type: "video",
            duration: "9:30",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l4",
            title: "Broken Authentication",
            type: "video",
            duration: "8:55",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l5",
            title: "XSS & CSRF",
            type: "video",
            duration: "11:20",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s3",
        title: "Secure Coding Practices",
        lessons: [
          {
            id: "l6",
            title: "Input Validation & Sanitization",
            type: "video",
            duration: "7:45",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l7",
            title: "Secure Dependency Management",
            type: "video",
            duration: "8:30",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l8",
            title: "Lab: Secure Code Review",
            type: "assignment",
            duration: "45 min",
          },
        ],
      },
    ],
  },
  {
    id: "data-science-foundations",
    title: "Data Science Foundations",
    tagline: "Statistics, Python, and ML fundamentals for data practitioners.",
    category: "Data Science",
    level: "Intermediate",
    duration: "18h",
    modules: 8,
    icon: "ChartColumn",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    tagClass: "bg-amber-50 text-amber-600",
    rating: 4.7,
    reviewCount: 289,
    enrolledCount: 1560,
    lastUpdated: "Mar 2025",
    instructor: {
      name: "Ravi Menon",
      title: "Lead Data Scientist",
      initials: "RM",
    },
    enrolled: false,
    description:
      "From descriptive statistics to building your first ML model, this course gives data engineers and analysts the toolkit to work confidently with data science workflows.",
    whatYouLearn: [
      "Apply descriptive and inferential statistics",
      "Manipulate data with Pandas and NumPy",
      "Build and evaluate regression and classification models",
      "Visualize data with Matplotlib and Seaborn",
      "Understand overfitting, regularization, and cross-validation",
    ],
    requirements: [
      "Python basics",
      "Basic linear algebra is helpful but not required",
    ],
    curriculum: [
      {
        id: "s1",
        title: "Statistics Refresher",
        lessons: [
          {
            id: "l1",
            title: "Descriptive Statistics",
            type: "video",
            duration: "9:00",
            free: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "Probability & Distributions",
            type: "video",
            duration: "11:30",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s2",
        title: "Python for Data Science",
        lessons: [
          {
            id: "l3",
            title: "Pandas Deep Dive",
            type: "video",
            duration: "14:10",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l4",
            title: "NumPy Essentials",
            type: "video",
            duration: "10:45",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
    ],
  },
  {
    id: "leadership-for-developers",
    title: "Leadership for Developers",
    tagline: "Grow from IC to technical leader with proven frameworks.",
    category: "Leadership",
    level: "Intermediate",
    duration: "6h",
    modules: 4,
    icon: "Users",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    tagClass: "bg-blue-50 text-blue-600",
    rating: 4.9,
    reviewCount: 421,
    enrolledCount: 3200,
    lastUpdated: "May 2025",
    instructor: {
      name: "Kavya Rao",
      title: "Engineering Manager",
      initials: "KR",
    },
    progress: 91,
    enrolled: true,
    description:
      "Practical leadership skills for senior engineers and tech leads — how to run effective 1-on-1s, give feedback, manage up, build team culture, and grow other engineers.",
    whatYouLearn: [
      "Lead without authority as a senior IC",
      "Run effective meetings and 1-on-1s",
      "Give actionable, timely feedback",
      "Resolve conflicts and build psychological safety",
      "Manage stakeholders and communicate up",
    ],
    requirements: ["2+ years of software engineering experience"],
    curriculum: [
      {
        id: "s1",
        title: "The IC-to-Leader Mindset",
        lessons: [
          {
            id: "l1",
            title: "Why Leadership is a Skill",
            type: "video",
            duration: "7:30",
            free: true,
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "Leading Without Authority",
            type: "video",
            duration: "9:15",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s2",
        title: "Communication & Feedback",
        lessons: [
          {
            id: "l3",
            title: "Giving Effective Feedback",
            type: "video",
            duration: "10:00",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l4",
            title: "Running 1-on-1s",
            type: "video",
            duration: "8:45",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s3",
        title: "Team & Culture",
        lessons: [
          {
            id: "l5",
            title: "Building Psychological Safety",
            type: "video",
            duration: "11:00",
            completed: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l6",
            title: "Conflict Resolution",
            type: "video",
            duration: "9:30",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
        ],
      },
      {
        id: "s4",
        title: "Stakeholder Management & Final",
        lessons: [
          {
            id: "l7",
            title: "Managing Up",
            type: "video",
            duration: "8:20",
            completed: false,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l8",
            title: "Final Assignment",
            type: "assignment",
            duration: "1h",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "work-ethics-compliance",
    title: "Work Ethics & Compliance",
    tagline:
      "Mandatory training covering company policies and professional standards.",
    category: "Mandatory",
    level: "Mandatory",
    duration: "2h",
    modules: 2,
    icon: "ClipboardCheck",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    tagClass: "bg-emerald-50 text-emerald-600",
    rating: 4.2,
    reviewCount: 89,
    enrolledCount: 5400,
    lastUpdated: "Jan 2025",
    instructor: { name: "HR Team", title: "People & Culture", initials: "HR" },
    enrolled: false,
    mandatory: true,
    description:
      "Company-wide mandatory training covering the code of conduct, workplace ethics, data privacy regulations, and professional standards expected of all employees.",
    whatYouLearn: [
      "Understand the company code of conduct",
      "Comply with data privacy regulations (GDPR, DPDP)",
      "Identify and report workplace misconduct",
      "Follow secure information handling procedures",
    ],
    requirements: ["All employees — no prerequisites"],
    curriculum: [
      {
        id: "s1",
        title: "Code of Conduct",
        lessons: [
          {
            id: "l1",
            title: "Company Values & Ethics",
            type: "video",
            duration: "12:00",
            free: true,
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l2",
            title: "Data Privacy & GDPR Basics",
            type: "video",
            duration: "10:30",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l3",
            title: "Compliance Quiz",
            type: "quiz",
            duration: "10 min",
          },
        ],
      },
      {
        id: "s2",
        title: "Workplace Standards",
        lessons: [
          {
            id: "l4",
            title: "Information Security Do's & Don'ts",
            type: "video",
            duration: "9:00",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l5",
            title: "Reporting Misconduct",
            type: "video",
            duration: "7:30",
            videoUrl: "https://www.youtube.com/embed/T9bzgXuT-ds",
          },
          {
            id: "l6",
            title: "Final Acknowledgement",
            type: "assignment",
            duration: "5 min",
          },
        ],
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getTotalLessons(course: Course): number {
  return course.curriculum.reduce((acc, s) => acc + s.lessons.length, 0);
}

export function getCompletedLessons(course: Course): number {
  return course.curriculum.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length,
    0,
  );
}
