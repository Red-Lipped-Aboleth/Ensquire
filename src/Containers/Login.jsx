import React from 'react'
import App from '../App'

function Login() {
  const [state, setState] = React.useState(0);
  function loginFunction() {
    const loginCreds = {
      username: document.querySelector('#login_username').value,
      password: document.querySelector('#login_password').value
    }
    fetch('/auth/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginCreds),
    })
    .then(data => data.json())
    .then(parsedData => {
        if (parsedData.success) {
          sessionStorage.setItem("token", parsedData.token);
          sessionStorage.setItem("username", loginCreds.username);
          setState(2);
        } else {
          throw new Error('Unsuccessful login.')
        }
        
    })
    .catch((error) => {
      console.log(`Error sending login creds! Error: ${error}`)
    })
  }

  function signupFunction() {
    const signupDetails = {
        first_name: document.querySelector('#signup_first_name').value,
        last_name: document.querySelector('#signup_last_name').value,
        email: document.querySelector('#signup_email').value,
        username: document.querySelector('#signup_username').value,
        password: document.querySelector('#signup_password').value,
    }

    fetch('/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupDetails),
      //   redirect:
      })
      .then(data => data.json())
      .then(parsedData => {
        sessionStorage.setItem = ("token", parsedData.token);
      })
      .catch((error) => {
        console.log(`Error sending login creds! Error: ${error}`);
      })
  }

  const login = (
    <div>
      <div>
        <input type="text" id='login_username' placeholder='Username'/>
        <input type="password" id='login_password' placeholder='Password'/>
        <button type="button" id="login_submit" onClick={loginFunction}>Login</button>
      </div>
    </div>
  );

  const signup = (
    <div>
      <input type="text" id="signup_first_name" placeholder="First Name" />
      <input type="text" id="signup_last_name" placeholder="Last Name" />
      <input type="text" id="signup_email" placeholder="E-mail address" />
      <input type="text" id="signup_username" placeholder="Username" />
      <input type="text" id="signup_password" placeholder="Password" />
      <button type="button" id="signup_submit" onClick={() => setState(0)}>Submit</button>
    </div>
  );
  
  const textOut = (state === 0) ? 'Sign up' : 'Log in';
  // const out = (state === 0) ? login : signup;

  let out = () => {
    if (state === 2 || (sessionStorage.token !== undefined)) return <App />;
    if (state === 0) return login;
    if (state === 1) return signup;
  }
  function switchState() {
    setState((state === 0) ? 1 : 0);
  }

  return (
    <div>
      {out()}
    </div>
  )
}

export default Login;