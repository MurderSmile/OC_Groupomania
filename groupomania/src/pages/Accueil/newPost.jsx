import { useState } from "react";

////////// Création et envoi d'un post //////////
const token = sessionStorage.getItem('token');
const author = sessionStorage.getItem('name');



function NewPost() {
    
    const [text, setText] = useState('');
    const [fileImage, setFileImage] = useState('');
    const handlePicture = (e) => {
      setFileImage(URL.createObjectURL(e.target.files[0]));
    };
    
    

    const CreatePost = () => {

      return fetch('http://localhost:5500/api/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({author, text, fileImage}),
      })
        .then((res) => res.json())

        .then((resJson) => {
          console.log(resJson);
          console.log(fileImage);
          console.log({author, text, fileImage});
        })

        .catch((error) => {
          console.log(error);
          console.log(fileImage)
          console.log({author, text, fileImage});
        });
    };

    return (
      <form id="createPost" onSubmit={CreatePost} method="post" encType='multipart/form-data'>
        <label htmlFor="createPostAddPicture">Image</label>
        <br />
        <input
          type="file"
          name="createPostAddPicture"
          id="createPostAddPicture"
          onChange={(e) => handlePicture(e)}
        />

        <br />

        <label htmlFor="createPostContenu">Contenu</label>
        <br />
        <textarea
          name="createPostContenu"
          id="createPostContenu"
          rows=""
          cols=""
          placeholder="écrivez votre message"
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>

        <br />

        <input id="createPostSubmit" type="submit" value="Envoyer un post" />
      </form>
    );
  }

export default NewPost
////////// Création et envoi d'un post //////////