# Michael's NextJS E-commerce Store

A modern, internationalized e-commerce application built with Next.js 14, featuring dynamic routing, cart persistence, and multi-locale support.

## ✨ Features

- **🌍 Internationalization**: Dynamic routing with `/int/[slug]` for UK (`en-gb`) and US (`en-us`) locales
- **🛒 Shopping Cart**: Persistent cart with localStorage, survives page reloads
- **💰 Multi-Currency**: Automatic currency formatting (GBP/USD) based on locale
- **📱 Responsive Design**: Mobile-first approach with optimized layouts
- **🔄 Real-time Updates**: Live cart updates and product loading
- **🎨 Modern UI**: Clean, minimalist design with CSS modules

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS
- **State Management**: React Context API
- **Testing**: Jest + React Testing Library
- **API**: External product APIs with CORS proxy

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── int/[slug]/        # Dynamic internationalization routes
│   ├── checkout/          # Checkout page
│   └── api/               # API routes (CORS proxy)
├── components/            # Reusable UI components
├── contexts/              # React Context for state management
├── constants/             # Locale configurations
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🌍 Internationalization

The app supports multiple locales through dynamic routing:

- **UK**: `/int/en-gb` (GBP, English)
- **US**: `/int/en-us` (USD, English)

Easy to extend with additional locales by updating `src/constants/locales.ts`.

## 🛒 Cart Persistence

Cart data is automatically saved to localStorage and restored on page load, providing a seamless shopping experience across sessions.

## 🎯 Future Improvements

### State Management

- **Zustand**: Replace React Context with Zustand for better performance and developer experience
- **Redux Toolkit**: Alternative for complex state management needs

### Data Fetching

- **TanStack Query**: Implement React Query for advanced caching, background updates, and optimistic updates
- **SWR**: Lightweight alternative for data fetching with built-in caching

### UI/UX Enhancements

- **Tailwind CSS**: Replace CSS modules with utility-first styling
- **Framer Motion**: Add smooth animations and transitions
- **React Hook Form**: Improve form handling and validation
- **React Hot Toast**: Better notification system

### Performance

- **React.memo**: Optimize component re-renders
- **Code Splitting**: Implement lazy loading for better performance
- **Image Optimization**: Add Next.js Image component for product images

### Additional Features

- **Search & Filters**: Product search and filtering capabilities
- **User Authentication**: Login/register functionality
- **Order History**: Track previous orders
- **Wishlist**: Save favorite products
- **PWA**: Progressive Web App features
- **Dark Mode**: Theme switching capability

### Testing

- **Playwright**: Add E2E testing
- **Storybook**: Component documentation and testing
- **MSW**: Mock Service Worker for API mocking

### Monitoring

- **Sentry**: Error tracking and monitoring
- **Analytics**: User behavior tracking
- **Performance**: Core Web Vitals monitoring

## 📝 Development Notes

- All API calls are handled through Next.js API routes to avoid CORS issues
- Cart persistence uses localStorage with SSR-safe implementation
- Responsive design follows mobile-first principles
- TypeScript ensures type safety across the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is part of a coding challenge and is for demonstration purposes.
