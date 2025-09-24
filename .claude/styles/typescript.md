# TypeScript Style Rules

## Core TypeScript Guidelines
- Always use TypeScript for all JavaScript code
- Never use TypeScript non-null assertion operator (`!`)
- Prefer `interface` over `type` for object shapes
- Use strict TypeScript configuration
- Always define return types for functions
- Use `const assertions` when appropriate: `as const`

## Type Definitions
- Create specific interfaces for props and API responses
- Use union types for controlled values: `type Status = 'loading' | 'success' | 'error'`
- Prefer readonly arrays and objects when data shouldn't be mutated
- Use generic types for reusable components and functions

## Naming Conventions for Types
- Use `PascalCase` for interfaces, types, and enums
- Prefix interfaces with `I` only when necessary to avoid conflicts
- Use descriptive names: `UserProfile` not `User`
- Use `Props` suffix for component props: `ButtonProps`