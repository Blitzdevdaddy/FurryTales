import React, { useState } from 'react';
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleApi = () => {
    const url = 'http://localhost:4000/login';
    const data = { username, password };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            window.location.href = '/'; // Redirect to home page after successful login
          }
        }
      })
      .catch((err) => {
        alert('SERVER ERR');
      });
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Remember me" />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4 btn-danger btn-outline-warning text-light" onClick={handleApi}>
        Log In
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </MDBContainer>
  );
}


export default Login;
