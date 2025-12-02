import { formatDate } from '../utils/helpers';
import { getPatientImage } from '../utils/patientImages';

function PatientCard({ patient }) {
  const patientImage = getPatientImage(patient);

  return (
    <div className="patient-card">
      <div className="patient-profile-section">
        <div className="profile-image">
          <img
            src={patientImage.src}
            srcSet={patientImage.srcSet}
            alt={patient.name || 'Patient'}
            className="profile-photo"
          />
        </div>
        <h2 className="patient-name-main">{patient.name || 'Patient'}</h2>
      </div>

      <div className="patient-details-list">
        <div className="detail-item">
          <div className="detail-icon-wrapper">
            <img src="/images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg" alt="Birth" className="detail-icon" />
          </div>
          <div className="detail-content">
            <span className="detail-label">Date Of Birth</span>
            <span className="detail-value">{formatDate(patient.date_of_birth) || 'August 23, 1996'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="detail-icon">
              <circle cx="10" cy="10" r="7"/>
              <path d="M10 3v7M10 3l-3 3M10 3l3 3"/>
              {patient.gender !== 'Male' && <path d="M7 17h6"/>}
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{patient.gender || 'Female'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="detail-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-label">Contact Info.</span>
            <span className="detail-value">{patient.phone_number || '(415) 555-1234'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="detail-icon">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-label">Emergency Contacts</span>
            <span className="detail-value">(415) 555-5678</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="detail-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div className="detail-content">
            <span className="detail-label">Insurance Provider</span>
            <span className="detail-value">Sunrise Health Assurance</span>
          </div>
        </div>
      </div>

      <button className="show-all-btn" type="button">
        Show All Information
      </button>
    </div>
  );
}

export default PatientCard;
