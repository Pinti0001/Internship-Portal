import { memo, useCallback } from 'react';
import { MapPin, Clock, Calendar, IndianRupee, Bookmark, BookmarkCheck, ExternalLink, Briefcase, Home } from 'lucide-react';

function CompanyAvatar({ name, logo }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="w-10 h-10 rounded-xl object-contain bg-white dark:bg-slate-800 border border-[var(--color-border)] dark:border-slate-700"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  }

  return null;
}

function InitialsAvatar({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/40 dark:to-violet-900/40 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/30">
      {initials}
    </div>
  );
}

function InternshipCard({ internship, isSaved, onToggleSave }) {
  const {
    id,
    title,
    companyName,
    companyLogo,
    locationNames,
    workFromHome,
    stipendRaw,
    duration,
    postedLabel,
    postedLabelType,
    isPPO,
    labels,
    startDate,
    officeDays,
  } = internship;

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleSave(id);
    },
    [id, onToggleSave]
  );

  const postedColor =
    postedLabelType === 'success'
      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
      : 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40';

  return (
    <article
      className="group relative bg-[var(--color-surface)] dark:bg-slate-900 rounded-2xl border border-[var(--color-border)] dark:border-slate-700/50 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
    >
      {isPPO && (
        <div className="absolute top-0 right-12 bg-gradient-to-r from-amber-400 to-orange-400 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-b-lg uppercase tracking-wider">
          PPO
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex-shrink-0 relative">
              {companyLogo ? (
                <>
                  <CompanyAvatar name={companyName} logo={companyLogo} />
                  <div className="hidden">
                    <InitialsAvatar name={companyName} />
                  </div>
                </>
              ) : (
                <InitialsAvatar name={companyName} />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] dark:text-slate-400 mt-0.5 truncate">
                {companyName}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isSaved ? 'Unsave internship' : 'Save internship'}
          >
            {isSaved ? (
              <BookmarkCheck size={18} className="text-blue-600 dark:text-blue-400" />
            ) : (
              <Bookmark size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-secondary)] dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5">
            {workFromHome ? <Home size={14} className="text-emerald-500" /> : <MapPin size={14} />}
            <span className="truncate max-w-[180px]">
              {locationNames.length > 0 ? locationNames.join(', ') : 'Not specified'}
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {duration}
          </span>

          <span className="flex items-center gap-1.5">
            <IndianRupee size={14} />
            {stipendRaw}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {workFromHome && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/30">
              <Home size={11} />
              Remote
            </span>
          )}

          {startDate && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              <Calendar size={11} />
              {startDate}
            </span>
          )}

          {officeDays && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border border-violet-200/60 dark:border-violet-800/30">
              <Briefcase size={11} />
              {officeDays}
            </span>
          )}

          {labels.map((label) => (
            <span
              key={label}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border)] dark:border-slate-700/50">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${postedColor}`}>
            {postedLabel}
          </span>

          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.97]">
            Apply Now
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(InternshipCard);
