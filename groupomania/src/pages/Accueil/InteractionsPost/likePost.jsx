import { useState, useEffect } from "react";

function LikePost(props){

  const profil = JSON.parse(sessionStorage.getItem('profil'))
  
  let userLiked = props.post.usersLiked.includes(profil.userId)
  let [likes, setLikes] = useState(props.post.likes)
  let [like, setLike] = useState(userLiked ? 0 : 1)

  /*useEffect(()=>{
    ////////// Récupération du Post ///////////
    setInterval(() => {

      fetch(`http://localhost:5500/api/posts/${props.post._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${profil.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      .then((res) => res.json())
      .then((resJson) => {
        setLikes(resJson.likes)
      })
      .catch((error) => console.log(error))  
      
    }, 3000);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);*/


  const likeOnePost = () => {

    return fetch(`http://localhost:5500/api/posts/${props.post._id}/like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({like}),
    })
    .then((res) => res.json())

    .then((resJson) => {

      console.log(resJson)
      console.log(props.post.usersLiked);
      setLike(like === 1 ? 0 : 1)
      setLikes(like === 1 ? likes +1 : likes -1)
      //localStorage.clear()
    })
    
    .catch((error) => {console.log(error)})
        
  }


  return(
    <button onClick={() => {likeOnePost()}}> 
      {likes} {like === 1 ? <i className="far fa-heart"></i> : <i className="fas fa-heart"></i>}
    </button>
  )
}

export default LikePost