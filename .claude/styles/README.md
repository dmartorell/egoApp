# Reusable Code Style Guidelines

This directory contains modular code style guidelines that can be reused across projects.

## Files Overview

| File | Purpose | Use When |
|------|---------|----------|
| `general.md` | Core coding principles | All projects |
| `typescript.md` | TypeScript-specific rules | TypeScript projects |
| `react.md` | React/Frontend guidelines | React/Frontend projects |
| `nodejs.md` | Backend/API patterns | Node.js backend projects |
| `naming.md` | Naming conventions | All projects |
| `performance.md` | Performance optimization | All projects |
| `testing.md` | Testing best practices | All projects with tests |

## How to Reuse in Other Projects

### Option 1: Copy the entire `.claude/styles/` directory
```bash
# In your new project
cp -r /path/to/egoApp/.claude/styles/ .claude/styles/
```

### Option 2: Symlink for shared guidelines
```bash
# Create a shared styles repository
mkdir ~/dev/shared-claude-styles
cp -r .claude/styles/* ~/dev/shared-claude-styles/

# In new projects, create symlinks
ln -s ~/dev/shared-claude-styles .claude/styles
```

### Option 3: Git submodule (advanced)
```bash
# In your styles repository
git submodule add <your-styles-repo-url> .claude/styles
```

## Customization

1. **Copy the files you need** - Not every project needs every file
2. **Modify for your stack** - Adjust rules based on your technology choices
3. **Add project-specific rules** - Extend with domain-specific guidelines
4. **Update references** - Ensure your CLAUDE.md points to the correct files

## Example CLAUDE.md Integration

```markdown
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

### Quick Reference
- Use named exports with arrow functions: `export const functionName = () => {}`
- Never use TypeScript non-null assertion operator (`!`)
- Always use TypeScript for all JavaScript code
- Prefer `interface` over `type` for object shapes
- Use `camelCase` for variables, `PascalCase` for components
- Keep functions small and focused (single responsibility principle)
```

## Benefits of This Approach

✅ **Reusable** - Copy to any project
✅ **Modular** - Use only what you need
✅ **Maintainable** - Update in one place, use everywhere
✅ **Customizable** - Easily adapt for different project needs
✅ **Organized** - Clear separation of concerns
✅ **Collaborative** - Team can share and improve guidelines

## Contributing

When updating these guidelines:
1. Keep them technology-agnostic where possible
2. Provide clear examples
3. Explain the "why" behind rules
4. Update this README if you add new files
5. Test guidelines in real projects before sharing