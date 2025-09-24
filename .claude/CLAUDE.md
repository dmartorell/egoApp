# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EgoApp is a web application designed to analyze journalistic texts and suggest style improvements based on authoritative journalism literature. The project aims to help journalists improve their writing style using AI-powered analysis and established editorial guidelines.

## Project Structure

This is a **Turborepo monorepo** with three main packages:

- **@egoapp/backend** - Fastify API server
- **@egoapp/frontend** - React + Vite application
- **@egoapp/shared** - Shared types and utilities

> Use the `/prime` command to see the current project structure and files.

## Development Status

> See `docs/mvp_task_manager.md` for current development phases, tasks, and progress tracking.

## Technology Stack & Architecture

### Core Architecture Decisions

- **Monorepo**: Turborepo + Yarn workspaces for unified development
- **Type Safety**: TypeScript across all packages with shared types
- **Frontend**: React 18 + Vite for modern development experience
- **Backend**: Fastify for high-performance API server
- **AI Integration**: Anthropic Claude SDK for text analysis
- **Database Strategy**: PostgreSQL for user data + SQLite for journalism rules
- **Testing**: Package-specific testing (Jest for backend, Vitest for frontend)

### Package Structure

- **Backend**: API server, AI integration, business logic
- **Frontend**: User interface, Monaco editor, real-time analysis
- **Shared**: Types, interfaces, and shared utilities

### Infrastructure Strategy

- **Deployment**: Serverless-first (Vercel for frontend, Railway/Render for backend)
- **Monitoring**: Sentry for error tracking and performance
- **Caching**: Aggressive AI response caching to manage costs

## Development Workflow

### Available Scripts

**Root level commands:**

```bash
yarn dev          # Start all packages in development mode
yarn build        # Build all packages
yarn lint         # Lint all packages
yarn lint:fix     # Fix linting issues
yarn type-check   # Run TypeScript checks
yarn test         # Run all tests
yarn clean        # Clean build artifacts
yarn format       # Format code with Prettier
yarn quality      # Run all quality checks (lint + type-check + format)
yarn quality:fix  # Fix all quality issues
```

**Package-specific commands:**

```bash
# Backend development
cd packages/backend
yarn dev          # Start backend with hot reload
yarn build        # Build backend
yarn start        # Start production build

# Frontend development
cd packages/frontend
yarn dev          # Start frontend dev server
yarn build        # Build frontend for production
yarn preview      # Preview production build

# Shared package
cd packages/shared
yarn dev          # Watch and build shared types
yarn build        # Build shared package
```

### Development Setup

1. **Install dependencies**: `yarn install`
2. **Start development**: `yarn dev` (starts all packages)
3. **Run quality checks**: `yarn quality`
4. **Run tests**: `yarn test`

### Package Dependencies

- **Backend** depends on **Shared** for types
- **Frontend** will depend on **Shared** for types
- All packages use shared ESLint and TypeScript configurations

## Core Product Features

**Primary Goal**: Analyze journalistic texts and suggest style improvements using AI and established journalism guidelines.

**Key Features**:

- Real-time text analysis with Monaco editor integration
- Categorized suggestions based on journalism best practices
- Authoritative citations from established style guides
- Support for different text types (news, reports, chronicles)
- Performance metrics and readability scoring

> Detailed feature specifications and current implementation status are in `docs/mvp_task_manager.md`

## Key References

The project bases its style analysis on:

- Manual de estilo de El País
- AP Stylebook
- Fundéu (Fundación del Español Urgente)
- García Márquez's journalism principles
- Vicente Leñero and Carlos Marín's journalism manual

## Development Guidelines

### Implementation Priorities

1. **Journalism Focus**: Prioritize the 20 core style rules defined in the research phase
2. **Text Type Awareness**: Maintain separate analysis paths for different text types (news, reports, chronicles)
3. **Authoritative Sources**: Ensure suggestions include citations from established journalism guides
4. **Performance**: Cache AI responses aggressively to manage API costs
5. **Type Safety**: Use shared types from `@egoapp/shared` across frontend and backend

### Monorepo Guidelines

1. **Package Organization**: Keep functionality in appropriate packages (UI in frontend, API in backend, types in shared)
2. **Dependency Management**: Only add dependencies where needed (avoid bloating shared package)
3. **Build Order**: Backend and frontend depend on shared package being built first
4. **Testing**: Write tests at the package level, integration tests at the root level
5. **Documentation**: Update package.json descriptions and maintain README files for each package

## Code Style Guidelines

This project follows comprehensive code style guidelines organized in separate files for reusability:

### Style Guide References

- **[General Principles](./.claude/styles/general.md)** - Core coding principles and organization
- **[TypeScript Rules](./.claude/styles/typescript.md)** - TypeScript-specific guidelines and best practices
- **[React/Frontend](./.claude/styles/react.md)** - Component patterns, hooks, and JSX guidelines
- **[Node.js/Backend](./.claude/styles/nodejs.md)** - Server-side patterns and API design
- **[Naming Conventions](./.claude/styles/naming.md)** - Variable, function, component, and file naming
- **[Performance Guidelines](./.claude/styles/performance.md)** - Optimization strategies for frontend and backend
- **[Testing Approach](./.claude/styles/testing.md)** - Testing philosophy and best practices
- **[Git Guidelines](./.claude/styles/git.md)** - Version control best practices and commit standards

**Note:** All detailed style rules are in the referenced files above. This keeps the main CLAUDE.md focused on project-specific guidance while maintaining reusable, modular style guidelines.

## API Structure

The backend package (`@egoapp/backend`) will expose the following REST API endpoints:

### Core Analysis Endpoints

- `POST /api/analyze` - Analyze journalistic text and return suggestions
- `GET /api/rules` - Get available style rules and categories
- `POST /api/suggestions` - Generate AI-powered suggestions for text improvement

### Health and Monitoring

- `GET /health` - Health check endpoint
- `GET /api/metrics` - API usage metrics

### Type Definitions

All API request/response types are defined in the `@egoapp/shared` package and shared between frontend and backend for type safety.

## Performance Targets

- Analyze 5,000-word text in <5 seconds
- <3% false positive rate for basic detections
- Support real-time analysis with debouncing

## Claude Behavior Rules

**CRITICAL: Claude must NEVER perform git operations without explicit user permission.**

### Git Operation Policy

- NEVER use `git add`, `git commit`, `git push`, or any modifying git commands without explicit user request
- ALWAYS ask before any git operation: "Should I commit these changes?" or "Should I push to the repository?"
- Show changes first using `git status` and `git diff` before any commits
- Only informational git commands are allowed: `git status`, `git log`, `git diff`, `git branch` (for listing only)

### Code Modification Policy

- Feel free to create, modify, and edit code files as requested
- Always ask before committing any changes to git
- Follow the [Git Guidelines](./.claude/styles/git.md) when suggesting commit messages
