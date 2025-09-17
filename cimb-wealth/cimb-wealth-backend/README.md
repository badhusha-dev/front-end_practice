# CIMB Wealth Backend

A production-ready backend for the CIMB Wealth Financial App built with Java Spring Boot, GraphQL, and PostgreSQL.

## 🚀 Features

- **GraphQL API** with comprehensive queries and mutations
- **JWT Authentication** with role-based authorization (CUSTOMER, ADVISOR, ADMIN)
- **PostgreSQL Database** with Flyway migrations
- **AOP Logging** and security auditing
- **Docker Support** for easy deployment
- **Comprehensive Testing** with JUnit and Mockito
- **Health Checks** and monitoring endpoints

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **Spring Security**
- **Spring GraphQL**
- **PostgreSQL 15**
- **Flyway**
- **JWT (jjwt)**
- **Lombok**
- **MapStruct**
- **Docker & Docker Compose**

## 📁 Project Structure

```
src/main/java/com/cimb/wealth/
├── config/                 # Configuration classes
├── domain/                 # JPA entities
├── repository/             # Data repositories
├── service/                # Business logic services
├── graphql/                # GraphQL resolvers and schema
├── security/               # Security configuration
├── dto/                    # Data Transfer Objects
├── aop/                    # Aspect-Oriented Programming
└── CimbWealthApplication.java
```

## 🚀 Quick Start

### Prerequisites

- Java 17+
- Maven 3.6+
- Docker & Docker Compose
- PostgreSQL 15+ (optional, Docker will provide)

### Using Docker Compose (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd cimb-wealth-backend
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Check service health:**
   ```bash
   docker-compose ps
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

### Manual Setup

1. **Start PostgreSQL:**
   ```bash
   docker run -d --name postgres \
     -e POSTGRES_DB=cimb_wealth \
     -e POSTGRES_USER=cimb_user \
     -e POSTGRES_PASSWORD=cimb_password \
     -p 5432:5432 postgres:15-alpine
   ```

2. **Run Flyway migrations:**
   ```bash
   ./mvnw flyway:migrate
   ```

3. **Start the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

## 🔗 API Endpoints

### GraphQL Playground
- **Development:** http://localhost:8080/graphiql
- **Playground:** http://localhost:8080/playground

### Health & Monitoring
- **Health Check:** http://localhost:8080/actuator/health
- **Metrics:** http://localhost:8080/actuator/metrics
- **Info:** http://localhost:8080/actuator/info

### Database Admin
- **PgAdmin:** http://localhost:8081
  - Email: admin@cimb.com
  - Password: admin123

## 📊 GraphQL Schema

### Key Types

- **User** - Customer, Advisor, Admin users
- **Account** - Savings, Investment, Retirement accounts
- **Holding** - Stock, Bond, ETF holdings
- **Transaction** - Buy, Sell, Dividend transactions
- **Goal** - Financial goals and progress
- **PortfolioSummary** - Aggregated portfolio data

### Sample Queries

#### Login
```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    refreshToken
    user {
      id
      email
      firstName
      lastName
      role
    }
  }
}
```

Variables:
```json
{
  "input": {
    "email": "john.doe@cimb.com",
    "password": "password123"
  }
}
```

#### Get Portfolio Summary
```graphql
query GetPortfolio($userId: ID!) {
  portfolio(userId: $userId) {
    totalValue
    totalGainLoss
    totalGainLossPercentage
    assetAllocation {
      assetType
      value
      percentage
    }
    sectorAllocation {
      sector
      value
      percentage
    }
    topHoldings {
      ticker
      assetName
      marketValue
      unrealizedGainLossPercentage
    }
  }
}
```

#### Get User Accounts
```graphql
query GetAccounts($userId: ID!) {
  accountsByUser(userId: $userId) {
    edges {
      node {
        id
        accountNumber
        accountName
        accountType
        balance
        holdings {
          ticker
          assetName
          quantity
          currentPrice
          marketValue
        }
      }
    }
  }
}
```

#### Get Transactions
```graphql
query GetTransactions($accountId: ID!) {
  transactions(accountId: $accountId, first: 10) {
    edges {
      node {
        transactionId
        transactionType
        ticker
        quantity
        price
        totalAmount
        status
        createdAt
      }
    }
  }
}
```

#### Get Goals
```graphql
query GetGoals($userId: ID!) {
  goals(userId: $userId) {
    edges {
      node {
        id
        title
        goalType
        priority
        targetAmount
        currentAmount
        progressPercentage
        targetDate
        status
      }
    }
  }
}
```

### Sample Mutations

#### Create Transaction
```graphql
mutation CreateTransaction($accountId: ID!, $input: TransactionInput!) {
  createTransaction(accountId: $accountId, input: $input) {
    id
    transactionId
    transactionType
    ticker
    quantity
    price
    totalAmount
    status
  }
}
```

Variables:
```json
{
  "accountId": "1",
  "input": {
    "transactionType": "BUY",
    "ticker": "CIMB",
    "assetName": "CIMB Group Holdings Berhad",
    "quantity": 100,
    "price": 5.20,
    "fees": 5.20,
    "description": "Purchase CIMB shares"
  }
}
```

#### Update Goal
```graphql
mutation UpdateGoal($id: ID!, $input: GoalUpdateInput!) {
  updateGoal(id: $id, input: $input) {
    id
    title
    currentAmount
    progressPercentage
    status
  }
}
```

## 🔐 Authentication

### JWT Token Usage

Include the JWT token in the Authorization header:

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"query": "query { me { id email firstName } }"}'
```

### Roles and Permissions

- **CUSTOMER**: Can access own data only
- **ADVISOR**: Can access assigned customers' data
- **ADMIN**: Full access to all data

## 🧪 Testing

### Run Tests
```bash
# Unit tests
./mvnw test

# Integration tests
./mvnw test -Dtest=*IntegrationTest

# All tests with coverage
./mvnw test jacoco:report
```

### Test Data

The application includes seed data with:
- 4 sample users (2 customers, 1 advisor, 1 admin)
- 6 accounts across different types
- 36 holdings with various asset types
- 35 transactions with different types
- 11 financial goals

## 📈 Monitoring

### Health Checks
- **Liveness:** `/actuator/health/liveness`
- **Readiness:** `/actuator/health/readiness`
- **Database:** `/actuator/health/db`

### Metrics
- **JVM Metrics:** `/actuator/metrics/jvm.*`
- **HTTP Metrics:** `/actuator/metrics/http.server.requests`
- **Database Metrics:** `/actuator/metrics/hikaricp.*`

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=jdbc:postgresql://localhost:5432/cimb_wealth
DATABASE_USERNAME=cimb_user
DATABASE_PASSWORD=cimb_password

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Profiles
SPRING_PROFILES_ACTIVE=dev
```

### Application Profiles

- **dev**: Development with GraphiQL enabled
- **prod**: Production with security hardening

## 🚀 Deployment

### Docker Production Build
```bash
# Build production image
docker build -t cimb-wealth-backend:latest .

# Run with production config
docker run -d \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL=jdbc:postgresql://your-db:5432/cimb_wealth \
  -e JWT_SECRET=your-production-secret \
  -p 8080:8080 \
  cimb-wealth-backend:latest
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cimb-wealth-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cimb-wealth-backend
  template:
    metadata:
      labels:
        app: cimb-wealth-backend
    spec:
      containers:
      - name: app
        image: cimb-wealth-backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
```

## 📝 API Documentation

### GraphQL Schema
The complete GraphQL schema is available at `/graphql/schema.json` when the application is running.

### Sample Data
The application includes comprehensive seed data for development and testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for CIMB Wealth Management**
