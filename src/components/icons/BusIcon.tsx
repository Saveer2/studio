import { cn } from "@/lib/utils";

export const BusIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}
    {...props}
  >
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <path d="M3 11V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
    <path d="M8 16h8" />
    <circle cx="7" cy="20" r="2" />
    <circle cx="17" cy="20" r="2" />
    <path d="M16 5h2" />
    <path d="M6 5h2" />
  </svg>
);
