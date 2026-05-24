import { memo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-border)] dark:border-slate-700/50 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-3.5 px-1 text-sm font-semibold text-[var(--color-text-primary)] dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-4 px-1">{children}</div>
      </div>
    </div>
  );
}

export default memo(FilterSection);
