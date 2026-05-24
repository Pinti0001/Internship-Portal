import { memo } from 'react';

function SkeletonCard() {
  return (
    <div className="bg-[var(--color-surface)] dark:bg-slate-900 rounded-2xl border border-[var(--color-border)] dark:border-slate-700/50 card-shadow p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-lg shimmer" />
          <div className="h-3 w-1/2 rounded-lg shimmer" />
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="h-3.5 w-24 rounded-lg shimmer" />
        <div className="h-3.5 w-20 rounded-lg shimmer" />
        <div className="h-3.5 w-28 rounded-lg shimmer" />
      </div>

      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 rounded-lg shimmer" />
        <div className="h-6 w-24 rounded-lg shimmer" />
      </div>

      <div className="pt-3 border-t border-[var(--color-border)] dark:border-slate-700/50 flex items-center justify-between">
        <div className="h-6 w-20 rounded-full shimmer" />
        <div className="h-9 w-28 rounded-xl shimmer" />
      </div>
    </div>
  );
}

function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export { SkeletonGrid };
export default memo(SkeletonCard);
