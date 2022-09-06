import { useState, useEffect, useContext } from "react";
import { IdContext } from "../../utils/context";

const token = sessionStorage.getItem('token');


//////////////////// Modification d'un Post //////////////////////////
function ModifyPost() {
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const {idPost} = useContext(IdContext)

  /////////////////// récupération de l'api du post cible //////////
  useEffect(()=>{
  
    fetch(`http://localhost:5500/api/posts/${idPost}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((resJson) => setPost(resJson))
    .catch((error) => console.log(error))
          
  },[idPost]);
  /////////////////// récupération de l'api du post cible //////////

  /////////////////// envoi de la modification du post /////////////
  const ModifyOnePost = () =>{
    
    return fetch(`http://localhost:5500/api/posts/${idPost}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post, image }),
    })
      .then((res) => res.json())
      .then((resJson) => console.log(resJson.message))
      .catch((error) => console.log(error))

  }
  /////////////////// envoi de la modification du post /////////////
  
  /////////////////// formulaire de modification du post ///////////
  return (
    <form id="modifPost" onSubmit={() => {ModifyOnePost(post._id)}}>

      <label htmlFor="modifPostPicture">Image</label>
      <br />
      <input
        type="file"
        name="modifPostPicture"
        id="modifPostPicture"
        onChange={(e) => setImage(e.target.value)}
        value={post.imageUrl}
      />
  
      <br />
  
      <label htmlFor="modifPostContenu">Contenu</label>
      <br />
      <textarea
        name="modifPostContenu"
        id="modifPostContenu"
        rows="15"
        cols="60"
        placeholder="écrivez votre message"
        onChange={(e) => setPost(e.target.value)}
        value={post.text}
      ></textarea>
  
      <br />
  
      <input id="modifPostSubmit" type="submit" value="Modifier un post" />
          
    </form>

  );
  /////////////////// formulaire de modification du post ///////////
}
//////////////////// Modification d'un Post //////////////////////////

export default ModifyPost

















///////////// Génération des posts //////////////
/*function ModifyOnePost(id) {
  return fetch(`http://localhost:5500/api/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post, image }),
  })
    .then((res) => res.json())

    .then((resJson) => {
      console.log(resJson.message);
    })

    .catch((error) => {
      console.log(error);
    });
}*/

////////////// Génération d'un post(modif, like, supprim) //////////////
  

  //////////// Modification d'un post ///////////// 
    /*function FindOnePost(id) {
      return fetch(`http://localhost:5500/api/posts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())

        .then((resJson) => {
          return resJson;
        })

        .catch((error) => {
          console.log(error);
        });
    }*/


    /*function ModifOnePost(id) {
        const [post, setPost] = useState('');
        const [image, setImage] = useState('');
  
        useEffect(()=>{
  
          fetch(`http://localhost:5500/api/posts/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json())
  
          .then((resJson) => setPost(resJson))
  
          .catch((error) => {
            console.log(error);
          });
          
      
        },[id]);
  
        return (
          <form id="modifPost" onSubmit={console.log(id)}>
            <label htmlFor="modifPostPicture">Image</label>
            <br />
            <input
              type="file"
              name="modifPostPicture"
              id="modifPostPicture"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
  
            <br />
  
            <label htmlFor="modifPostContenu">Contenu</label>
            <br />
            <textarea
              name="modifPostContenu"
              id="modifPostContenu"
              rows="15"
              cols="60"
              placeholder="écrivez votre message"
              onChange={(e) => setPost(e.target.value)}
              value={post}
            ></textarea>
  
            <br />
  
            <input id="modifPostSubmit" type="submit" value="Modifier un post" />
          </form>
        );
      }*/
    //////////// Modification d'un post ///////////// 