import { useState } from 'react';

function Create() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();

    return fetch('http://localhost:5500/api/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => res.json())

    .then((resJson) => {
      if (resJson.message === 'Utilisateur créé !') {
        sessionStorage.setItem('profil', JSON.stringify(resJson)); 
        window.location.href = './accueil';
      }
      else {
        alert("Erreur: Vérifier que l'utilisateur n'existe pas déja")
      }
    })

    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <form id="connectForm" onSubmit={login} action="">
      Créer un compte
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <input type="submit" value="Envoyer" />
    </form>
  );
}

export default Create;
