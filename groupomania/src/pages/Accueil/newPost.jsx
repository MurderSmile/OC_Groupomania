import { useState } from "react";
import axios from "axios";

////// NON utilisé ////////
    //const [picture, setPicture] = useState(null);


    /*const handlePicture = (e) => {
      //setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    };*/


    //let FormData = require('form-data');
//////////////////////////

////////// Création et envoi d'un post //////////

function NewPost() {

  /////  Récupération du profil   //
    const profil = JSON.parse(sessionStorage.getItem('profil'))

  /////  Récupération du nom de l'autheur  //
    const author = sessionStorage.getItem('name');

  /////  Gestion text  //
    const [text, setText] = useState();

  ////   Gestion fichier image //
    const [file, setFile] = useState();

  ////   Gestion Date
    const date = new Date().toLocaleDateString()

  ////   Gestion Heure  //
    const time = new Date().toLocaleTimeString()


  ////   Création du FormData  //
    let data = new FormData()
      data.append("author", author)
      data.append("text" , text)
      data.append("file", file)
      data.append("date", date)
      data.append("time", time)


    const CreatePost = (e) => {
      e.preventDefault();

      /*return axios({
        method: "POST",
        url: "http://localhost:5500/api/posts/",
        data: data,
        headers: {
          'Authorization': `Bearer ${profil.token}`,
          'Content-Type': 'multipart/form-data'},
      })*/

      return fetch('http://localhost:5500/api/posts/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${profil.token}`,
          'Accept': '*/*', //'multipart/form-data',
          'Content-Type': '*/*', // /*'application/json',*/ 'multipart/form-data; boundary=something',
        },
        body: data
        //body: JSON.stringify({author, text, date, time, file}),
      })

      .then((res) => res.json())

      .then((resJson) => {
        console.log(resJson);  
        console.log(...data);
        //window.location.reload()
      })

      .catch((error) => {
        console.log(error);
      });
    };

    const Reinitialiser = () =>{
      setFile(null)
      document.getElementById("createPostPicture").value = null

      setText(null)
      document.getElementById("createPostContenu").value = null
    }

    return (
      <form id="createPost">
        <label htmlFor="createPostPicture">Image</label>
        <br />
        <input
          type="file"
          name="createPostPicture"
          id="createPostPicture"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />

        <label htmlFor="createPostContenu">Contenu</label>
        <br />
        <textarea
          name="createPostContenu"
          id="createPostContenu"
          placeholder="écrivez votre message"
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <br />
        
        <div id="createPostInteractions">
          <button id="createPostInteractionsSubmit" type="button" onClick={CreatePost}>Envoyer le post</button>
          <button id="createPostInteractionsNull" type="button" onClick={()=>{Reinitialiser()}}>Réinitialiser</button>
        </div>
        
      </form>
    );
  }

export default NewPost
////////// Création et envoi d'un post //////////