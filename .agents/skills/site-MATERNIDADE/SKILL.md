```markdown
# site-MATERNIDADE Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `site-MATERNIDADE` TypeScript codebase, built with the Vite framework. It covers file naming, import/export styles, commit message patterns, and testing conventions. By following these guidelines, contributors can maintain consistency and quality throughout the project.

## Coding Conventions

### File Naming
- Use **PascalCase** for file names.
  - Example: `UserProfile.tsx`, `HomePage.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { Button } from './components/Button';
    ```

### Export Style
- Both **named** and **default exports** are used.
  - Named export example:
    ```typescript
    export function calculateAge(birthDate: Date): number { ... }
    ```
  - Default export example:
    ```typescript
    export default UserProfile;
    ```

### Commit Message Patterns
- Commit messages are **freeform** (no strict type or prefix required).
- Average commit message length is around 80 characters.
  - Example:
    ```
    Add new appointment scheduling feature to dashboard
    ```

## Workflows

### Adding a New Component
**Trigger:** When you need to introduce a new UI component.
**Command:** `/add-component`

1. Create a new file in the appropriate directory using PascalCase (e.g., `NewComponent.tsx`).
2. Implement the component using TypeScript and React conventions.
3. Use relative imports for dependencies.
4. Export the component (named or default as appropriate).
5. Add a corresponding test file if applicable (e.g., `NewComponent.test.tsx`).
6. Commit your changes with a clear, descriptive message.

### Updating an Existing Feature
**Trigger:** When modifying or enhancing existing functionality.
**Command:** `/update-feature`

1. Locate the relevant file(s) using PascalCase naming.
2. Make your changes, maintaining code style and import/export conventions.
3. Update or add tests as needed.
4. Commit your changes with a descriptive message.

### Running the Project
**Trigger:** When you want to start the development server.
**Command:** `/run-dev`

1. Ensure dependencies are installed.
2. Run the Vite development server:
    ```
    npm run dev
    ```
3. Access the app at the local development URL.

### Writing and Running Tests
**Trigger:** When adding or running tests.
**Command:** `/run-tests`

1. Create test files using the pattern `*.test.*` (e.g., `UserProfile.test.tsx`).
2. Write tests according to the project's testing framework (unknown, but likely Jest or Vitest).
3. Run tests using the appropriate command:
    ```
    npm test
    ```
   or
    ```
    npm run test
    ```

## Testing Patterns

- Test files follow the pattern `*.test.*` (e.g., `Component.test.tsx`).
- The specific testing framework is not specified, but standard TypeScript/React testing practices apply.
- Place test files alongside the components or in a dedicated `__tests__` directory.

  Example test file:
  ```typescript
  import { render } from '@testing-library/react';
  import UserProfile from './UserProfile';

  test('renders user profile', () => {
    render(<UserProfile />);
    // assertions here
  });
  ```

## Commands
| Command         | Purpose                                         |
|-----------------|-------------------------------------------------|
| /add-component  | Scaffold and add a new UI component             |
| /update-feature | Modify or enhance an existing feature           |
| /run-dev        | Start the Vite development server               |
| /run-tests      | Run all test suites in the project              |
```