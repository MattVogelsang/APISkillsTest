import { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';
import { getAuthToken } from '../utils/helpers';

export const useFedSkillsApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const username = process.env.REACT_APP_USERNAME || 'coalition';
        const password = process.env.REACT_APP_PASSWORD || 'skills-test';
        const auth = getAuthToken(username, password);

        const response = await fetch(API_URL, {
          headers: { 'Authorization': 'Basic ' + auth }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const result = await response.json();
        if (!Array.isArray(result)) {
          throw new Error('Invalid data format');
        }

        setData(result);
      } catch (err) {
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
};
