import { cn } from "@/lib/utils";

export const MetroIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M18 8L12 2 6 8" />
    <path d="M12 2v20" />
    <path d="M4 16h16" />
    <path d="M4 12h16" />
    <path d="M3 21h18" />
  </svg>
);
