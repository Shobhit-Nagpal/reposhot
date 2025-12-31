# reposhot

> Create beautiful snapshots of your GitHub repositories.

Generate clean, shareable cards showcasing your GitHub repos - perfect for portfolios, social media, or documentation. Built with Angular 21 and rendered via Canvas for pixel-perfect exports.

## Features

- **Clean Visual Cards** - Minimalist design showing repo name, tagline, and key stats (stars, forks, issues)
- **GitHub Integration** - Fetch real-time repo data including owner avatar
- **Canvas Rendering** - Programmatic image generation for consistent, high-quality exports
- **One-Click Download** - Export your snapshot instantly as PNG
- **Responsive Design** - Built with Angular Material and Tailwind CSS

## Quick Start

```bash
# Clone the repo
git clone https://github.com/Shobhit-Nagpal/reposhot.git
cd reposhot

# Install dependencies
npm install

# Start dev server
npm start
```

Navigate to `http://localhost:4200` - the app will auto-reload on changes.

## Tech Stack

- **Angular 21** - Latest Angular with standalone components
- **Angular Material** - UI component library
- **Tailwind CSS 4** - Utility-first styling
- **Canvas API** - Programmatic image generation
- **Vitest** - Fast unit testing
- **TypeScript 5.9** - Type safety

## Development

### Available Scripts

```bash
npm start          # Start dev server
npm run build      # Production build
npm run watch      # Build with file watching
npm test           # Run Vitest tests
npm run lint       # ESLint code checking
```

### Code Style

This project uses Prettier with Angular-specific formatting:
- 100 character line width
- Single quotes
- Angular HTML parser for templates

Formatting runs automatically based on the config in `package.json`.

## Architecture

The app follows a straightforward data flow:

1. **User Input** - Enter GitHub username/repo or provide repo URL
2. **GitHub API** - Fetch repository metadata (name, description, stats, owner info)
3. **Canvas Rendering** - Generate snapshot card with repo data and styling
4. **Export** - Convert canvas to downloadable PNG image

Key implementation details:
- Canvas-based rendering ensures consistent output across different browsers and devices
- Angular's reactive forms handle user input and validation
- Material components provide the UI foundation with Tailwind for custom styling

## Contributing

PRs welcome! A few guidelines:
- Follow the existing code style (Prettier will help)
- Add tests for new features
- Keep commits focused and descriptive

---

Built by [@Shobhit-Nagpal](https://github.com/Shobhit-Nagpal)
