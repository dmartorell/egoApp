# Node.js/Backend Style Rules

## Core Node.js Guidelines
- Use `const` and `let` appropriately, never `var`
- Prefer `async/await` over promise chains
- Always handle errors properly with try/catch
- Use meaningful HTTP status codes
- Validate all inputs at API boundaries
- Use environment variables for configuration

## API Design
- Use RESTful conventions when appropriate
- Return consistent response formats
- Include proper error messages and codes
- Implement proper authentication and authorization
- Use middleware for cross-cutting concerns
- Version your APIs appropriately

## Error Handling
- Always handle errors explicitly
- Use specific error types and messages
- Log errors appropriately for debugging
- Fail fast when possible
- Provide fallback behaviors for user-facing errors
- Don't expose sensitive information in error messages

## Database & External Services
- Use connection pooling for databases
- Implement proper transaction handling
- Use prepared statements to prevent SQL injection
- Handle external service failures gracefully
- Implement circuit breaker patterns for resilience