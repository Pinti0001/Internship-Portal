import { memo } from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

function EmptyState({ onClearFilters, hasFilters }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
        <SearchX size={36} className="text-slate-400 dark:text-slate-500" />
      </div>

      <h3 className="text-lg font-bold text-[var(--color-text-primary)] dark:text-white mb-2">
        No internships found
      </h3>

      <p className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {hasFilters
          ? "We couldn't find any internships matching your current filters. Try adjusting your criteria."
          : 'No internships are available at the moment. Please check back later.'}
      </p>

      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
        >
          <RotateCcw size={14} />
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default memo(EmptyState);
