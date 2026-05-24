import { memo } from 'react';
import { Briefcase, Moon, Sun, Bookmark } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

function Navbar({ savedCount = 0 }) {
  const { dark, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border)] dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              InternCrack
            </span>
          </a>

          <div className="flex items-center gap-3">
            {savedCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-sm font-medium">
                <Bookmark size={14} />
                <span>{savedCount} saved</span>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
