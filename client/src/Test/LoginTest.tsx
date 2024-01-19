import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";

function LoginTest() {
  
  return (
    <GoogleLogin
      onSuccess={(credentialResponse:any) => {
        
        const token = credentialResponse.credential;
        const decoded = jwtDecode(token);
        console.log(decoded);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    />
  )
}

export default LoginTest