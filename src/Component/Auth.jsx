import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Auth() {
  const navigate = useNavigate();
  
  // App view matrices: 'login' | 'signup' | 'otp'
  const [authMode, setAuthMode] = useState('login');
  
  // Data payload capture definitions
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  // Validates standard metrics before dispatching OTP requests
  const handleRequestOTP = (e) => {
    e.preventDefault();
    
    if (authMode === 'signup' && !formData.name.trim()) {
      setErrorMessage('Please enter your full name to register.');
      return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setLoading(true);
    
    // Simulating API network latency delay for SMS dispatching
    setTimeout(() => {
      setLoading(false);
      setAuthMode('otp');
      console.log(`OTP Token generated and dispatched via SMS engine safely to: +91 ${formData.phone}`);
    }, 1000);
  };

  // Verifies simulated OTP inputs and triggers navigation sequences
  const handleVerifyAuth = (e) => {
    e.preventDefault();
    
    if (formData.otp.length !== 4) {
      setErrorMessage('Please enter the 4-digit verification code.');
      return;
    }

    setLoading(true);

    // Simulating gateway verification handshakes
    setTimeout(() => {
      setLoading(false);
      if (formData.otp === '1234') { // Simulated bypass fallback pass-token
        console.log('Authentication authorization confirmed. Injecting pipeline routing sync...');
        navigate('/');
      } else {
        setErrorMessage('Invalid confirmation code. Try fallback token "1234" to test bypass.');
      }
    }, 1200);
  };

  // Resets state maps when toggling between login and signup modes
  const switchAuthMode = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setFormData({ name: '', phone: '', otp: '' });
  };

  return (
    <div className="auth-viewport">
      <div className="auth-glass-container">
        
        {/* Brand Banner Identity */}
        <div className="auth-brand-header">
          <span className="auth-bolt-icon">⚡</span>
          <h2 className="auth-brand-text">DEBATE<span className="auth-gradient-purple">HUB</span></h2>
          <p className="auth-brand-subtitle">India's Fastest Opinion & Prediction Platform</p>
        </div>

        {errorMessage && (
          <div className="auth-error-banner">
            <span>⚠️</span> {errorMessage}
          </div>
        )}

        {/* Dynamic Context Form Processor */}
        {authMode !== 'otp' ? (
          <form onSubmit={handleRequestOTP} className="auth-form-matrix">
            
            <h3 className="auth-stage-title">
              {authMode === 'login' ? 'Welcome Back' : 'Create Premium Account'}
            </h3>
            
            {/* Conditional Input Generation Layer for New Registrations */}
            {authMode === 'signup' && (
              <div className="auth-input-group">
                <label className="auth-input-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="auth-text-field"
                  autoComplete="off"
                />
              </div>
            )}

            <div className="auth-input-group">
              <label className="auth-input-label">Phone Number</label>
              <div className="auth-phone-field-wrapper">
                <span className="auth-country-prefix">+91</span>
                <input 
                  type="tel" 
                  name="phone"
                  maxLength="10"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="auth-text-field phone-input-inset"
                  autoComplete="off"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="auth-action-submit-btn">
              {loading ? 'DISPATCHING SMS...' : 'GET OTP CODE'}
            </button>

            {/* Form Structural Toggle Switches */}
            <div className="auth-mode-switch-footer">
              {authMode === 'login' ? (
                <p>New to DebateHub? <span onClick={() => switchAuthMode('signup')}>Sign Up Now</span></p>
              ) : (
                <p>Already registered? <span onClick={() => switchAuthMode('login')}>Log In</span></p>
              )}
            </div>

          </form>
        ) : (
          <form onSubmit={handleVerifyAuth} className="auth-form-matrix">
            
            <h3 className="auth-stage-title">Verify Code</h3>
            <p className="auth-otp-notice">We've sent a 4-digit verification code to <br /> <strong>+91 {formData.phone}</strong></p>

            <div className="auth-input-group center-content">
              <label className="auth-input-label">Enter 4-Digit OTP</label>
              <input 
                type="text" 
                name="otp"
                maxLength="4"
                placeholder="0 0 0 0"
                value={formData.otp}
                onChange={handleInputChange}
                className="auth-text-field otp-center-field"
                autoComplete="off"
              />
            </div>

            <button type="submit" disabled={loading} className="auth-action-submit-btn verification-accent-btn">
              {loading ? 'VERIFYING TRANSACTIONS...' : 'CONFIRM & ENTER ARENA'}
            </button>

            <div className="auth-mode-switch-footer">
              <p>Wrong number details? <span onClick={() => switchAuthMode('login')}>Go Back</span></p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}