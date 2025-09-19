# Michael's NextJS E-commerce Store

## Getting Started

Vercel Link: [meandem-next.vercel.app](https://meandem-next.vercel.app)

## Getting Started

```bash
npm install

npm run dev

npm test

npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Internationalization

The app supports multiple locales through dynamic routing:

- **UK**: `/int/en-gb` (GBP, English)
- **US**: `/int/en-us` (USD, English)

Easy to extend with additional locales by updating `src/constants/locales.ts`.

## Cart Persistence

Cart data is saved to localStorage and restored on page load, providing a shopping experience across sessions.

## Future Improvements / Productionise

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
- **Zod**: Form validation

### Performance

- **React.memo**: Optimize component re-renders
- **Code Splitting**: Implement lazy loading for better performance
- **Image Optimization**: Add Next.js Image component for product images

### Testing

- **Playwright**: Add E2E testing
- **Storybook**: Component documentation and testing

### Monitoring

- **Sentry**: Error tracking and monitoring
- **Analytics**: User behavior tracking
- **Performance**: Core Web Vitals monitoring

## Development Notes

- All API calls are handled through Next.js API routes to avoid CORS issues
- Cart persistence uses localStorage with SSR-safe implementation
- Responsive design follows mobile-first principles
- TypeScript ensures type safety across the application
