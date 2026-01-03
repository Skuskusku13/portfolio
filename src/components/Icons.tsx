import type {SVGProps} from 'react';

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4c0-1.51-.53-2.08-1-2.42 2.2-.24 4.5-1.07 4.5-4.8 0-1.07-.38-1.95-1.02-2.63.1-.25.45-1.25-.1-2.6-1.05-.33-3.44 1.3-3.44 1.3-.9-.25-1.86-.38-2.82-.38-.96 0-1.92.13-2.82.38 0 0-2.39-1.63-3.44-1.3-.55 1.35-.2 2.35-.1 2.6-.64.68-1.02 1.56-1.02 2.63 0 3.71 2.29 4.56 4.5 4.79-.37.31-.7 1.11-.7 1.8V22" />
    </svg>
  );
}

export function GithubOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${props.className} opacity-40`}
    >
      <path d="M15 22v-4c0-1.51-.53-2.08-1-2.42 2.2-.24 4.5-1.07 4.5-4.8 0-1.07-.38-1.95-1.02-2.63.1-.25.45-1.25-.1-2.6-1.05-.33-3.44 1.3-3.44 1.3-.9-.25-1.86-.38-2.82-.38-.96 0-1.92.13-2.82.38 0 0-2.39-1.63-3.44-1.3-.55 1.35-.2 2.35-.1 2.6-.64.68-1.02 1.56-1.02 2.63 0 3.71 2.29 4.56 4.5 4.79-.37.31-.7 1.11-.7 1.8V22" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export { LinkedinIcon };
