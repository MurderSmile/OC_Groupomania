import { useState } from "react";

////////// Création et envoi d'un post //////////
const author = sessionStorage.getItem('name');
const profil = JSON.parse(sessionStorage.getItem('profil'))



function NewPost() {
    const [text, setText] = useState('');
    //const [fileImage, setFileImage] = useState('');
    const [picture, setPicture] = useState(null);
    const [file, setFile] = useState();

    const handlePicture = (e) => {
      setPicture(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    };
    console.log(picture);
    console.log(file);
    

    const CreatePost = (e) => {
      e.preventDefault();


      let now = new Date()
      const date = now.toLocaleDateString()
      const time = now.toLocaleTimeString()

      /*const formData = new FormData()
      formData.append("author", author )
      formData.append("text" , text)
      formData.append("date", date)
      formData.append("time", time)
      formData.append("file", file)*/

      return fetch('http://localhost:5500/api/posts/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${profil.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        //body: formData
        body: JSON.stringify({author, text, date, time, file}),
      })
        .then((res) => res.json())

        .then((resJson) => {
          console.log(resJson);    
          console.log({author, text, file});
        })

        .catch((error) => {
          console.log(error);
          console.log({author, text, file});
        });
    };

    return (
      <form id="createPost"  method="post" encType='multipart/form-data' onSubmit={ CreatePost}>
        <label htmlFor="createPostPicture">Image</label>
        <br />
        <input
          type="file"
          name="createPostPicture"
          id="createPostPicture"
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