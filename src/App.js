import React, { useEffect, useState } from 'react';
import { login, handleAutentication, signUp, logOut } from './Auth/Auth';

import './App.css';

function App() {
  const [state, setState] = useState({
    name: false,
    picture: '',
    password_error: false,
  });

  useEffect(() => { handleAutentication(setState); }, []);

  const localUser = localStorage.getItem('user');

  return (
    <div className="App">
      <div>
        {
          state.name
            ? <div>
              <h2>{`Hi ${state.name}`}</h2>
              <img src={state.picture} width="100" />
            </div>
            : <div>Not session</div>
        }
      </div>
      <button type="button" onClick={() => {
        logOut(setState);
      }}>Log Out</button>
      <div style={{ marginBottom: '32px'}}>
        <div>
          <label>Email</label>
          <input type="text" id="email"></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password"></input>
        </div>
        <div>
          <label>Password Confirm</label>
          <input type="password" id="password2"></input>
        </div>
        <div>
          { state.password_error ? 'Password not match' : '' }
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              // In hard for example
              const email = document.querySelector('#email').value;
              const password = document.querySelector('#password').value;
              const password2 = document.querySelector('#password2').value;

              if (password === password2) {
                setState({ password_error: false });
                signUp({
                  email,
                  password,
                  setState,
                });
              } else {
                setState({ password_error: true });
              }
            }}  
          >
            SignUp
          </button>
        </div>
      </div>
      <div style={{ marginBottom: '32px'}}>
        <button type="button" onClick={() => {
          login({to: 'google-oauth2'});
        }}>
          Google
        </button>
      </div>
      <div>
        <button type="button" onClick={() => {
          login({to: 'twitter'});
        }}>
          Twitter
        </button>
      </div>
    </div>
  );
}

export default App;
