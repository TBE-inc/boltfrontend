# Weedify Frontend

A modern, production-ready Next.js frontend application with TypeScript, Tailwind CSS, and comprehensive testing setup.

## 🚀 Features

- **Next.js 14** with TypeScript
- **Atomic Design** component architecture
- **Tailwind CSS** with custom design system
- **Storybook** for component documentation
- **Jest & Testing Library** for unit tests
- **Playwright** for E2E testing
- **ESLint & Prettier** for code quality
- **Static export** ready for deployment

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI elements (Button, Icon)
│   ├── molecules/      # Composite components (InputBar, MessageBubble)
│   └── organisms/      # Complex components (ChatPanel, Header)
├── hooks/              # Custom React hooks
├── lib/                # API utilities and business logic
├── pages/              # Next.js pages
├── styles/             # Global styles
└── theme/              # Design system tokens
```

## 🛠 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run export` - Build and export static files

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run e2e` - Run E2E tests
- `npm run e2e:ui` - Run E2E tests with UI

### Documentation
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

## 🎨 Design System

The project uses a comprehensive design system with typed tokens:

### Colors
- **Accent**: `#6B8F71` (Weedify green)
- **Neutrals**: Background, text, and border colors
- **Usage**: Available via `useTheme()` hook and Tailwind classes

### Spacing
- **Scale**: xs, sm, md, lg, xl, 2xl
- **Horizontal**: Specific spacing for horizontal layouts

### Dimensions
- **Icons**: Multiple sizes (xs to xl)
- **Buttons**: Height and padding variants
- **Border Radius**: Consistent rounding scale

## 🔌 API Integration

Configure API endpoints in `.env.local`:

```env
# Chat API
NEXT_PUBLIC_API_CHAT_SEND=https://api.example.com/chat/send
NEXT_PUBLIC_API_CHAT_HISTORY=https://api.example.com/chat/history

# Authentication
NEXT_PUBLIC_API_AUTH_LOGIN=https://api.example.com/auth/login
NEXT_PUBLIC_API_AUTH_LOGOUT=https://api.example.com/auth/logout

# Payments
NEXT_PUBLIC_API_PAYMENT_CHECKOUT=https://api.example.com/payment/checkout
NEXT_PUBLIC_API_PAYMENT_PLANS=https://api.example.com/payment/plans
```

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm run test

# Run specific test file
npm run test InputBar.test.tsx

# Run tests in watch mode
npm run test:watch
```

### E2E Tests
```bash
# Run E2E tests
npm run e2e

# Run with UI
npm run e2e:ui
```

## 📚 Storybook

View component documentation and interact with components:

```bash
npm run storybook
```

Access at `http://localhost:6006`

## 🚀 Deployment

### Static Export
```bash
npm run export
```

Generates static files in `out/` directory, ready for hosting on:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### SSR Deployment
```bash
npm run build
npm run start
```

Deploy to platforms supporting Node.js:
- Vercel
- Netlify Functions
- AWS Lambda
- Docker containers

## 🔧 Environment Variables

Required environment variables (see `.env.example`):

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Base API URL | Yes |
| `NEXT_PUBLIC_API_TOKEN` | API authentication token | Yes |
| `NEXT_PUBLIC_API_CHAT_SEND` | Chat message endpoint | Yes |
| `NEXT_PUBLIC_API_AUTH_LOGIN` | Login endpoint | Yes |
| `NEXT_PUBLIC_API_PAYMENT_CHECKOUT` | Payment checkout endpoint | No |

## 🏗 Architecture Decisions

### Component Architecture
- **Atomic Design**: Scalable component organization
- **TypeScript**: Full type safety
- **Theme System**: Centralized design tokens

### State Management
- **React Hooks**: Local state management
- **Context API**: Global state (when needed)
- **No external state library**: Keeps bundle size minimal

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **CSS-in-JS**: Theme integration via styled components
- **Custom Properties**: CSS variables for theme values

### Testing Strategy
- **Unit Tests**: Component logic and interactions
- **Integration Tests**: Component combinations
- **E2E Tests**: User workflows and critical paths

## 🤝 Contributing

1. Follow the established code style
2. Write tests for new features
3. Update Storybook documentation
4. Ensure all checks pass before submitting

## 📄 License

This project is private and proprietary.