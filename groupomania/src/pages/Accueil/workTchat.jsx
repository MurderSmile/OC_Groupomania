/* eslint-disable array-callback-return */
import '../../utils/styles/css/index.css';
//import DefaultPicture from '../../assets/656510.jpg';
import { useState, useEffect } from 'react';

import findAll from '../../utils/api.jsx'

/////////////////////////// Paramètres ///////////////////////////////

const token = sessionStorage.getItem('token');
const author = sessionStorage.getItem('name')

///////////// Génération des posts //////////////

function WorkTchat(){
  const [posts, setPosts] = useState([])  

  useEffect(()=>{

    fetch('http://localhost:5500/api/posts/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())

    .then((resJson) => setPosts(resJson))

    .catch((error) => {
      console.log(error)
    })
    
    /*GetApi()
    async function GetApi(){
      const data = await findAll()
      setPosts(data)
    }*/

  },[]);

  
  return (
    <div id="postList">
    {posts.map((post) => 
     
      <div className="post" key={post._id}>
        <span>{post.author}</span>
        <img className="postPicture" src={post.imageUrl} alt="" />
        <div className="postContent">{post.text}</div>
        <span>Créer le :{post.date}</span>

        <div className="postInteraction">
          {author === post.author && (<button onClick={() => {FindOnePost(post._id)}}> Modifier </button>)}
          <button onClick={() => {Like(post._id)}}> {post.likes} Likes </button>
          {author === post.author && (<button onClick={() => {SupprimPost(post._id)}}> Supprimer </button>)}
        </div>
      </div>
    
    )}
    </div>
  )
}

///////////// Génération des posts //////////////

////////////// Génération d'un post(modif, like, supprim) //////////////
  

  //////////// Modification d'un post ///////////// 
    function FindOnePost(id) {
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
          ModifPost(resJson);
        })

        .catch((error) => {
          console.log(error);
        });
    }


    function ModifPost(postSelected) {
      const [post, setPost] = useState('');
      const [image, setImage] = useState('');

      function ModifyPost(id) {
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
      }

      return (
        <form id="modifPost" onSubmit={ModifyPost(postSelected._id)}>
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
    }
  //////////// Modification d'un post ///////////// 


  //////////////// Créer un like //////////////////
    function Like(id){

      return fetch(`http://localhost:5500/api/posts/like/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  }),
      })
        .then((res) => res.json())

        .then((resJson) => {
          console.log(resJson);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  //////////////// Créer un like //////////////////


  /////////////////////////// Supprimer un Post ////////////////////////
    function SupprimPost(id) {
      return fetch(`http://localhost:5500/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())

        .then((resJson) => {
          alert(resJson.message);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  /////////////////////////// Supprimer un Post ////////////////////////

////////////// Génération d'un post(modif, like, supprim) //////////////

export default WorkTchat;
