import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import firebase from '../firebase';
import emailjs from 'emailjs-com';

function About(props) {
  const firestoreRef = firebase.firestore().collection('annunci');
  var history = useHistory();

  const [categoria, setCategoria] = useState('• Richiedo qualcosa');
  const [titolo, setTitolo] = useState('');
  const [nome, setNome] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [testo, setTesto] = useState('');
  const [fileUrl, setFileUrl] = useState([]);
  const [status, setStatus] = useState(false);

  var categoriaTMP;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  var data = dd + '/' + mm + '/' + yyyy;

  if (props.auth === false) {
    return (
      <div className="container">
          <h1 style={{fontSize: '400px'}}>404</h1>
          <small className="text-muted">Pagina non trovata. Vai alla <Link to="/">homepage</Link>.</small>
      </div>
    );
  }

  const loader = () => {
    return (
      <div className="spinner-border m-1">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const uploadFile = async (e) => {
    setStatus(true);

    const storageRef = firebase.storage().ref();
    var links = [];

    for (let i = 0; i !== e.target.files.length; i++) {
      const fileTmp = await e.target.files[i];
      const fileRef = storageRef.child(fileTmp.name);
      await fileRef.put(fileTmp);

      links.push(await fileRef.getDownloadURL());
    }

    setFileUrl(links);

    setStatus(false);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    (categoria === '• Richiedo qualcosa') ? categoriaTMP = 'Cerco' : categoriaTMP = 'Offro';

    const link = 'scambi.surge.sh/';
    //emailjs.send('service_phxn0gj', 'template_shxlnrm',{
    //  titolo: titolo,
    //  testo: testo,
    //  link: link,
    //  to: 'gasquemais@googlegroups.com',
    //}, 'user_STmZslqigOUQfVm5dxubE');

    await firestoreRef.add({
      categoria: categoriaTMP,
      data: data,
      nome: nome,
      numero: telefono,
      testo: testo,
      titolo: titolo,
      foto: fileUrl
    });

    setCategoria('• Richiedo qualcosa');
    setTitolo('');
    setEmail('');
    setTelefono('');
    setTesto('');
    setNome('');

    await history.push('/');
  }

  return (
    <div className="container">
      <h1>
        Crea un nuovo annuncio
      </h1>
      <h6 className="lead">
        Completa il segnunte form per aggiungere un nuovo annuncio. 
      </h6> 

      <br/>

      <div className="jumbotron">
      <form action="inviato.php" method="POST" encType="multipart/form-data">

          <div className="form-group">
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} multiple="" className="form-control pass-input" id="exampleSelect2" name="categoria" row="2">
                <option>&bull;  Richiedo qualcosa</option>
                <option>&bull;  Offro qualcosa</option>
            </select>
          </div>

          <br/>

          <div className="form-group">
            <input value={titolo} onChange={(e) => setTitolo(e.target.value)} type="text" className="form-control pass-input" placeholder="Titolo annuncio" name="titolo" />
          </div>

          <br/>

          <div className="form-group">
            <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control pass-input" placeholder="Nome e cognome" name="nome" />
          </div>

          <br/>

          <div className="form-group">
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} type="number" className="form-control pass-input" placeholder="Numero di telefono" name="telefono" />
          </div>

          <br/>

          <div className="form-group">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control pass-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Indirizzo email" name="email" />
          </div>

          <br/>

          <div className="form-group">
            <textarea value={testo} onChange={(e) => setTesto(e.target.value)} className="form-control pass-input" id="exampleTextarea" rows="4" placeholder="Testo dell'annuncio" name="testo"></textarea>
          </div>

          <br/>

          <div className="form-group">
            <label htmlFor="exampleInputFile">Carica una foto: </label>
            <br/>
            <input type="file" onChange={uploadFile} className="form-control fileToUpload pass-input mt-2" id="fileToUpload" aria-describedby="fileHelp" name="fileToUpload" multiple />
            <br/>
            {status ? loader() : <br/>}
          </div>

          <br/>

          <button type="submit" className="btn btn-outline-dark" value="Invia" onClick={handelSubmit}>Invia</button>
          
          <br/><br/><br/><br/><br/><br/>
      </form>
      </div>
    </div>
  );
}

export default About;