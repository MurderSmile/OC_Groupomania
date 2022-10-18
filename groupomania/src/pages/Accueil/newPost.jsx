import { useState } from "react";

////////// Création et envoi d'un post //////////

function NewPost() {

  /////  Récupération du profil   //
  const profil = JSON.parse(sessionStorage.getItem('profil'))

  /////  Gestion text  //
  const [text, setText] = useState();

  ////   Gestion fichier image //
  const [file, setFile] = useState();

  ////   Gestion Date
  const date = new Date().toLocaleDateString()

  ////   Gestion Heure  //
  const time = new Date().toLocaleTimeString()


  ////   Création du FormData  //
    const data = new FormData()
      data.append("author", profil.name)
      data.append("text" , text)
      data.append("fileImage", file)
      data.append("date", date)
      data.append("time", time)


    const CreatePost = () => {
       
      fetch('http://localhost:5500/api/posts/', {
        method: 'POST',
        headers: {'Authorization': `Bearer ${profil.token}`,},
        body: data
      })

      .then((res) => res.json())

      .then((resJson) => {
        window.location.reload()
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
          <button id="createPostInteractionsSubmit" type="button" onClick={()=>{CreatePost()}}>Envoyer le post</button>
          <button id="createPostInteractionsNull" type="button" onClick={()=>{Reinitialiser()}}>Réinitialiser</button>
        </div>
        
      </form>
    );
  }

export default NewPost
////////// Création et envoi d'un post //////////