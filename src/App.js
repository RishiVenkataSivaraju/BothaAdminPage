import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import axios from "axios"

const firebaseConfig = {
  apiKey: "AIzaSyBNCF_vVfUAoZ-QcDdijQGumzPsmDgQFUQ",
  authDomain: "bothasoft.firebaseapp.com",
  projectId: "bothasoft",
  storageBucket: "bothasoft.appspot.com",
  messagingSenderId: "1032336322144",
  appId: "1:1032336322144:web:5d5983426fe5f23a76dd05"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const VerifyPage = () => {
  const useDocumentTitle = (title) => {
    useEffect(() => {
      document.title = title;
    }, [title]);
  };
  useDocumentTitle("AdminPage")
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  // const [captchaVerify, setCapthaVerification] = useState();
  const handleVerify = async () => {
    const adminData = {
      username: username,
      password: password
    };
    console.log(adminData)
    const response = await axios.get(`http://localhost:8080/api/admin/verify/${adminData.username}`)
    console.log(response.data)
    if (response.data === "") {
      setVerificationStatus('Incorrect Username or Password Given');
    } else if (adminData.password === response.data.password) {
      setPhoneNumber(response.data.mobile)
      setVerificationStatus('Verified');
      setUsername('');
      setPassword('');
    } else {
      setVerificationStatus('Incorrect Username or Password Given');
    }
  };
  const handleSendOtp = async () => {
    try {
      const fullPhoneNumber = `+${91}${phoneNumber}`;
      const confirmation = await auth.signInWithPhoneNumber(fullPhoneNumber, new firebase.auth.RecaptchaVerifier('recaptcha-container'));
      setVerificationId(confirmation.verificationId);
      setIsCodeSent(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      await auth.signInWithCredential(credential);
      setVerificationSuccess(true);
      console.log('OTP verification successful!');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };
  const handleModalClose = () => {
    setVerificationSuccess(false);
  };


  return (
    <div style={styles.container}>
      {verificationStatus === 'Verified' ? (
        <div className="otp-verification-container" style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '15px 0' }}>OTP Verification</h1>
          <div className="form-group" style={{ margin: '15px' }}>
            <button onClick={handleSendOtp} disabled={isCodeSent} style={{ padding: '10px', backgroundColor: 'blue', color: '#fff', border: 'none' }}>
              {isCodeSent ? 'Code Sent' : 'Send OTP'}
            </button>
          </div>
          {isCodeSent && (
            <div className="form-group" style={{ margin: '15px' }}>
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{ margin: '15px', padding: '5px' }}
              />
              <div>
                <button onClick={handleVerifyOtp} style={{ padding: '10px', backgroundColor: 'blue', color: '#fff', border: 'none' }}>Verify OTP</button>
              </div>

            </div>
          )}
          {error && <p className="error-message" style={{ color: 'red', margin: '15px' }}>{error}</p>}
          <div className="captcha-container" style={{ margin: '15px', paddingLeft: "36%" }}>
            <div id="recaptcha-container"></div>
          </div>
          {/* Verification Success Modal */}
          {verificationSuccess && (
            <div className="modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
                <h2>Verification Successful</h2>
                <p>Your OTP has been verified.</p>
                <button onClick={handleModalClose}>Close</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <h2>Verify Page</h2>
          <div style={styles.inputContainer}>
            <label htmlFor="username" style={styles.label}>Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button onClick={handleVerify} style={styles.button}>Verify</button>
          {verificationStatus && <p style={styles.error}>{verificationStatus}</p>}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px'
  },
  inputContainer: {
    marginBottom: '10px'
  },
  label: {
    marginRight: '10px'
  },
  input: {
    padding: '5px',
    borderRadius: '5px'
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    border: 'none',
    marginTop: '10px'
  },
  error: {
    color: 'red'
  },
  blankPage: {
    marginTop: '20px'
  }
};

export default VerifyPage;
