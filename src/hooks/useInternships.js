import { useState, useEffect } from 'react';
import { fetchInternships } from '../services/api';

export function useInternships() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const internships = await fetchInternships();
        if (!cancelled) setData(internships);
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load internships');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
