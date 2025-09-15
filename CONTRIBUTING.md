# Contributing to Feedbackly SDK

Thank you for your interest in contributing to the Feedbackly SDK! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/feedbackly-sdk.git
   cd feedbackly-sdk
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Run tests:
   ```bash
   npm test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Check formatting:
   ```bash
   npm run format:check
   ```

6. Build the package:
   ```bash
   npm run build
   ```

### Code Style

We use ESLint and Prettier for code formatting and linting. The configuration is included in the repository.

- Run `npm run lint:fix` to automatically fix linting issues
- Run `npm run format` to format code with Prettier

### Testing

We use Jest for testing. All new features should include tests.

- Run `npm test` to run all tests
- Run `npm run test:watch` for watch mode
- Run `npm run test:coverage` for coverage report

### Commit Messages

We follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. Ensure your code passes all tests and linting checks
2. Update documentation if needed
3. Add tests for new functionality
4. Update the CHANGELOG.md if applicable
5. Submit a pull request with a clear description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if applicable)
```

## Reporting Issues

When reporting issues, please include:

1. **Environment**: Node.js version, browser, OS
2. **Steps to reproduce**: Clear, numbered steps
3. **Expected behavior**: What should happen
4. **Actual behavior**: What actually happens
5. **Code example**: Minimal code to reproduce the issue

## Feature Requests

For feature requests, please:

1. Check existing issues first
2. Provide a clear description of the feature
3. Explain the use case and benefits
4. Consider implementation complexity

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing.

