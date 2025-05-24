# Contributing to Tail-Aid

Thank you for your interest in contributing to Tail-Aid! This document provides guidelines and instructions for contributing.

## Development Process

1. Fork the repository
2. Create a new branch for your feature/fix
3. Make your changes
4. Submit a pull request

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This helps us maintain a clean and meaningful commit history.

Format:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to build process or auxiliary tools

Example:
```
feat(sorting): add keyboard shortcut for class sorting

- Add Ctrl/Cmd + Shift + T shortcut
- Update documentation
- Add keyboard binding to package.json

Closes #123
```

## Versioning Process

We use [Semantic Versioning](https://semver.org/) for versioning. The version number is in the format `MAJOR.MINOR.PATCH`:

- `MAJOR`: Breaking changes
- `MINOR`: New features (backwards compatible)
- `PATCH`: Bug fixes (backwards compatible)

### Release Process

1. Create a changeset for your changes:
   ```bash
   npm run changeset
   ```
   This will prompt you to describe your changes and their impact.

2. When ready to release:
   - Push your changes to main
   - The GitHub Action will:
     - Create a version PR
     - Update the CHANGELOG.md
     - Create a GitHub release
     - Publish to VS Code Marketplace

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run compile
   ```

3. Run in development mode:
   - Press F5 in VS Code
   - Select "Run Extension"

## Testing

1. Run tests:
   ```bash
   npm test
   ```

2. Manual testing:
   - Install the extension locally
   - Test in different file types (HTML, JSX, TSX)
   - Verify all features work as expected

## Pull Request Process

1. Update the README.md and CHANGELOG.md if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation
5. Create a changeset for your changes
6. Submit the PR

## Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Add comments for complex logic
- Keep functions small and focused
- Write meaningful commit messages

## Questions?

Feel free to open an issue for any questions about the contribution process. 