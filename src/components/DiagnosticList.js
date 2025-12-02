function DiagnosticList({ diagnosticList }) {
  return (
    <section className="diagnostic-list-section">
      <h3 className="diagnostic-list-title">Diagnostic List</h3>
      <div className="diagnostic-list-content">
        {diagnosticList && diagnosticList.length > 0 ? (
          <ul className="diagnostic-items">
            {diagnosticList.map((diagnostic, index) => (
              <li key={index} className="diagnostic-item">
                {diagnostic.name || diagnostic}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-diagnostics">No diagnostics available</p>
        )}
      </div>
    </section>
  );
}

export default DiagnosticList;

