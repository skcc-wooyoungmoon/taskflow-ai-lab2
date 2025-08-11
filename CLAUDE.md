# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaskFlow is a team-based task management web application built with a full-stack TypeScript architecture. The project follows a microservices pattern with separate backend and frontend applications designed for local network deployment.

**Key Features:**
- Task CRUD operations with priority levels (HIGH, MEDIUM, LOW) and status tracking (PENDING, IN_PROGRESS, COMPLETED)
- Real-time synchronization capabilities via WebSocket
- Responsive web design for multi-device support
- Team collaboration features with role-based permissions
- Local network deployment without cloud dependencies

## Architecture

### Backend Structure (`backend/`)
```
src/
├── server.ts              # Express server entry point
├── types/task.ts          # TypeScript type definitions
├── routes/tasks.ts        # Task API routes
├── controllers/taskController.ts  # Request handlers
├── services/taskService.ts       # Business logic layer
├── middleware/errorHandler.ts    # Error handling middleware
└── utils/validation.ts           # Input validation utilities
prisma/
└── schema.prisma         # Database schema with SQLite
```

**Key Architectural Patterns:**
- Layered architecture: Routes → Controllers → Services → Database
- Prisma ORM with SQLite for data persistence
- TypeScript with strict mode for type safety
- RESTful API design with proper HTTP status codes

### Frontend Structure (`frontend/`)
- React 18+ with TypeScript
- Tailwind CSS for styling
- Component-based architecture following atomic design principles
- Custom hooks for state management (useTasks)
- Responsive design with mobile-first approach

## Development Commands

### Backend Development
```bash
cd backend

# Development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production server
npm run start

# Database operations
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run database migrations
npm run prisma:studio      # Open Prisma Studio GUI

# Testing
npm run test              # Run Jest tests
```

### Frontend Development
```bash
cd frontend

# Development server (if React project exists)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Database Schema

The application uses SQLite with Prisma ORM. The main entity is the `Task` model:

```prisma
model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  priority    Priority @default(MEDIUM)  // HIGH, MEDIUM, LOW
  status      Status   @default(PENDING) // PENDING, IN_PROGRESS, COMPLETED
  dueDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Endpoints

**Base URL:** `http://localhost:3001/api`

- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Retrieve specific task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update existing task
- `DELETE /tasks/:id` - Delete task

## Development Setup

1. **Environment Configuration:**
   ```bash
   # Create backend/.env
   PORT=3001
   NODE_ENV=development
   DATABASE_URL="file:./dev.db"
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d
   ```

2. **Initial Setup:**
   ```bash
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run dev
   ```

## Key Technical Constraints

- **Local Network Deployment:** No cloud services, operates within local WiFi/Ethernet
- **Real-time Requirements:** WebSocket implementation for 5-second data synchronization
- **Browser Compatibility:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Performance Targets:** 3-second initial load, 1-second response time
- **Concurrent Users:** Support for minimum 20 simultaneous users

## Testing Strategy

- **Backend:** Jest with Supertest for API endpoint testing
- **Frontend:** React Testing Library for component testing
- **Test Coverage:** Target 80% code coverage minimum
- **Database:** Use in-memory SQLite for test isolation

## Common Development Workflows

1. **Adding New Features:**
   - Start with API design in routes/controllers
   - Implement business logic in services layer
   - Add database schema changes via Prisma migrations
   - Create frontend components following existing patterns

2. **Database Changes:**
   - Modify `prisma/schema.prisma`
   - Run `npm run prisma:migrate`
   - Update TypeScript types in `src/types/`

3. **API Testing:**
   - Use Prisma Studio for database inspection
   - Test endpoints via REST client or browser
   - Check error handling middleware responses