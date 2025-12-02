function Header() {
  return (
    <header className="app-header">
      <div className="header-nav">
        <div className="nav-logo-wrapper">
          <img src="/images/TestLogo.svg" alt="Logo" className="nav-logo" />
        </div>
        <button className="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Overview
        </button>
        <button className="nav-item active">
          <img src="/images/group_FILL0_wght300_GRAD0_opsz24.svg" alt="Patients" className="nav-icon" />
          Patients
        </button>
        <button className="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Schedule
        </button>
        <button className="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Message
        </button>
        <button className="nav-item">
          <img src="/images/credit_card_FILL0_wght300_GRAD0_opsz24.svg" alt="Transactions" className="nav-icon" />
          Transactions
        </button>
      </div>
    </header>
  );
}

export default Header;

