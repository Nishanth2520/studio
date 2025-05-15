import type { SVGProps } from 'react';
import { Stethoscope } from 'lucide-react';

export function Logo(props: SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 32, className, ...rest } = props;
  return (
    <div className="flex items-center gap-2">
      <Stethoscope size={size} className="text-primary" />
      <span className="text-xl font-bold text-primary">MediConsult AI</span>
    </div>
  );
}
