# React/Frontend Style Rules

## Component Guidelines
- Use functional components with hooks
- Prefer `const` for component definitions: `const Component = () => {}`
- Use descriptive component and prop names
- Extract complex JSX into smaller components
- Use custom hooks for reusable logic
- Always provide `key` props in lists
- Use TypeScript for all props with proper interfaces

## Hooks Best Practices
- Use `useState` for component-local state
- Use `useEffect` with proper dependency arrays
- Extract complex logic into custom hooks
- Use `useCallback` and `useMemo` judiciously (avoid premature optimization)
- Follow hooks rules (only call at top level, only in React functions)

## JSX Guidelines
- Use semantic HTML elements when possible
- Keep JSX readable with proper indentation
- Extract complex conditional rendering into variables or functions
- Use fragments (`<>`) instead of unnecessary div wrappers
- Prefer explicit boolean props: `isActive={true}` over `isActive`

## State Management
- Use local state when possible before reaching for global state
- Keep state as close to where it's used as possible
- Use proper state update patterns (functional updates for dependent state)
- Avoid deeply nested state objects