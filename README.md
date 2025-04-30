# ./

## Tech Stack

This project uses the following technologies:

- **Core Libraries**:
  - Vite 6.3 - Build tool and development server
  - React 19 - UI library
  - TypeScript 5.8 - Static type checking

- **Styling**:
  - Tailwind CSS 4.1 - Utility-first CSS framework

- **Assets**:
  - React Icons 5.5 - Icon library

- **Development Tools**:
  - ESLint - Static code analysis
  - Prettier - Code formatting
  - Git/GitHub - Version control

## Project Structure

```
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (header, footer, etc.)
│   │   └── ui/           # UI components (buttons, inputs, etc.)
│   ├── pages/            # Page components
│   ├── styles/           # CSS and style-related files
│   ├── utils/            # Utility functions and helpers
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint configuration
└── .prettierrc           # Prettier configuration
```

## Getting Started

To install dependencies:

```bash
npm install
```

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Additional Information

This project was set up with the following features:

- Full TypeScript support with strict mode
- Path aliasing (import with @/ prefix)
- Tailwind CSS
- ESLint and Prettier configured for code quality
- Standard React project structure
