import type { SVGProps } from 'react';

export function PlanchetteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M32 0C14.33 0 0 14.33 0 32c0 10.04 4.56 18.99 11.66 24.89l18.42-37.15c.57-1.15 1.99-1.54 3.14-.97s1.54 1.99.97 3.14L15.77 61.06A31.847 31.847 0 0 0 32 64c17.67 0 32-14.33 32-32S49.67 0 32 0zm0 4c15.46 0 28 12.54 28 28s-12.54 28-28 28S4 47.46 4 32 16.54 4 32 4z" />
      <circle cx="32" cy="32" r="6" />
    </svg>
  );
}
