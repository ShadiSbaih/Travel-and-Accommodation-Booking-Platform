# Copilot Instructions for Travel App Project

## Technology Stack
- **Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI) components
- **State Management**: Redux with custom hooks
- **Import Strategy**: Use `@` prefix for absolute imports from `src` folder

## Architecture Guidelines

### Modular Feature-Based Structure
- Always create files in the respective feature folder
- Analyze and determine the correct feature folder before creating files
- Follow the existing folder structure: `features/<feature-name>/{api, components, hooks, types, store}`

### Code Organization
- **Types & Interfaces**: Always move types and interfaces to dedicated `types` files within each feature
- **Components**: Divide components into smaller, reusable sub-components for better readability and maintainability
- **State Management**: Always use custom hooks for Redux state management (never access store directly)
- **API Calls**: Always use custom hooks for API calls (never call APIs directly in components)

### Code Quality
- Optimize code and avoid redundancy
- Follow DRY (Don't Repeat Yourself) principle
- Use absolute imports with `@` prefix (e.g., `@/features/auth/types`)

## Workflow Rules

### DO NOT:
- ❌ **NEVER** create README.md or any documentation (.md) files after implementing features
- ❌ Do not create markdown files unless explicitly requested

### DO:
- ✅ **ALWAYS** suggest a concise commit message after each edit, summarizing the changes
- ✅ Use MUI components for all UI design
- ✅ Create custom hooks for state and API management
- ✅ Keep components small and focused