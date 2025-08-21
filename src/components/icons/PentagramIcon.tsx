import type { SVGProps } from 'react';

export function PentagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m12 2 2.939 8.944L22 12l-7.061 1.056L12 22l-2.939-8.944L2 12l7.061-1.056z" />
    </svg>
  );
}
