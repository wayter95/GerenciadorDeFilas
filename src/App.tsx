import React, { useState, useEffect } from 'react';

import soundFile from './assets/audios/alert.mp3';

import './Global.css';
import './App.css';

function App() {

  //hooks para controle
  const [away, setAway] = useState(true);

  const [pref, setPref] = useState([
    { id: 0, senha: '' },
  ]);
  const [norm, setNorm] = useState([
    { id: 0, senha: '' },
  ]);
  const [attendance, setAttendance] = useState(
    {queue:'', senha:''}
  )

  //Adicinar Ticket preferencial
  function queuPref() {
    const countPref = pref.length - 1;
    const id = countPref + 1;
    setPref([
      ...pref,
      { id, senha: 'P_0' + id }
    ])
  }
  //Adicinar Ticket sem preferencia
  function queuNorm() {
    const countNorm = norm.length - 1;
    const id = countNorm + 1;
    setNorm([
      ...norm,
      { id, senha: 'N_0' + id }
    ])
  }

  //Sistema iniciar Pausado
  useEffect(() => {
    if(pref.length <= 1 && norm.length <= 1) {
      setAway(false);
    }
  },[])

  //Alerta sonoro
  function soundAlert() {
    if (away === true) {
      const audioFile = new Audio(soundFile);
      audioFile.play();
    }
  }

  //Chamando ticket
  function callTicket(){
    if(away === true){
      soundAlert();

      if(pref.length <= 1 && norm.length > 2){
        setAttendance({queue:'N', senha: norm[1].senha});
        norm.splice(1,1);
      }else{
        setAttendance({queue:'P', senha: pref[1].senha});
        pref.splice(1,1);
      }
    }
    else{
      alert('Sistema Pausado ou nenhuma senha foi retirada!')
    }
  }
  
  return (
    <div id="page-row">
      <header>
        <h1>Gerenciador de filas</h1>
        {
          away === true &&
          <h2>Atendimento Normal</h2>
        }
        {
          away === false &&
          <h2>Atendimento Pausado</h2>
        }
      </header>
      <main>
        <div className="rows-content">
          <h1>FILAS</h1>
          <div className="pref">
            <label>Preferencial</label>
            <ul>
              {
                pref.length === 1 &&
                <p>Nenhuma Senha Criada</p>
              }
              {
                pref.map(p => {
                  return (
                    <li key={p.id}>
                      {p.senha}
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="norm">
            <label>Normal</label>
            <ul>
              {
                norm.length === 1 &&
                <p>Nenhuma Senha Criada</p>
              }
              {
                norm.map(n => {
                  return (
                    <li key={n.id}>
                      {n.senha}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="attendance">
          <h1>Em Atendimento:</h1>
          <div className="titles">
            <label>FILA</label>
            <label>SENHA</label>
            <label>GUICHÊ</label>
          </div>
          <div className="person">
            <label>{attendance.queue}</label>
            <label>{attendance.senha}</label>
            <label>1</label>
          </div>
          <div className="buttons">
            <button type="button" onClick={callTicket}>Chamar</button>
            <button type="button" onClick={soundAlert}>Repete</button>
            <button type="button" onClick={() => setAway(!away)}>
              {
                away === true &&
                <p>Ausente</p>
              }
              {
                away === false &&
                <p>Iniciar</p>
              }
            </button>
          </div>
        </div>
      </main>
      <footer>
        <h1>Gerar senha:</h1>
        <button type="button" onClick={queuPref}>Preferencial</button>
        <button type="button" onClick={queuNorm}>Normal</button>
      </footer>

    </div>
  );
}

export default App;
