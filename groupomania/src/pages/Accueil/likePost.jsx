const profil = JSON.parse(sessionStorage.getItem('profil'))

function getPost(id) {
  return fetch(`http://localhost:5500/api/posts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${profil.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((res) => res.json())
  .then(resJson => resJson)
  .catch((error) => console.log(error))
}

async function likePost(id) {

  const usersLiked = await getPost(id).then(response => response.usersLiked)

  const like = usersLiked.includes(profil.userId) ? 0 : 1

  return fetch(`http://localhost:5500/api/posts/${id}/like`, {
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
    console.log(resJson);
  })
  
  .catch((error) => {
    console.log(error);
  });
      
}

export default likePost