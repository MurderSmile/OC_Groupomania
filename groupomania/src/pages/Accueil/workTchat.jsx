/* eslint-disable array-callback-return */
import '../../utils/styles/css/index.css';
//import DefaultPicture from '../../assets/656510.jpg';
import { useState, useEffect, useContext } from 'react';
import { IdContext } from '../../utils/context';
import LikePost from './InteractionsPost/likePost';
import DeletePost from './InteractionsPost/deletePost';

const author = sessionStorage.getItem('name');
const profil = JSON.parse(sessionStorage.getItem('profil'))

////////////////// Génération des posts //////////////////
function WorkTchat(){ 
  const localPosts = JSON.parse(localStorage.getItem('posts'))
  const [posts, setPosts] = useState(localPosts ? localPosts : [])  
  const {setIdPost} = useContext(IdContext)

  useEffect(()=>{
    ////////// Récupération des Posts ///////////
    fetch('http://localhost:5500/api/posts/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((resJson) => {
      setPosts(resJson)
      localStorage.setItem('posts', JSON.stringify(resJson))
    })
    .catch((error) => console.log(error))
    
  },[]);


  ////// Classement par ordre chronologique ///////
  posts.sort((a, b) => {

    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    // eslint-disable-next-line no-cond-assign
    if (a.date = b.date){

      if (a.time < b.time) return 1
      if (a.time > b.time) return -1

    }
  })


  //////////// Génération de chaque post ///////////
  return (
    <div id="postList">

    {posts.map((post) => 
     
      <div className="post" key={post._id}>
        <span>{post.author}</span>
        <img className="postPicture" src={post.imageUrl} alt="" />
        <div className="postContent">{post.text}</div>
        <span>Créer le : {post.date} à {post.time}</span>

        <div className="postInteraction">
          {author === post.author || profil.admin ? (<button onClick={() => {setIdPost(post._id)}}> Modifier </button>) : null }
          {author !== post.author ? <LikePost post = {post} /> : null}
          {author === post.author || profil.admin ? <DeletePost post = {post} /> : null }
        </div>
      </div>
    
    )}

    </div>
  )
}

    
export default WorkTchat;
