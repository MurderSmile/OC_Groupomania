import { useState } from 'react';
import Connect from './connect';
import Create from './create';
import '../../index.css'

function Compte() {
  const [connectModel, setConnectModel] = useState(true);
  const [createModel, setCreateModel] = useState(false);

  const loginOrCreate = (e) => {
    if (e.target.id === 'connect') {
      setCreateModel(false);
      setConnectModel(true);
    }

    if (e.target.id === 'create') {
      setCreateModel(true);
      setConnectModel(false);
    }
  };

  return (
    <div id='compteMenu'>
      <div>
        <button id="connect" className= {connectModel && "activeBtn"} onClick={loginOrCreate}>
          Se connecter
        </button>
        <button id="create"  className= {createModel && "activeBtn"} onClick={loginOrCreate}>
          Créer un Compte
        </button>
      </div>
      <div>
        {connectModel && <Connect />}
        {createModel && <Create />}
      </div>
    </div>
  );
}

export default Compte;
