import { useState, useEffect } from 'react';

const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';

export const useFedSkillsApi = (authKey) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!authKey) {
        setError('Auth key required');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, {
          headers: { 'Authorization': `Basic ${authKey}` }
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const result = await response.json();
        if (!Array.isArray(result)) throw new Error('Not an array');

        setData(result);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [authKey]);

  return { data, loading, error };
};

