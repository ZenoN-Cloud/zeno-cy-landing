# Mobile Performance Optimization

## Критичные проблемы на мобилках

### 1. Viewport & Touch
```tsx
// src/app/layout.tsx - добавить в metadata
viewport: {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
```

### 2. Reduce JavaScript для мобилок
```tsx
// Условная загрузка тяжелых компонентов
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    ssr: false,
    loading: () => <Skeleton />,
  }
);
```

### 3. Оптимизация изображений
```tsx
// Использовать srcset для responsive images
<img
  src="/logo_zeno.png"
  srcSet="/logo_zeno-sm.png 1x, /logo_zeno.png 2x"
  alt="Zeno CY"
  width={32}
  height={32}
  loading="eager"
  fetchPriority="high"
/>
```

### 4. Reduce animations на мобилках
```tsx
// Отключить тяжелые анимации
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

<motion.div
  initial={prefersReducedMotion ? {} : { opacity: 0 }}
  animate={prefersReducedMotion ? {} : { opacity: 1 }}
/>
```

### 5. Touch-friendly targets
```css
/* Минимум 44x44px для кнопок */
.btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### 6. Reduce blur effects
```tsx
// Blur очень тяжелый на мобилках
<div className="md:blur-[180px] blur-[80px]" />
```

### 7. Intersection Observer для lazy load
```tsx
// Загружать секции только когда они в viewport
import { useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "100px" });

return (
  <div ref={ref}>
    {isInView && <HeavySection />}
  </div>
);
```

### 8. Service Worker для кеширования
```js
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/logo_zeno.png',
        '/_next/static/css/...',
      ]);
    })
  );
});
```

## Quick Wins для мобилок

1. **Уменьшить blur радиус** - с 180px до 80px на мобилках
2. **Отключить autoplay видео** - только по клику на мобилках
3. **Lazy load всех секций кроме Hero**
4. **Уменьшить font-size** - меньше текста = быстрее рендер
5. **Убрать тени и градиенты** - упростить визуал на слабых устройствах

## Tailwind responsive utilities

```tsx
// Используй mobile-first подход
<div className="text-sm md:text-base lg:text-lg">
<div className="gap-4 md:gap-8 lg:gap-12">
<div className="blur-[60px] md:blur-[120px] lg:blur-[180px]">
```

## Testing

```bash
# Chrome DevTools
1. Open DevTools → Performance
2. CPU: 4x slowdown
3. Network: Fast 3G
4. Record → Reload

# Lighthouse mobile
npx lighthouse https://zeno-cy.com --preset=mobile --view
```

## Метрики для мобилок

- **LCP:** < 3.5s (мобилки медленнее)
- **FID:** < 100ms
- **CLS:** < 0.1
- **TTI:** < 5s
- **PageSpeed Mobile:** > 85
