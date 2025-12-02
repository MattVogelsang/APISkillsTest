export function getAuthToken(user, pass) {
  if (!user || !pass) {
    throw new Error('Username and password required');
  }
  const credentials = user + ':' + pass;
  return btoa(credentials);
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'N/A') {
    return 'N/A';
  }
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
}
