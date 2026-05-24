import { memo, useMemo, useState, useEffect } from 'react';
import { X, Search, RotateCcw, SlidersHorizontal } from 'lucide-react';
import FilterSection from './FilterSection';
import { STIPEND_OPTIONS, DURATION_OPTIONS } from '../../utils/constants';

function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  allLocations,
  profileInput,
  onProfileInputChange,
}) {
  const [locationSearch, setLocationSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setMounted(false);
  };

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

  if (!mounted && !isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        onTransitionEnd={handleAnimationEnd}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)] dark:bg-slate-900 rounded-t-3xl max-h-[85vh] overflow-y-auto filter-scrollbar transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="sticky top-0 bg-[var(--color-surface)] dark:bg-slate-900 px-5 pt-4 pb-3 border-b border-[var(--color-border)] dark:border-slate-700/50 z-10">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-blue-600" />
              <h2 className="text-lg font-bold dark:text-white">Filters</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={20} className="text-slate-500" />
            </button>
          </div>
        </div>

        <div className="px-5 py-4">
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
            <div className="space-y-1.5 max-h-40 overflow-y-auto filter-scrollbar">
              {filteredLocations.map((loc) => (
                <label key={loc} className="flex items-center gap-2.5 py-1 px-1 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.locations.includes(loc)}
                    onChange={() => handleLocationToggle(loc)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">{loc}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Max Duration">
            <div className="space-y-1.5">
              {DURATION_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                  <input
                    type="radio"
                    name="m-duration"
                    checked={filters.duration === opt.value}
                    onChange={() => onFilterChange('duration', opt.value)}
                    className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Min Stipend">
            <div className="space-y-1.5">
              {STIPEND_OPTIONS.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 py-1 px-1 cursor-pointer">
                  <input
                    type="radio"
                    name="m-stipend"
                    checked={filters.stipend === opt.value}
                    onChange={() => onFilterChange('stipend', opt.value)}
                    className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/30"
                  />
                  <span className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        <div className="sticky bottom-0 px-5 py-4 bg-[var(--color-surface)] dark:bg-slate-900 border-t border-[var(--color-border)] dark:border-slate-700/50 flex gap-3">
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="flex-1 py-3 rounded-xl border border-[var(--color-border)] dark:border-slate-700 text-sm font-semibold text-[var(--color-text-secondary)] dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} />
              Clear all
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}

export default memo(MobileFilterDrawer);
