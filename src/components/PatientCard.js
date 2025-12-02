import { formatDate } from '../utils/helpers';

function PatientCard({ patient }) {
  return (
    <div className="patient-card">
      <div className="patient-profile-section">
        <div className="profile-image">
          <img 
            src="/images/JT.png" 
            srcSet="/images/JT.png 1x, /images/JT2@2x.png 2x"
            alt={patient.name || 'Jessica Taylor'} 
            className="profile-photo"
          />
        </div>
        <h2 className="patient-name-main">{patient.name || 'Jessica Taylor'}</h2>
      </div>

      <div className="patient-details-list">
        <div className="detail-item">
          <img src="/images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg" alt="Calendar" className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Date Of Birth</span>
            <span className="detail-value">{formatDate(patient.date_of_birth) || 'August 23, 1996'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-content">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{patient.gender || 'Female'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-content">
            <span className="detail-label">Contact Info.</span>
            <span className="detail-value">{patient.phone_number || '(415) 555-1234'}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-content">
            <span className="detail-label">Emergency Contacts</span>
            <span className="detail-value">(415) 555-5678</span>
          </div>
        </div>

        <div className="detail-item">
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

