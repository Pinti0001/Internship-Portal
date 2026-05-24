import { useState, useCallback } from 'react';

const STORAGE_KEY = 'internhub_saved';

function getInitialSaved() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useSavedInternships() {
  const [savedIds, setSavedIds] = useState(getInitialSaved);

  const persist = useCallback((ids) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id];
      persist(next);
      return next;
    });
  }, [persist]);

  const isSaved = useCallback(
    (id) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, toggleSave, isSaved, savedCount: savedIds.length };
}
