import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from './firebase';

import Navbar from './components/Navbar';
import Login from './components/Login';
import View from './components/View';
import Home from './components/Home';
import New from './components/New';
import './style.css';


function App() {
  const ref = firebase.firestore().collection('annunci');

  const [auth, setAuth] = useState(false);
  const [annunci, setAnnunci] = useState([]);

  const getAnnunci = async () =>  {
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setAnnunci(items.reverse());
    });
  }  

  return (
    <div className="container-fluid">
      <Router>
        <Navbar auth={auth} setAuth={setAuth} />
        <Switch>
          <Route exact path="/">
            {auth ? <Home getAnnunci={getAnnunci} annunci={annunci} /> : <Login setAuth={setAuth} />}
          </Route>
          
          <Route exact path="/new">
            <New auth={auth} />
          </Route>

          <Route path="/:id">
            <View annunci={annunci} auth={auth} />
          </Route>

        </Switch>

        <small className="fixed-bottom text-muted" style={{marginLeft: '10px'}}>
        <a href="https://scarica-scambi.surge.sh/" target="_blanck">Scarica l'app</a> • created by <a href="https://github.com/lucagamerro/Scambi2" target="_blank" rel="noreferrer">@lucagamerro</a>
        </small>
      </Router>
    </div>
  )
}

export default App;
