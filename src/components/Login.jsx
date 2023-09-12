import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function Login(props) {
  const [password, setPassword] = useState('');
  const [buttonClass, setButtonClass] = useState('btn btn-outline-dark');

  const login = (e) => {
    e.preventDefault();

    if (password === 'rivoli') {
      setButtonClass('btn btn-outline-success');
      props.setAuth(true);
    } else {
      setButtonClass('btn btn-outline-danger');
      props.setAuth(false);
    }
  }

  return (
    <Container fluid>

      <h1>Login</h1>

      <br/>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control pass-input" autoFocus placeholder="Inserisci la password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={buttonClass} onClick={login}>Login</button>
      </form>
    </Container>
  );
}

export default Login;
