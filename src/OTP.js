
// import React, { useState } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyBNCF_vVfUAoZ-QcDdijQGumzPsmDgQFUQ",
//   authDomain: "bothasoft.firebaseapp.com",
//   projectId: "bothasoft",
//   storageBucket: "bothasoft.appspot.com",
//   messagingSenderId: "1032336322144",
//   appId: "1:1032336322144:web:5d5983426fe5f23a76dd05"
// };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// const OTPVerification = () => {
//   // const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [isCodeSent, setIsCodeSent] = useState(false);
//   const [verificationSuccess, setVerificationSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleSendOtp = async () => {
//     try {
//       const fullPhoneNumber = `+${91}${9014595124}`;
//       const confirmation = await auth.signInWithPhoneNumber(fullPhoneNumber, new firebase.auth.RecaptchaVerifier('recaptcha-container'));
//       setVerificationId(confirmation.verificationId);
//       setIsCodeSent(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
//       await auth.signInWithCredential(credential);
//       setVerificationSuccess(true);
//       console.log('OTP verification successful!');
//     } catch (error) {
//       setError('Invalid OTP. Please try again.');
//     }
//   };
//   const handleModalClose = () => {
//     setVerificationSuccess(false); 
//   };

//   return (
   
//   );
// };

// export default OTPVerification;
// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyBNCF_vVfUAoZ-QcDdijQGumzPsmDgQFUQ",
//   authDomain: "bothasoft.firebaseapp.com",
//   projectId: "bothasoft",
//   storageBucket: "bothasoft.appspot.com",
//   messagingSenderId: "1032336322144",
//   appId: "1:1032336322144:web:5d5983426fe5f23a76dd05"
// };

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();

// const OTPVerification = () => {
//   // const [phoneNumber, setPhoneNumber] = useState('+919014595124'); // Default phone number
//   const [otp, setOtp] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [isCodeSent, setIsCodeSent] = useState(false);
//   const [verificationSuccess, setVerificationSuccess] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//     recaptchaVerifier.render().then(widgetId => {
//       recaptchaVerifier.verify().then(() => {
//         console.log('Captcha verification successful!');
//       });
//     });
//   }, []);

//   const handleSendOtp = async () => {
//     try {
//       const fullPhoneNumber = `+${91}${9014595124}`;
//       const confirmation = await auth.signInWithPhoneNumber(fullPhoneNumber);
//       setVerificationId(confirmation.verificationId);
//       setIsCodeSent(true);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
//       await auth.signInWithCredential(credential);
//       setVerificationSuccess(true);
//       console.log('OTP verification successful!');
//     } catch (error) {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   const handleModalClose = () => {
//     setVerificationSuccess(false);
//   };

//   return (
//     <div className="otp-verification-container" style={{ textAlign: 'center' }}>
//       <h1 style={{ margin: '15px 0' }}>OTP Verification</h1>
//       {isCodeSent ? (
//         <div className="form-group" style={{ margin: '15px' }}>
//           <label htmlFor="otp">Enter OTP:</label>
//           <input
//             type="text"
//             id="otp"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             style={{ margin: '15px', padding: '5px' }}
//           />
//           <div>
//             <button onClick={handleVerifyOtp} style={{ padding: '10px', backgroundColor: 'blue', color: '#fff', border: 'none' }}>Verify OTP</button>
//           </div>
//         </div>
//       ) : (
//         <div className="form-group" style={{ margin: '15px' }}>
//           <button onClick={handleSendOtp} disabled={isCodeSent} style={{ padding: '10px', backgroundColor: 'blue', color: '#fff', border: 'none' }}>
//             {isCodeSent ? 'Code Sent' : 'Send OTP'}
//           </button>
//         </div>
//       )}
//       {error && <p className="error-message" style={{ color: 'red', margin: '15px' }}>{error}</p>}
//       <div className="captcha-container" style={{ margin: '15px', paddingLeft: "36%" }}>
//         <div id="recaptcha-container"></div>
//       </div>
//       {/* Verification Success Modal */}
//       {verificationSuccess && (
//         <div className="modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
//             <h2>Verification Successful</h2>
//             <p>Your OTP has been verified.</p>
//             <button onClick={handleModalClose}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OTPVerification;
