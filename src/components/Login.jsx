import React, { useState } from 'react';

function Login(props) {
  const [password, setPassword] = useState('');
  const [buttonClass, setButtonClass] = useState('btn btn-outline-light');

  const login = (e) => {
    e.preventDefault();

    if (password === password) {
      setButtonClass('btn btn-primary');
      props.setAuth(true);
    } else {
      setButtonClass('btn btn-danger');
      props.setAuth(false);
    }
  }

  return (
    <div className="container">

      <h1>Login</h1>

      <br/>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control pass-input" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className={buttonClass} onClick={login}>Login</button>
      </form>
    </div>
  );
}

export default Login;
