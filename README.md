# EgoApp

> AI-powered journalism style editor for Spanish-language media

EgoApp is a web application designed to analyze journalistic texts and suggest style improvements based on authoritative journalism literature. The tool helps journalists improve their writing style using AI-powered analysis and established editorial guidelines.

## 🎯 Overview

EgoApp provides real-time analysis of journalistic texts, offering specific, actionable suggestions based on:

- **Manual de estilo de El País** - Comprehensive Spanish journalism style guide
- **AP Stylebook** - International journalism standards
- **Fundéu** - Spanish language foundation recommendations
- **García Márquez principles** - Narrative journalism techniques
- **Leñero and Marín manual** - Structural journalism guidelines

## ✨ Key Features

- **Real-time Text Analysis** - Live highlighting and suggestions as you write
- **Contextual Suggestions** - Categorized improvements with authoritative citations
- **Readability Metrics** - Journalism-specific scoring and analytics
- **Text Type Support** - Optimized for news articles, reports, chronicles, and opinion pieces
- **Export Options** - Multiple format support for final documents

## 🏗️ Architecture

This project uses a monorepo structure with the following packages:

```
egoApp/
├── packages/
│   ├── frontend/     # React + TypeScript + Monaco Editor
│   ├── backend/      # Node.js + Express.js + Claude SDK
│   └── shared/       # Common types and utilities
├── docs/            # Project documentation
├── research/        # Style rules and reference materials
└── data/           # Database files and migrations
```

## 🚀 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Monaco Editor** (VS Code editor component)
- **Tailwind CSS** + **shadcn/ui** components
- **Zustand** for state management
- **Vite** for build tooling

### Backend

- **Node.js** with **Express.js** framework
- **PostgreSQL** for user data and analytics
- **SQLite** for style rules database
- **Claude SDK** for AI-powered analysis
- **Redis** for caching (production)

### Development

- **Turbo** monorepo management
- **TypeScript** throughout the stack
- **ESLint** + **Prettier** for code quality
- **Husky** + **Commitlint** for git hooks
- **Jest** + **Vitest** for testing

## 📋 Development Status

**Current Phase**: Technical Architecture Setup 🔄
**Progress**: ~60% through Phase 2
**Next Priority**: Environment setup and Express implementation

See [MVP Task Manager](docs/mvp_task_manager.md) for detailed development roadmap.

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 20+
- Yarn 1.22+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/egoapp.git
cd egoapp

# Install dependencies
yarn install

# Setup pre-commit hooks (when available)
yarn prepare
```

### Development

```bash
# Start all development servers
yarn dev

# Build all packages
yarn build

# Run tests
yarn test

# Lint and format code
yarn lint
yarn format

# Run quality checks
yarn quality

# Fix quality issues
yarn quality:fix
```

### Current Development Status

- ✅ **Infrastructure**: Monorepo, TypeScript, linting, CI/CD complete
- 🔄 **Backend**: Express.js server setup in progress
- 🔄 **Frontend**: React + Monaco Editor setup pending
- 🔄 **Database**: PostgreSQL + SQLite integration pending
- ⏳ **AI Integration**: Claude SDK service implementation pending

## 📊 Implementation Progress

### ✅ Completed Infrastructure

- **Monorepo Setup** - Turborepo with TypeScript configuration
- **Development Environment** - ESLint, Prettier, and formatting
- **CI/CD Pipeline** - GitHub Actions with lint, test, and build
- **Package Structure** - Backend, frontend, and shared packages
- **Style Guidelines** - Comprehensive development standards
- **Claude SDK Integration** - AI analysis dependency ready

### 🚧 In Progress: Core Implementation

### Style Rules (Target: 20 rules)

1. **Paragraph Length** - Max 4 sentences for news articles
2. **Sentence Complexity** - Max 25 words per sentence
3. **Passive Voice Detection** - Limit to <10% of text
4. **Lead Effectiveness** - 5W1H validation for opening paragraphs
5. **Attribution Clarity** - Source identification standards
6. **Redundancy Detection** - Eliminate wordiness and repetition
7. **Inverted Pyramid** - Information hierarchy validation
8. **Transition Quality** - Paragraph connectivity analysis

_And 12 additional journalism-specific rules..._

### Text Analysis Pipeline

1. **Text Normalization** - Clean and prepare input
2. **Segmentation** - Identify sentences and paragraphs
3. **Basic NLP** - Part-of-speech tagging and parsing
4. **Rule Application** - Apply journalism-specific rules
5. **AI Analysis** - Claude-powered style suggestions
6. **Result Merging** - Combine and rank suggestions
7. **Confidence Scoring** - Reliability assessment

## 🎨 UI Components

- **Monaco Editor** - Professional text editing experience
- **Suggestions Panel** - Categorized improvement recommendations
- **Metrics Dashboard** - Readability and style analytics
- **Export Interface** - Multiple format download options

## 📖 Documentation

- [MVP Development Plan](docs/mvp_plan_egoApp_v2.md) - Detailed implementation guide
- [Task Manager](docs/mvp_task_manager.md) - Development roadmap and progress tracking
- [Style Rules Reference](research/) - Journalism guidelines and sources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting
- `refactor:` - Code restructuring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **El País** - Manual de estilo reference
- **AP Stylebook** - International journalism standards
- **Fundéu** - Spanish language guidance
- **Gabriel García Márquez** - Journalism excellence principles
- **Vicente Leñero & Carlos Marín** - Structural journalism insights

---

**Status**: 🚧 In Development | **Phase**: Technical Foundation (Phase 2)
**Timeline**: 8-10 week MVP | **Team**: 1 Full-stack Developer
**Last Updated**: September 2024
