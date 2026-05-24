import { memo } from 'react';
import { X } from 'lucide-react';

function FilterChips({ filters, onRemove, onClearAll }) {
  const chips = [];

  if (filters.profile) {
    chips.push({ key: 'profile', label: `Profile: ${filters.profile}`, type: 'profile' });
  }

  if (filters.locations?.length > 0) {
    filters.locations.forEach((loc) => {
      chips.push({ key: `loc-${loc}`, label: loc, type: 'location', value: loc });
    });
  }

  if (filters.duration > 0) {
    chips.push({ key: 'duration', label: `≤ ${filters.duration} months`, type: 'duration' });
  }

  if (filters.stipend > 0) {
    chips.push({
      key: 'stipend',
      label: `≥ ₹${filters.stipend.toLocaleString('en-IN')}`,
      type: 'stipend',
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 transition-all hover:scale-105"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.type, chip.value)}
            className="ml-0.5 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
            aria-label={`Remove ${chip.label} filter`}
          >
            <X size={12} />
          </button>
        </span>
      ))}

      {chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-1"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

export default memo(FilterChips);
