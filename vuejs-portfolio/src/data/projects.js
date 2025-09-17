export const projects = [
  {
    id: 1,
    title: "POS Application",
    description: "Secure Point of Sale system with comprehensive payment processing, inventory management, and real-time reporting capabilities.",
    longDescription: "Developed a complete POS system featuring secure payment processing, comprehensive inventory management, and real-time reporting. The system includes barcode scanning functionality, automated stock reordering, and multi-payment support for various business needs.",
    techStack: ["Java", "Spring Boot", "MySQL", "REST API", "JWT Authentication", "Payment Gateway Integration"],
    image: "/images/projects/ecommerce-platform.svg",
    link: "https://github.com/badhusha-dev/SmartOutlet-POS",
    demoLink: "https://smartoutlet-pos-demo.badhusha-dev.dev",
    features: [
      "Secure payment processing with multiple gateway support",
      "Barcode scanning for inventory management",
      "Automated stock reordering system",
      "Real-time sales reporting and analytics",
      "Multi-user role management",
      "Offline transaction support"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 2,
    title: "Accounting Application",
    description: "SME-focused financial management solution with comprehensive accounting modules including GL, invoicing, and expense management.",
    longDescription: "Built a comprehensive accounting application specifically designed for Small and Medium Enterprises. The system includes General Ledger management, invoicing, expense tracking, and automated financial reporting using Jasper Reports for professional document generation.",
    techStack: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "Jasper Reports", "REST API"],
    image: "/images/projects/analytics-dashboard.svg",
    link: "https://github.com/badhusha-dev/accounting-application",
    demoLink: "https://accounting-demo.badhusha-dev.dev",
    features: [
      "General Ledger management and reconciliation",
      "Automated invoicing and billing system",
      "Expense tracking and categorization",
      "Financial reporting with Jasper Reports",
      "Multi-currency support",
      "Tax calculation and compliance"
    ],
    status: "Completed",
    year: "2024"
  },
  {
    id: 3,
    title: "Shopify Inventory App",
    description: "Shopify-integrated admin panel for comprehensive inventory, product, and order management with real-time synchronization.",
    longDescription: "Developed a sophisticated admin panel integrated with Shopify for managing inventory, products, and orders. Features include user management, sales analytics, real-time updates, and automated stock workflows using Kafka for event-driven architecture.",
    techStack: ["Java", "Spring Boot", "Kafka", "Redis", "AWS S3", "Shopify API", "MySQL"],
    image: "/images/projects/api-gateway.svg",
    link: "https://github.com/badhusha-dev/shopify-inventory-app",
    demoLink: "https://shopify-demo.badhusha-dev.dev",
    features: [
      "Real-time inventory synchronization with Shopify",
      "Product management and catalog updates",
      "Order processing and fulfillment tracking",
      "Sales analytics and reporting dashboard",
      "User management and role-based access",
      "Automated stock workflows and alerts"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 4,
    title: "E-commerce Admin & User API",
    description: "Comprehensive Spring Boot backend supporting both admin and user features with multi-role API architecture.",
    longDescription: "Built a robust e-commerce backend API supporting both administrative and user functionalities. The system handles product management, order processing, inventory control, user management, and payment integration with Razorpay and Pinelabs.",
    techStack: ["Java", "Spring Boot", "JWT", "MySQL", "Razorpay", "Pinelabs", "AWS S3"],
    image: "/images/projects/task-management.svg",
    link: "https://github.com/badhusha-dev/ecommerce-api",
    demoLink: "https://ecommerce-api-demo.badhusha-dev.dev",
    features: [
      "Multi-role API architecture (Admin & User)",
      "Product catalog and inventory management",
      "Shopping cart and order processing",
      "Payment integration with multiple gateways",
      "User authentication and authorization",
      "File upload and management with AWS S3"
    ],
    status: "Completed",
    year: "2022"
  },
  {
    id: 5,
    title: "Enterprise Web Application",
    description: "Enterprise-grade web application with Spring & PrimeFaces, featuring reusable form-driven modules and real-time validation.",
    longDescription: "Developed enterprise web applications using Spring Framework and PrimeFaces, focusing on improving data entry efficiency by 25%. Built reusable form-driven modules with real-time validation, dynamic layouts, and Oracle DB integration using Spring Data JPA and Hibernate.",
    techStack: ["Java", "Spring Framework", "PrimeFaces", "Oracle DB", "Spring Data JPA", "Hibernate", "JDBC"],
    image: "/images/projects/financial-engine.svg",
    link: "https://github.com/badhusha-dev/enterprise-web-app",
    demoLink: "https://enterprise-demo.badhusha-dev.dev",
    features: [
      "Reusable form-driven modules with dynamic layouts",
      "Real-time validation and data entry optimization",
      "Oracle DB integration with Spring Data JPA",
      "Hibernate ORM for data persistence",
      "Enterprise-grade security and performance",
      "Modular architecture for scalability"
    ],
    status: "In Progress",
    year: "2024"
  },
  {
    id: 6,
    title: "Real-time Data Processing System",
    description: "High-performance data processing system using Kafka and Redis for real-time event streaming and caching.",
    longDescription: "Implemented a real-time data processing system using Apache Kafka for event streaming and Redis for caching. The system handles high-volume data processing, automated workflows, and provides real-time analytics for business intelligence.",
    techStack: ["Java", "Spring Boot", "Apache Kafka", "Redis", "MySQL", "Real-time Processing"],
    image: "/images/projects/iot-platform.svg",
    link: "https://github.com/badhusha-dev/realtime-processing",
    demoLink: "https://realtime-demo.badhusha-dev.dev",
    features: [
      "Real-time event streaming with Kafka",
      "High-performance caching with Redis",
      "Automated workflow processing",
      "Real-time analytics and monitoring",
      "Scalable message queue architecture",
      "Event-driven system design"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 7,
    title: "DevOps Monitor",
    description: "Comprehensive DevOps monitoring tool for tracking application performance, infrastructure metrics, and deployment pipelines.",
    longDescription: "Built a DevOps monitoring solution that provides real-time insights into application performance, infrastructure health, and deployment pipeline status. Features include automated alerting, performance dashboards, and integration with popular DevOps tools.",
    techStack: ["Java", "Spring Boot", "Docker", "Monitoring", "DevOps", "CI/CD"],
    image: "/images/projects/ecommerce-platform.svg",
    link: "https://github.com/badhusha-dev/DevOps-monitor",
    demoLink: "https://devops-monitor.badhusha-dev.dev",
    features: [
      "Real-time application performance monitoring",
      "Infrastructure health tracking",
      "Deployment pipeline monitoring",
      "Automated alerting system",
      "Performance dashboards",
      "Integration with DevOps tools"
    ],
    status: "Completed",
    year: "2024"
  },
  {
    id: 8,
    title: "CodeMind",
    description: "Intelligent code analysis platform providing insights into code quality, performance, and best practices.",
    longDescription: "Developed an AI-powered code analysis platform that helps developers improve code quality through intelligent analysis, performance insights, and best practice recommendations. The platform supports multiple programming languages and integrates with popular development tools.",
    techStack: ["Java", "Spring Boot", "AI/ML", "Code Analysis", "Performance Optimization"],
    image: "/images/projects/analytics-dashboard.svg",
    link: "https://github.com/badhusha-dev/CodeMind",
    demoLink: "https://codemind.badhusha-dev.dev",
    features: [
      "AI-powered code analysis",
      "Performance optimization suggestions",
      "Code quality metrics",
      "Best practice recommendations",
      "Multi-language support",
      "IDE integration capabilities"
    ],
    status: "In Progress",
    year: "2024"
  },
  {
    id: 9,
    title: "FoodFriend",
    description: "Social food discovery platform connecting food enthusiasts and helping them discover new restaurants and dishes.",
    longDescription: "Built a comprehensive food discovery platform using TypeScript that allows users to discover restaurants, share food experiences, and connect with fellow food enthusiasts. Features include location-based recommendations, social features, and restaurant reviews.",
    techStack: ["TypeScript", "React", "Node.js", "MongoDB", "Location Services", "Social Features"],
    image: "/images/projects/api-gateway.svg",
    link: "https://github.com/badhusha-dev/FoodFriend",
    demoLink: "https://foodfriend.badhusha-dev.dev",
    features: [
      "Location-based restaurant discovery",
      "Social food sharing and reviews",
      "User-generated content",
      "Restaurant recommendation engine",
      "Real-time updates and notifications",
      "Mobile-responsive design"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 10,
    title: "MergeEats",
    description: "Food delivery aggregation platform that merges multiple delivery services into a single, user-friendly interface.",
    longDescription: "Developed a Java-based food delivery aggregation platform that integrates multiple delivery services, providing users with a unified interface to compare prices, delivery times, and restaurant options across different platforms.",
    techStack: ["Java", "Spring Boot", "API Integration", "Microservices", "Payment Processing"],
    image: "/images/projects/task-management.svg",
    link: "https://github.com/badhusha-dev/MergeEats",
    demoLink: "https://mergeeats.badhusha-dev.dev",
    features: [
      "Multi-platform delivery service integration",
      "Price comparison across services",
      "Unified order management",
      "Real-time delivery tracking",
      "Payment gateway integration",
      "User preference management"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 11,
    title: "Pick Food Spot",
    description: "Intelligent food spot recommendation system that helps users discover the perfect dining experience based on preferences.",
    longDescription: "Created a smart recommendation system that analyzes user preferences, location, time, and other factors to suggest the perfect food spots. The system uses machine learning algorithms to provide personalized recommendations.",
    techStack: ["Java", "Spring Boot", "Machine Learning", "Recommendation Engine", "Location Services"],
    image: "/images/projects/financial-engine.svg",
    link: "https://github.com/badhusha-dev/pick-food-spot",
    demoLink: "https://pickfoodspot.badhusha-dev.dev",
    features: [
      "AI-powered recommendation engine",
      "Personalized food spot suggestions",
      "Location-based recommendations",
      "User preference learning",
      "Real-time availability checking",
      "Social sharing capabilities"
    ],
    status: "Completed",
    year: "2023"
  }
]