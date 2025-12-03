import { useState, useEffect, useRef } from 'react';

function PatientsList({ patients, selectedPatient, onSelectPatient }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRefs = useRef({});
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownIndex !== null) {
        const dropdownRef = dropdownRefs.current[openDropdownIndex];
        if (dropdownRef && !dropdownRef.contains(event.target) && !event.target.closest(`.patient-list-more-${openDropdownIndex}`)) {
          setOpenDropdownIndex(null);
        }
      }
    };

    if (openDropdownIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownIndex]);

  const handleEllipsisClick = (e, index) => {
    e.stopPropagation();
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleSearchClick = () => {
    if (isSearchOpen) {
      setSearchTerm('');
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 10);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="patients-list-section">
        <div className="patients-list-header">
          <h3 className="patients-list-title">Patients</h3>
        </div>
        <p className="no-patients">No patients available</p>
      </div>
    );
  }

  return (
    <div className="patients-list-section">
      <div className="patients-list-header">
        <h3 className="patients-list-title">Patients</h3>
        {isSearchOpen ? (
          <div className="patients-search-input-wrapper">
            <input
              ref={searchInputRef}
              type="text"
              className="patients-search-input"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="patients-search-close" onClick={handleSearchClick} aria-label="Close search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ) : (
          <button className="patients-search-btn" onClick={handleSearchClick} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        )}
      </div>
      <div className="patients-list-content">
        {patients.filter(patient => {
          const name = (patient.name || '').toLowerCase();
          const excluded = [
            'richard brown',
            'jennifer johnson',
            'william johnson',
            'david johnson',
            'elizabeth johnson',
            'john martinez',
            'thomas johnson',
            'david miller'
          ];

          for (let i = 0; i < excluded.length; i++) {
            if (name.includes(excluded[i])) {
              return false;
            }
          }

          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            if (!name.includes(searchLower)) {
              return false;
            }
          }

          return true;
        }).map((patient, index) => {
          const isSelected = selectedPatient && patient.name === selectedPatient.name;
          let age = 'N/A';
          if (patient.date_of_birth) {
            const birthYear = new Date(patient.date_of_birth).getFullYear();
            const currentYear = new Date().getFullYear();
            age = currentYear - birthYear;
          }
          return (
            <div
              key={index}
              className={`patient-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPatient && onSelectPatient(patient)}
            >
              <div className="patient-list-avatar">
                <img
                  src={patient.profile_picture || '/images/JT.png'}
                  alt={patient.name || 'Patient'}
                  className="patient-list-photo"
                />
              </div>
              <div className="patient-list-info">
                <div className="patient-list-name">{patient.name || 'Unknown'}</div>
                <div className="patient-list-details">
                  {patient.gender || 'Unknown'}, {age}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <button 
                  className={`patient-list-more patient-list-more-${index}`}
                  onClick={(e) => handleEllipsisClick(e, index)}
                  aria-label="More options"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="5" cy="12" r="1"/>
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                  </svg>
                </button>
                {openDropdownIndex === index && (
                  <div className="patient-list-dropdown" ref={el => dropdownRefs.current[index] = el}>
                    <button className="patient-dropdown-item">View Details</button>
                    <button className="patient-dropdown-item">Edit Patient</button>
                    <button className="patient-dropdown-item">Send Message</button>
                    <button className="patient-dropdown-item">Archive</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientsList;
