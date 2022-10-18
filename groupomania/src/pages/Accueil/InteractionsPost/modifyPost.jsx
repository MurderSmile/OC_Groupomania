import { useState, useEffect, useContext } from "react";
import { IdContext } from "../../../utils/context";


//////////////////// Modification d'un Post //////////////////////////
function ModifyPost() {

  /////  Récupération du profil   //
  const profil = JSON.parse(sessionStorage.getItem('profil'))

  /////  Récupération de l'Id du post   //
  const {idPost, setIdPost} = useContext(IdContext)

  /////  Gestion text  //
  const [text, setText] = useState()

  ////   Gestion fichier image //
  const [file, setFile] = useState();
  console.log(file);

  ////   Création du FormData  //
  const data = new FormData()
    data.append("text" , text)
    data.append("fileImage", file)
    data.append("admin", profil.admin)

  /////////////////// récupération de l'api du post cible //////////
  useEffect(()=>{
  
    fetch(`http://localhost:5500/api/posts/${idPost}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((resJson) => {
      setText(resJson.text)
      setFile(URL.createObjectURL(resJson.imageUrl))
    })
    .catch((error) => console.log(error))
          
  },[idPost, profil.token]);



  /////////////////// envoi de la modification du post /////////////
  const ModifyOnePost = () =>{
    //e.preventDefault();
    fetch(`http://localhost:5500/api/posts/${idPost}`, {
      method: 'PUT',
      headers: {Authorization: `Bearer ${profil.token}`},
      body: data,
    })
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson.message)
    })
    .catch((error) => console.log(error))

  }

  
  /////////////////// formulaire de modification du post ///////////
  return (
    <form id="modifPost">

      <label htmlFor="modifPostPicture">Image</label>
      <br />
      <input
        type="file"
        name="modifPostPicture"
        id="modifPostPicture"
        onChange={(e) => setFile(e.target.files[0])}
        value={file || ''}
      />
  
      <br />
  
      <label htmlFor="modifPostContenu">Contenu</label>
      <br />
      <textarea
        name="modifPostContenu"
        id="modifPostContenu"
        placeholder="écrivez votre message"
        onChange={(e) => setText(e.target.value)}
        value={text || ''}
      ></textarea>
  
      <br />
      
      <div id="modifPostInteractions">
        <button id="modifPostInteractionsSubmit" type="button" onClick={() =>{ModifyOnePost()}}>Modifier le post</button>
        <button id="modifPostInteractionsNull" type="button" onClick={() =>{setIdPost(null)}}>Annuler</button>
      </div>

    </form>
  );

}

export default ModifyPost