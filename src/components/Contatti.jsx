import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import Trash from 'bootstrap-icons/icons/trash.svg';
import Check from 'bootstrap-icons/icons/check2-square.svg';
import { Container, Table } from 'react-bootstrap';

function Contatti(props) {
  const firestoreRef = firebase.firestore().collection('contatti');
  const [nuovo, setNuovo] = useState({hidden: true, professione: {nome: '', badge: ''}, nome: '', numero: '', note: ''});
  const [aggiornamenti, setAggiornamenti] = useState(true);

  useEffect(() => {
    props.getContatti();
    console.count('richieste');
  }, [aggiornamenti]);

  if (props.auth === false) {
    return (
      <div className="container">
          <h1 style={{fontSize: '400px'}}>404</h1>
          <small className="text-muted">Pagina non trovata. Vai alla <Link to="/">homepage</Link>.</small>
      </div>
    );
  }

  props.contatti.sort(function(a,b) {
    if (a.professione.nome < b.professione.nome) {
      return -1;
    }
    if (a.professione.nome > b.professione.nome) {
      return 1;
    }
    return 0;
  });

  const deleteDoc = async (numero) => {
    if (window.confirm("Sei sicuro di voler eliminare questo contatto?") && props.auth === true) {
        const ref = await firestoreRef.where('numero', '==', numero).get();
        var el = ref.docs[0].id;
        await firestoreRef.doc(el).delete();
    }

    setAggiornamenti(!aggiornamenti);
}

  const rows = props.contatti.map((row, index) => { 
    var i = row;
    var ind = index;
    var tmp1 = 'https://api.whatsapp.com/send?phone=';
    var messaggio = tmp1.concat(i.numero);

    return (
      <tr key={ind}>
        <th scope="row"><span className={i.professione.badge}>{i.professione.nome}</span></th>
        <td>{i.nome}</td>
        <td>{i.note}</td>
        <td className="titolo" onClick={(e) => {e.preventDefault();window.open(messaggio,'_blank')}}>+{i.numero}</td>
        <td>
          <img className="pointer" src={Trash} alt="elimina" width="25" height="25" onClick={() => deleteDoc(i.numero)} />
        </td>
      </tr>
    )
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const badges = ['badge bg-primary', 'badge bg-secondary', 'badge bg-success', 'badge bg-danger', 'badge bg-dark', 'badge bg-warning', 'badge bg-info'];
    var badge = badges[Math.floor(Math.random() * 7)];

    if (nuovo.nome === '' || nuovo.numero === '' || nuovo.professione.nome === '') {
      alert('Compila tutti i campi.');
      return;
    }

    props.contatti.find((i) => {
      if (i.professione.nome === nuovo.professione.nome) { 
        badge = i.professione.badge;
        return;
      }
    });

    await firestoreRef.add({
      professione: {nome: nuovo.professione.nome, badge: badge},
      nome: nuovo.nome,
      numero: ('39'+nuovo.numero),
      note: nuovo.note
    });

    setNuovo({hidden: true, professione: {nome: '', badge: ''}, nome: '', numero: '', note: ''});
    setAggiornamenti(!aggiornamenti);
  }

  const table = () => {
    if (props.contatti.length !== 0) {
      return (
        <Table responsive>
          <thead>
            <tr>
              <th scope="col">PROFESSIONE</th>
              <th scope="col">NOME</th>
              <th scope="col">NOTE</th>
              <th scope="col">NUMERO</th>
              <th scope="col">AZIONI</th>
            </tr>
          </thead>
          <tbody>
            {rows}

            <tr key="CVo2iyogDmTLOdmS0cFH" hidden={nuovo.hidden}>
              <th scope="row"><input autoFocus value={nuovo.professione.nome} onChange={(e) => setNuovo({hidden: nuovo.hidden, professione: {nome: e.target.value, badge: nuovo.professione.badge}, nome: nuovo.nome, numero: nuovo.numero, note: nuovo.note})} type="text" className="form-control pass-input" placeholder="Professione" name="professione" required /></th>
              <td><input value={nuovo.nome} onChange={(e) => setNuovo({hidden: nuovo.hidden, professione: {nome: nuovo.professione.nome, badge: nuovo.professione.badge}, nome: e.target.value, numero: nuovo.numero, note: nuovo.note})} type="text" className="form-control pass-input" placeholder="Nome e cognome" name="nome" required /></td>
              <td><input value={nuovo.note} onChange={(e) => setNuovo({hidden: nuovo.hidden, professione: {nome: nuovo.professione.nome, badge: nuovo.professione.badge}, nome: nuovo.nome, numero: nuovo.numero, note: e.target.value})} type="text" className="form-control pass-input" placeholder="Note aggiuntive" name="note" /></td>
              <td><input value={nuovo.numero} onChange={(e) => setNuovo({hidden: nuovo.hidden, professione: {nome: nuovo.professione.nome, badge: nuovo.professione.badge}, nome: nuovo.nome, numero: e.target.value.toString(), note: nuovo.note})} type="number" className="form-control pass-input" placeholder="Numero di telefono" name="numero" required /></td>
              <td><img className="pointer" src={Check} alt="salva" width="25" height="25" onClick={(e) => handelSubmit(e)} /></td>
            </tr>
          </tbody>
        </Table>
      )
    } else {
      return (
        <div>
          <hr/>
          <h3>Tutto tace</h3>
          <small className="text-muted">Aggingi un contatto per iniziare.</small>
        </div>
      )
    }
  }

  return (
    <Container fluid>
      <h1 className="position-relative">
        Contatti
        <button className="btn btn-outline-dark destra" onClick={() => setNuovo({hidden: !nuovo.hidden, professione: {nome: nuovo.professione.nome, badge: nuovo.professione.badge}, nome: nuovo.nome, numero: nuovo.numero, note: nuovo.note})}>Nuovo</button>
      </h1>
      <small className="text-muted">Ecco i contatti condivisi del gas.</small>

      <br/><br/>

      {table()}

    </Container>
  );
}

export default Contatti;