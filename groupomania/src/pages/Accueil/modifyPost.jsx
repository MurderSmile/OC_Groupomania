import { useState, useEffect, useContext } from "react";
import { IdContext } from "../../utils/context";

const profil = JSON.parse(sessionStorage.getItem('profil'))

//////////////////// Modification d'un Post //////////////////////////
function ModifyPost() {
  const {idPost, setIdPost} = useContext(IdContext)

  const [text, setText] = useState('');
  const [fileImage, setFileImage] = useState('');
  

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
      setFileImage(resJson.imageUrl)
    })
    .catch((error) => console.log(error))
          
  },[idPost]);

  /////////////////// envoi de la modification du post /////////////
  const ModifyOnePost = (e) =>{
    e.preventDefault();

    const imageUrl = fileImage
    
    return fetch(`http://localhost:5500/api/posts/${idPost}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, imageUrl, admin:profil.admin }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson.message)
      })
      .catch((error) => console.log(error))

  }

  
  /////////////////// formulaire de modification du post ///////////
  return (
    <form id="modifPost" onSubmit={ModifyOnePost}>

      <label htmlFor="modifPostPicture">Image</label>
      <br />
      <input
        type="file"
        name="modifPostPicture"
        id="modifPostPicture"
        onChange={(e) => setFileImage(e.target.value)}
        value={fileImage}
      />
  
      <br />
  
      <label htmlFor="modifPostContenu">Contenu</label>
      <br />
      <textarea
        name="modifPostContenu"
        id="modifPostContenu"
        rows=""
        cols=""
        placeholder="écrivez votre message"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
  
      <br />

      <input id="modifPostSubmit" type="submit" value="Modifier un post" />
          
    </form>
  );

}

export default ModifyPost