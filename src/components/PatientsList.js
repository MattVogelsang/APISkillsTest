import { getPatientImage } from '../utils/patientImages';

function PatientsList({ patients, selectedPatient, onSelectPatient }) {

  if (!patients || patients.length === 0) {
    return (
      <section className="patients-list-section">
        <div className="patients-list-header">
          <h3 className="patients-list-title">Patients</h3>
        </div>
        <p className="no-patients">No patients available</p>
      </section>
    );
  }

  return (
    <section className="patients-list-section">
      <div className="patients-list-header">
        <h3 className="patients-list-title">Patients</h3>
        <button className="patients-search-btn" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </div>
      <div className="patients-list-content">
        {patients.filter(patient => {
          const name = (patient.name || '').toLowerCase();
          const excluded = [
            'kevin anderson',
            'nathan',
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
          return true;
        }).map((patient, index) => {
          const isSelected = selectedPatient && patient.name === selectedPatient.name;
          let age = 'N/A';
          if (patient.date_of_birth) {
            const birthYear = new Date(patient.date_of_birth).getFullYear();
            const currentYear = new Date().getFullYear();
            age = currentYear - birthYear;
          }
          const patientImage = getPatientImage(patient, index);

          return (
            <div
              key={index}
              className={`patient-list-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectPatient && onSelectPatient(patient)}
            >
              <div className="patient-list-avatar">
                <img
                  src={patientImage.src}
                  srcSet={patientImage.srcSet}
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
              <button className="patient-list-more" aria-label="More options">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PatientsList;
