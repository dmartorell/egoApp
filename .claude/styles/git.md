# Git and Version Control Guidelines

## Commit Best Practices
- Write clear, descriptive commit messages
- Use conventional commit format: `type(scope): description`
- Keep commits atomic (one logical change per commit)
- Commit frequently with meaningful chunks
- Don't commit generated files or build artifacts

## Branch Strategy
- Use descriptive branch names: `feature/user-authentication`, `fix/login-bug`
- Keep branches focused on single features or fixes
- Delete merged branches to keep repository clean
- Use pull requests for code review

## Git Workflow
- Pull latest changes before starting work
- Push feature branches for collaboration
- Use `git rebase` to keep clean history when appropriate
- Tag releases with semantic versioning

## What to Commit
- Source code and configuration files
- Documentation and README files
- Package.json and lock files
- Essential scripts and tooling config

## What NOT to Commit
- `node_modules/` and dependency directories
- Build outputs (`dist/`, `build/`)
- Environment files with secrets (`.env`)
- IDE-specific files
- OS-generated files (`.DS_Store`, `Thumbs.db`)
- Log files and temporary files