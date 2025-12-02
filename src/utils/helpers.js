export function getAuthToken(user, pass) {
  if (!user || !pass) throw new Error('Username and password required');
  return btoa(`${user}:${pass}`);
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'N/A') return 'N/A';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch {
    return dateStr;
  }
}

