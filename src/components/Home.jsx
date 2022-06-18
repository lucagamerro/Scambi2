import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

function Home(props) {
  useEffect(() => {
    props.getAnnunci();
  }, []);

  props.annunci.sort(function(a,b) {
    var aComps = a.data.split("/");
    var bComps = b.data.split("/");
    var aDate = new Date(aComps[2], aComps[1], aComps[0]);
    var bDate = new Date(bComps[2], bComps[1], bComps[0]);
    return bDate.getTime() - aDate.getTime();
});

  const rows = props.annunci.map((row, index) => { 
    var i = row;
    var ind = index;

    var link = '/' + i.titolo;
    var badge = (i.categoria === 'Cerco') ? 'badge bg-primary' : 'badge bg-danger';

    return (
      <tr key={ind}>
        <th className="titolo" scope="row"><Link to={link} className="titolo" scope="row">{i.titolo}</Link></th>
        <td><span className={badge}>{i.categoria}</span></td>
        <td>{i.nome}</td>
        <td>{i.data}</td>
      </tr>
    )
  });

  const table = () => {
    if (props.annunci.length !== 0) {
      return (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">TITOLO</th>
                <th scope="col">CATEGORIA</th>
                <th scope="col">NOME</th>
                <th scope="col">DATA</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </>
      )
    } else {
      return (
        <div>
          <hr/>
          <h3>Tutto tace.</h3>
          <small className="text-muted">Aggingi un annuncio per iniziare</small>
        </div>
      )
    }
  }

  return (
    <div className="container">
      <h1 className="position-relative">
        Annunci
        <Link to="/new">
          <button className="btn btn-outline-dark destra">Nuovo</button>
        </Link>
      </h1>
      <small className="text-muted">Ecco gli annunci attualmente attivi.</small>

      <br /><br />

      {table()}

    </div>
  );
}

export default Home;