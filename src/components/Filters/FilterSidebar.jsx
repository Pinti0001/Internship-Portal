import { memo, useMemo, useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import FilterSection from './FilterSection';
import { STIPEND_OPTIONS, DURATION_OPTIONS } from '../../utils/constants';

function FilterSidebar({
  filters,
  onFilterChange,
  onClearAll,
  allLocations,
  profileInput,
  onProfileInputChange,
}) {
  const [locationSearch, setLocationSearch] = useState('');

  const filteredLocations = useMemo(() => {
    if (!locationSearch) return allLocations.slice(0, 15);
    const q = locationSearch.toLowerCase();
    return allLocations.filter((l) => l.toLowerCase().includes(q));
  }, [allLocations, locationSearch]);

  const hasActiveFilters =
    filters.profile ||
    filters.locations.length > 0 ||
    filters.duration > 0 ||
    filters.stipend > 0;

  function handleLocationToggle(loc) {
    const current = filters.locations;
    const next = current.includes(loc)
      ? current.filter((l) => l !== loc)
      : [...current, loc];
    onFilterChange('locations', next);
  }

  return (
    <aside className="w-full lg:w-[280px] lg:flex-shrink-0">
      <div className="lg:sticky lg:top-20 bg-[var(--color-surface)] dark:bg-slate-900 rounded-2xl card-shadow border border-[var(--color-border)] dark:border-slate-700/50 p-5 filter-scrollbar lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[var(--color-text-primary)] dark:text-white">
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 dark:text-red-400 transition-colors"
            >
              <RotateCcw size={12} />
              Clear all
            </button>
          )}
        </div>

        <FilterSection title="Profile">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={profileInput}
              onChange={(e) => onProfileInputChange(e.target.value)}
              placeholder="e.g. Data Science, Marketing"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm bg-[var(--color-surface-alt)] dark:bg-slate-800 border border-[var(--color-border)] dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-[var(--color-text-muted)]"
            />
          </div>
        </FilterSection>

        <FilterSection title="Location">
          <input
            type="text"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            placeholder="Search location..."
            className="w-full px-3 py-2 rounded-lg text-sm bg-[var(--color-surface-alt)] dark:bg-slate-800 border border-[var(--color-border)] dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-[var(--color-text-muted)] mb-2.5"
          />
          <div className="space-y-1.5 max-h-44 overflow-y-auto filter-scrollbar">
            {filteredLocations.map((loc) => (
              <label
                key={loc}
                className="flex items-center gap-2.5 py-1 px-1 rounded-lg hover:bg-[var(--color-surface-hover)] dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.locations.includes(loc)}
                  onChange={() => handleLocationToggle(loc)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0"
                />
                <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">
                  {loc}
                </span>
              </label>
            ))}
            {filteredLocations.length === 0 && (
              <p className="text-xs text-[var(--color-text-muted)] py-2">No locations found</p>
            )}
          </div>
        </FilterSection>

        <FilterSection title="Max Duration">
          <div className="space-y-1.5">
            {DURATION_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 py-1 px-1 rounded-lg hover:bg-[var(--color-surface-hover)] dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="duration"
                  checked={filters.duration === opt.value}
                  onChange={() => onFilterChange('duration', opt.value)}
                  className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0"
                />
                <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Min Stipend">
          <div className="space-y-1.5">
            {STIPEND_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 py-1 px-1 rounded-lg hover:bg-[var(--color-surface-hover)] dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="stipend"
                  checked={filters.stipend === opt.value}
                  onChange={() => onFilterChange('stipend', opt.value)}
                  className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30 focus:ring-offset-0"
                />
                <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}

export default memo(FilterSidebar);
