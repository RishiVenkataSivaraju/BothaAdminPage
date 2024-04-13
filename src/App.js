import React, { useState } from 'react';
import axios from "axios"

const VerifyPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [data, setData] = useState(null);

  const handleVerify = async () => {
    const adminData = {
      username: username,
      password: password
    };
    const response = await axios.get(`http://localhost:8080/api/admin/verify/${adminData.username}`)
    console.log(response.data)
    console.log(adminData.username)
    if (response.data === "") {
      console.log("Incorrect Username or Password Given");
    } else if (adminData.password === response.data.password) {
      console.log("Verified");
    } else {
      console.log("Incorrect Username or Password Given");
    }

    // setData(userData);
  };

  return (
    <div style={styles.container}>
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
      {/* {data && (
        <div style={styles.userData}>
          <h3>Entered Data:</h3>
          <p>Username: {data.username}</p>
          <p>Password: {data.password}</p>
        </div>
      )} */}
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
    border: 'none'
  },
  userData: {
    marginTop: '20px'
  }
};

export default VerifyPage;

