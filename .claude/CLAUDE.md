# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EgoApp is a web application designed to analyze journalistic texts and suggest style improvements based on authoritative journalism literature. The project aims to help journalists improve their writing style using AI-powered analysis and established editorial guidelines.

## Project Structure

```
egoApp/
├── assets/                 # Static resources and reference materials
│   └── manual-de-estilo-de-el-pais.pdf
├── logs/                   # Application logs
├── mvp_plan_egoApp.md     # Detailed MVP development plan
└── mvp_plan_egoApp_v2.md  # Updated MVP plan with examples
```

## Development Phases

The project follows a structured 8-10 week MVP development plan:

1. **Phase 1 (Weeks 1-3)**: Research and Knowledge Base
   - Extract ~20 high-impact style rules from authoritative sources
   - Create SQLite database with rules, examples, and justifications

2. **Phase 2 (Week 4)**: Technical Architecture Setup
   - Frontend: React 18 + TypeScript + Monaco Editor + Tailwind CSS + shadcn/ui
   - Backend: Node.js with Express/Fastify
   - Database: PostgreSQL for production, SQLite for rules
   - AI/NLP: Claude SDK, natural.js, compromise.js

3. **Phase 3 (Weeks 5-8)**: Core MVP Development
   - API endpoints for text analysis
   - Integration with AI for style suggestions
   - Real-time highlighting editor interface

4. **Phase 4 (Weeks 9-10)**: Testing and Optimization

## Technology Stack

### Frontend

- React 18 with TypeScript
- Monaco Editor (VS Code editor)
- Tailwind CSS + shadcn/ui
- Zustand for state management

### Backend

- Node.js with Express or Fastify
- PostgreSQL (production) + Redis (cache)
- Claude SDK for AI analysis
- natural.js and compromise.js for NLP

### Infrastructure

- Frontend: Vercel
- Backend: Railway, Render, or Heroku
- Monitoring: Sentry

## Core Features

1. **Text Editor** with real-time highlighting
2. **Suggestions Panel** categorized by type
3. **Contextual Explanations** with authoritative citations
4. **Readability Metrics** specific to journalism
5. **Text Type Support**: News articles, reports, chronicles

## Style Rules Focus

The MVP implements at least 20 journalism-specific rules including:

- Paragraph length (>4 sentences flagged)
- Sentence complexity (>25 words)
- Passive voice usage
- Lead effectiveness
- Inverted pyramid structure (for news)
- Transition quality between paragraphs

## Key References

The project bases its style analysis on:

- Manual de estilo de El País
- AP Stylebook
- Fundéu (Fundación del Español Urgente)
- García Márquez's journalism principles
- Vicente Leñero and Carlos Marín's journalism manual

## Development Guidelines

When implementing features:

1. Prioritize the 20 core style rules defined in the research phase
2. Focus on journalism-specific writing patterns
3. Ensure suggestions include authoritative citations
4. Maintain separate analysis paths for different text types (news, reports, chronicles)
5. Cache AI responses aggressively to manage API costs

## Code Style Guidelines

- Use named exports with arrow functions: `export const functionName = () => {}` instead of `export default functionName`
- Never use TypeScript non-null assertion operator (`!`)
- Always use TypeScript for all JavaScript code

## API Structure

Core endpoints to implement:

- `POST /api/analyze` - Analyze text
- `GET /api/rules` - Get available rules
- `POST /api/suggestions` - Generate suggestions

## Performance Targets

- Analyze 5,000-word text in <5 seconds
- <3% false positive rate for basic detections
- Support real-time analysis with debouncing
