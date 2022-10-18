import { useState } from "react";

function LikePost(props){

  const profil = JSON.parse(sessionStorage.getItem('profil'))
  
  const userLiked = props.post.usersLiked.includes(profil.userId)
  const [likes, setLikes] = useState(props.post.likes)
  const [like, setLike] = useState(userLiked ? 0 : 1)


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
      
      setLike(like === 1 ? 0 : 1)
      setLikes(like === 1 ? likes +1 : likes -1)
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