# Naming Conventions

## Variable and Function Names
- Use `camelCase` for variables and functions
- Use descriptive names: `getUserById` not `getUser`
- Boolean variables should be questions: `isLoading`, `hasError`, `canEdit`
- Use verbs for functions: `calculateTotal`, `validateEmail`
- Use nouns for variables: `userProfile`, `totalAmount`

## Constants and Enums
- Use `UPPER_SNAKE_CASE` for constants
- Group related constants in objects or enums
- Make constants descriptive: `MAX_RETRY_ATTEMPTS` not `MAX_RETRIES`

## Components and Classes
- Use `PascalCase` for components, classes, and constructors
- Use descriptive component names: `UserProfileCard` not `Card`
- Avoid abbreviations unless they're widely understood
- Use consistent naming patterns across the project

## Files and Directories
- Use `kebab-case` for file and directory names
- Match file names with their primary export
- Use descriptive directory names that group related functionality
- Separate concerns into appropriate directories (components, utils, services)

## Import/Export Conventions
- Use named exports with arrow functions: `export const functionName = () => {}`
- Avoid default exports unless required by the framework
- Group imports: external libraries first, then internal modules
- Use absolute imports with path mapping when possible
- Sort imports alphabetically within groups