import { cn } from "@/lib/utils";

export const RailwayIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M18 10h-1.3L12 3.3 7.3 10H6a4 4 0 0 0-4 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a4 4 0 0 0-4-4Z" />
    <path d="M12 3.3V10" />
    <path d="m14 14-4 4" />
    <path d="m10 14-4 4" />
    <path d="m14 18-4-4" />
    <path d="m10 18-4-4" />
    <path d="M6 10h12" />
    <path d="M5 20h14" />
  </svg>
);
