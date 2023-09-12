import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from './firebase';

import Contatti from './components/Contatti';
import NavbarSito from './components/NavbarSito';
import Login from './components/Login';
import View from './components/View';
import Home from './components/Home';
import New from './components/New';
import './style.css';
import { Container } from 'react-bootstrap';


function App() {
  const refAnnunci = firebase.firestore().collection('annunci');
  const refContatti = firebase.firestore().collection('contatti');


  const [auth, setAuth] = useState(false);
  const [annunci, setAnnunci] = useState([]);
  const [contatti, setContatti] = useState([]);

  const getAnnunci = async () =>  {
    refAnnunci.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setAnnunci(items.reverse());
    });
  }

  const getContatti = async () =>  {
    refContatti.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setContatti(items);
    });
  }

  return (
    <Container fluid>
      <Router>
        <NavbarSito auth={auth} setAuth={setAuth} />
        <Switch>
          <Route exact path="/">
            {auth ? <Home getAnnunci={getAnnunci} annunci={annunci} /> : <Login setAuth={setAuth} />}
          </Route>
          
          <Route exact path="/nuovo">
            <New auth={auth} />
          </Route>

          <Route exact path="/contatti">
            <Contatti getContatti={getContatti} contatti={contatti} auth={auth} />
          </Route>

          <Route path="/:id">
            <View annunci={annunci} auth={auth} />
          </Route>

        </Switch>

        <small className="fixed-bottom text-muted" style={{marginLeft: '10px'}}>
          <a href="https://scarica-scambi.surge.sh/" target="_blanck">Scarica l'app</a> • created by <a href="https://github.com/lucagamerro/Scambi2" target="_blank" rel="noreferrer">@lucagamerro</a>
        </small>
      </Router>
    </Container>
  )
}

export default App;
