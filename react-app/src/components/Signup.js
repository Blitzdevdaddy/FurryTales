import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn
}
from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import axios from "axios"

function Signup() {

    const [username, setusername] = useState('');
    const [ password, setpassword] = useState('');


    const handleApi = () => {
        console.log(username, password);
        const url ='http://localhost:4000/signup';
        const data ={username, password};
        axios.post(url, data)
        .then((res) => {
            console.log(res.data)
            if(res.data.message){
                alert(res.data.message)
            }
        })
        .catch((err) =>{
            console.log(err)
            alert('Server err')
            })
    }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={username}
       onChange={(e) => { setusername(e.target.value)}} />
      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password}
       onChange={(e) => setpassword(e.target.value)} />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4 btn-danger btn-outline-warning text-light" onClick={handleApi} >Sign up</MDBBtn>

      <div className="text-center">
        <p>Already a member? <Link to="/login" > Login </Link> </p>

      </div>

    </MDBContainer>
  );
}

export default Signup;