export const projects = [
  {
    id: 1,
    title: "E-Commerce Microservices Platform",
    description: "A comprehensive e-commerce platform built with microservices architecture, handling high traffic and providing seamless shopping experience.",
    longDescription: "This project involved designing and implementing a complete e-commerce solution using microservices architecture. The platform handles user management, product catalog, order processing, payment integration, and inventory management. Built with Spring Boot, Spring Cloud, and deployed on AWS with Docker containers.",
    techStack: ["Java 11", "Spring Boot", "Spring Cloud", "PostgreSQL", "Redis", "Docker", "AWS", "Kubernetes"],
    image: "/images/projects/ecommerce-platform.jpg",
    link: "https://github.com/shahulhameed/ecommerce-platform",
    demoLink: "https://ecommerce-demo.shahulhameed.dev",
    features: [
      "Microservices architecture with service discovery",
      "JWT-based authentication and authorization",
      "Real-time order tracking and notifications",
      "Payment gateway integration",
      "Scalable database design with caching",
      "CI/CD pipeline with automated testing"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 2,
    title: "Real-time Analytics Dashboard",
    description: "A real-time analytics dashboard for monitoring application performance and user behavior with interactive visualizations.",
    longDescription: "Developed a comprehensive analytics platform that processes real-time data streams and provides interactive dashboards for business intelligence. The system handles millions of events per day and provides insights through customizable charts and reports.",
    techStack: ["Java 11", "Spring Boot", "Apache Kafka", "Elasticsearch", "React", "WebSocket", "Docker"],
    image: "/images/projects/analytics-dashboard.jpg",
    link: "https://github.com/shahulhameed/analytics-dashboard",
    demoLink: "https://analytics-demo.shahulhameed.dev",
    features: [
      "Real-time data processing with Kafka",
      "Interactive dashboard with React frontend",
      "Elasticsearch for fast data retrieval",
      "WebSocket for live updates",
      "Customizable charts and reports",
      "Role-based access control"
    ],
    status: "Completed",
    year: "2022"
  },
  {
    id: 3,
    title: "API Gateway & Rate Limiting Service",
    description: "A robust API gateway with rate limiting, authentication, and monitoring capabilities for microservices architecture.",
    longDescription: "Built a comprehensive API gateway solution that provides centralized authentication, rate limiting, request routing, and monitoring for microservices. The gateway handles millions of requests per day and ensures system stability through intelligent rate limiting and circuit breaker patterns.",
    techStack: ["Java 11", "Spring Cloud Gateway", "Redis", "Prometheus", "Grafana", "Docker", "Kubernetes"],
    image: "/images/projects/api-gateway.jpg",
    link: "https://github.com/shahulhameed/api-gateway",
    demoLink: "https://api-gateway-demo.shahulhameed.dev",
    features: [
      "Centralized authentication and authorization",
      "Intelligent rate limiting algorithms",
      "Request routing and load balancing",
      "Real-time monitoring and metrics",
      "Circuit breaker pattern implementation",
      "High availability and fault tolerance"
    ],
    status: "Completed",
    year: "2023"
  },
  {
    id: 4,
    title: "Cloud-Native Task Management System",
    description: "A scalable task management system built for cloud deployment with real-time collaboration features.",
    longDescription: "Developed a modern task management application with real-time collaboration, file sharing, and project tracking capabilities. The system is designed for cloud-native deployment with auto-scaling and high availability.",
    techStack: ["Java 11", "Spring Boot", "WebSocket", "PostgreSQL", "AWS S3", "Docker", "AWS ECS"],
    image: "/images/projects/task-management.jpg",
    link: "https://github.com/shahulhameed/task-management",
    demoLink: "https://tasks-demo.shahulhameed.dev",
    features: [
      "Real-time collaboration with WebSocket",
      "File upload and sharing with AWS S3",
      "Project tracking and reporting",
      "Mobile-responsive design",
      "Cloud-native deployment",
      "Automated backup and recovery"
    ],
    status: "In Progress",
    year: "2024"
  },
  {
    id: 5,
    title: "Financial Data Processing Engine",
    description: "High-performance financial data processing engine for real-time market analysis and reporting.",
    longDescription: "Built a high-performance data processing engine that handles financial market data in real-time. The system processes millions of transactions per second and provides analytical insights for trading decisions.",
    techStack: ["Java 11", "Spring Boot", "Apache Kafka", "Apache Spark", "MongoDB", "Redis", "Docker"],
    image: "/images/projects/financial-engine.jpg",
    link: "https://github.com/shahulhameed/financial-engine",
    demoLink: "https://financial-demo.shahulhameed.dev",
    features: [
      "Real-time data processing pipeline",
      "High-throughput message processing",
      "Distributed computing with Spark",
      "Time-series data analysis",
      "Risk calculation algorithms",
      "Regulatory compliance reporting"
    ],
    status: "Completed",
    year: "2022"
  },
  {
    id: 6,
    title: "IoT Data Collection Platform",
    description: "A scalable platform for collecting, processing, and analyzing IoT sensor data from multiple devices.",
    longDescription: "Developed an IoT data collection platform that handles sensor data from thousands of devices. The system provides real-time monitoring, data visualization, and alerting capabilities for industrial IoT applications.",
    techStack: ["Java 11", "Spring Boot", "MQTT", "InfluxDB", "Grafana", "Docker", "Kubernetes"],
    image: "/images/projects/iot-platform.jpg",
    link: "https://github.com/shahulhameed/iot-platform",
    demoLink: "https://iot-demo.shahulhameed.dev",
    features: [
      "MQTT-based device communication",
      "Time-series database for sensor data",
      "Real-time data visualization",
      "Alert and notification system",
      "Device management and monitoring",
      "Scalable data processing pipeline"
    ],
    status: "Completed",
    year: "2021"
  }
]
