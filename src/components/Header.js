import { useState, useEffect, useRef } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.nav-hamburger-btn')) {
        setIsMenuOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target) && !event.target.closest('.nav-settings-btn')) {
        setIsSettingsOpen(false);
      }
    };

    if (isMenuOpen || isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isSettingsOpen]);

  return (
    <header className="app-header">
      <div className="header-nav">
        <div className="nav-logo-wrapper">
          <img src="/images/TestLogo.svg" alt="Logo" className="nav-logo" />
        </div>
        <div className="nav-links-center">
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
        <div className="nav-right-section">
          <div className="nav-dr-info">
            <img 
              src="/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png" 
              srcSet="/images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png 1x, /images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc@2x.png 2x"
              alt="Dr Jose Simmons" 
              className="nav-dr-image" 
            />
            <div className="nav-dr-details">
              <div className="nav-dr-name">Dr Jose Simmons</div>
              <div className="nav-dr-title">General Practitioner</div>
            </div>
          </div>
          <div className="nav-divider"></div>
          <div className="nav-buttons-group">
            <button className="nav-hamburger-btn" onClick={toggleMenu} aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div style={{ position: 'relative' }}>
              <button className="nav-settings-btn" onClick={toggleSettings} aria-label="Settings">
                <img src="/images/settings_FILL0_wght300_GRAD0_opsz24.svg" alt="Settings" className="nav-icon" />
              </button>
              {isSettingsOpen && (
                <div className="nav-settings-dropdown" ref={settingsDropdownRef}>
                  <button className="nav-dropdown-item">Account Settings</button>
                  <button className="nav-dropdown-item">Preferences</button>
                  <button className="nav-dropdown-item">Notifications</button>
                  <button className="nav-dropdown-item">Help & Support</button>
                </div>
              )}
            </div>
            <button className="nav-ellipsis-btn" aria-label="More options">
              <img src="/images/more_vert_FILL0_wght300_GRAD0_opsz24.svg" alt="More options" className="nav-icon" />
            </button>
          </div>
          {isMenuOpen && (
            <div className="nav-dropdown" ref={dropdownRef}>
              <button className="nav-dropdown-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Overview
              </button>
              <button className="nav-dropdown-item">
                <img src="/images/group_FILL0_wght300_GRAD0_opsz24.svg" alt="Patients" className="nav-icon" />
                Patients
              </button>
              <button className="nav-dropdown-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Schedule
              </button>
              <button className="nav-dropdown-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Message
              </button>
              <button className="nav-dropdown-item">
                <img src="/images/credit_card_FILL0_wght300_GRAD0_opsz24.svg" alt="Transactions" className="nav-icon" />
                Transactions
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
