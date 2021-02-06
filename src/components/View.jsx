import React from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import firebase from '../firebase';

function View(props) {
    const firestoreRef = firebase.firestore().collection('annunci');
    var history = useHistory();
    var { id } = useParams();
    var annuncio, messaggio, email;

    props.annunci.filter(obj => {
        if (obj.titolo === id) {
            annuncio = obj;
        }
    });

    if (annuncio === undefined || props.auth === false) {
        return (
            <div className="container">
                <h1 style={{fontSize: '400px'}}>404</h1>
                <small className="text-muted">Pagina non trovata. Vai alla <Link to="/">homepage</Link>.</small>
            </div>
        );
    }

    var tmp1 = 'https://api.whatsapp.com/send?phone=';
    messaggio = tmp1.concat(annuncio.numero);
    var badge = (annuncio.categoria === 'Cerco') ? 'badge bg-primary' : 'badge bg-danger';
    var tmp2 = 'mailto:';
    email = tmp2.concat(annuncio.email);

    const loadImages = () => {
        var photos = [];

        for (let i = 0; i < annuncio.foto.length; i++) {
            photos.push(<img key={i} src={annuncio.foto[i]} alt="Website couldn't upload the photo" />);
        }

        return(photos);
    }

    const deleteDoc = async () => {
        if (window.confirm("Sei sicuro di voler eliminare l'annuncio?") && props.auth === true) {
            const ref = await firestoreRef.where('titolo', '==', annuncio.titolo).get();
            var el = ref.docs[0].id;
            await firestoreRef.doc(el).delete();
    
            history.push('/');
        }
    }

    return (
        <div className="container">
            <h1>{annuncio.titolo}</h1>
            <small className="text-muted">{annuncio.nome}, {annuncio.data}</small>
            <br/>
            <small className="text-muted">
                <span className={badge}>{annuncio.categoria}</span>
            </small>

            <br/>

            <hr/>
            <p>{annuncio.testo}</p>

            <br/>

            {loadImages()}

            <br/><br/>

            <button className="btn btn-outline-light ms-2" onClick={() => window.open(messaggio,'_blank')}>Manda un messaggio</button>
            <button className="btn btn-outline-light ms-2" onClick={() => window.open(email)}>Contatta via mail</button>
            <button className="btn btn-outline-light ms-2" onClick={deleteDoc}>Elimina l'annuncio</button>
            <div className='delete-button' onClick={deleteDoc} />

            <hr/>

               
        </div>
    );
}

export default View;