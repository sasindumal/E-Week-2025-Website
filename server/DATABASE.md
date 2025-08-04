# Database Setup for E-Week 2025

This document describes the database setup for the E-Week 2025 application using Prisma ORM with MySQL.

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

### Core Tables

1. **Events** - Competition events with categories and scheduling
2. **Batches** - Academic batches (E21, E22, E23, etc.)
3. **Participants** - Students with contact information
4. **Teams** - Competition teams with captains
5. **Team Members** - Many-to-many relationship between teams and participants
6. **Event Registrations** - Registration tracking for events
7. **Event Results** - Competition results and scoring
8. **Leaderboard** - Dynamic rankings and scores
9. **Gallery** - Photo gallery with engagement metrics
10. **Event History** - Historical event data
11. **Admin Users** - Administrative access control
12. **System Logs** - Audit trail for system actions

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Database

Create a `.env` file in the server directory:

```env
DATABASE_URL="mysql://root:12345678@localhost:3306/eweek_2025"
NODE_ENV=development
PORT=3001
```

### 3. Start MySQL Service

```bash
# On macOS with Homebrew
brew services start mysql

# On Ubuntu/Debian
sudo systemctl start mysql

# On Windows
net start mysql
```

### 4. Create Database

```bash
mysql -u root -p12345678 -e "CREATE DATABASE IF NOT EXISTS eweek_2025;"
```

### 5. Run Database Migrations

```bash
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Seed Database

```bash
npm run seed
```

## 📊 Database Operations

### View Database Schema

```bash
npx prisma studio
```

### Reset Database

```bash
npx prisma migrate reset
npm run seed
```

### Generate New Migration

```bash
npx prisma migrate dev --name <migration_name>
```

### Deploy to Production

```bash
npx prisma migrate deploy
```

## 🔧 API Endpoints

The application provides RESTful API endpoints for all database operations:

### Events
- `GET /api/events` - Get all events with optional category filter
- `GET /api/events/:id` - Get specific event
- `POST /api/events/:eventId/complete` - Complete event with winners

### Teams & Participants
- `GET /api/events/:eventId/batches/:batch/teams` - Get teams by event and batch
- `GET /api/events/:eventId/batches` - Get all batches for an event
- `GET /api/batches/:batch/teams` - Get teams by batch

### Registration
- `POST /api/register` - Register for an event (individual or team)

### Gallery
- `GET /api/gallery` - Get gallery items with optional year filter

### Leaderboard
- `GET /api/leaderboard` - Get current leaderboard rankings

## 🧪 Testing

Run the database test script:

```bash
node test-prisma.js
```

This will verify:
- Database connection
- Event queries
- Batch queries
- Participant queries
- Team queries
- Gallery queries

## 📈 Sample Data

The seed script creates:

- **3 Batches**: E21, E22, E23
- **3 Events**: Programming Contest, Robotics Challenge, Innovation Pitch
- **10 Participants**: Students across different batches
- **5 Teams**: Various competition teams
- **7 Team Members**: Team compositions
- **4 Event Registrations**: Sample registrations
- **3 Gallery Items**: Sample photos from 2024
- **2 Event History Records**: Historical data
- **1 Admin User**: Default admin account

## 🔐 Security Considerations

1. **Password Hashing**: Admin passwords are hashed using bcrypt
2. **Input Validation**: All API endpoints validate input data
3. **SQL Injection Protection**: Prisma provides automatic protection
4. **Environment Variables**: Sensitive data stored in .env files
5. **Audit Logging**: System actions are logged for security

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused**
   ```bash
   # Check if MySQL is running
   brew services list | grep mysql
   # Start MySQL if needed
   brew services start mysql
   ```

2. **Authentication Failed**
   ```bash
   # Reset MySQL root password
   mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '12345678';"
   ```

3. **Database Not Found**
   ```bash
   # Create database
   mysql -u root -p12345678 -e "CREATE DATABASE IF NOT EXISTS eweek_2025;"
   ```

4. **Migration Errors**
   ```bash
   # Reset migrations
   npx prisma migrate reset
   npm run seed
   ```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 Contributing

When making database changes:

1. Create a new migration: `npx prisma migrate dev --name <description>`
2. Update the seed script if needed
3. Test the changes: `node test-prisma.js`
4. Update this documentation

---

**Database Version**: 1.0.0  
**Last Updated**: August 2025  
**Maintainer**: E-Week 2025 Development Team 