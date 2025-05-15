import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ size = 48, className }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center h-full ${className}`}>
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}
