import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size={64} />
    </div>
  );
}
