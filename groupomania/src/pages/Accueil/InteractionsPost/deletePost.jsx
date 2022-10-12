const profil = JSON.parse(sessionStorage.getItem('profil'))

function DeletePost(props) {

  const supprim = () => {
    fetch(`http://localhost:5500/api/posts/${props.post._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${profil.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ admin: profil.admin }),
    })
    .then((res) => res.json())

    .then((resJson) => {
      alert(resJson.message);
      window.location.reload()
    })

    .catch((error) => {
      console.log(error);
    });
  }


  return (
    <button onClick={() => {supprim()}}>
      Supprimer
    </button>
  )

}

export default DeletePost