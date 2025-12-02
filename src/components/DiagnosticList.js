function DiagnosticList({ diagnosticList }) {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <section className="diagnostic-list-section">
        <h3 className="diagnostic-list-title">Diagnostic List</h3>
        <div className="diagnostic-list-content">
          <p className="no-diagnostics">No diagnostics available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="diagnostic-list-section">
      <h3 className="diagnostic-list-title">Diagnostic List</h3>
      <div className="diagnostic-list-content">
        <ul className="diagnostic-items">
          {diagnosticList.map((diagnostic, index) => {
            const name = diagnostic.name || diagnostic;
            return (
              <li key={index} className="diagnostic-item">
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default DiagnosticList;

