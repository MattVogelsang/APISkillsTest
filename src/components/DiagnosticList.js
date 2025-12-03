function DiagnosticList({ diagnosticList }) {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <div className="diagnostic-list-section">
        <h3 className="diagnostic-list-title">Diagnostic List</h3>
        <div className="diagnostic-list-content">
          <p className="no-diagnostics">No diagnostics available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="diagnostic-list-section">
      <h3 className="diagnostic-list-title">Diagnostic List</h3>
      <div className="diagnostic-list-content">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList.map((diagnostic, index) => {
              let name = diagnostic;
              if (diagnostic.name) {
                name = diagnostic.name;
              }

              let description = diagnostic.description || '';
              let status = diagnostic.status || '';

              return (
                <tr key={index} className="diagnostic-row">
                  <td className="diagnostic-name">{name}</td>
                  <td className="diagnostic-description">{description}</td>
                  <td className="diagnostic-status">{status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DiagnosticList;
