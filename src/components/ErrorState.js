function ErrorState({ error }) {
  return (
    <div className="error-state">
      <p>Error Loading Data: {error}</p>
    </div>
  );
}

export default ErrorState;

