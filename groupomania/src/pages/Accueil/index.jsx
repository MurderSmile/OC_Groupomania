import '../../index.css';
import DefaultPicture from '../../assets/656510.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

/*const posts = [
  {
    userId: `cnsksp`,
    author: `nono@yahoo.fr`,
    text: `Je plaisante, s'était son fils, mais il était tellement moche faut dire.`,
    imageUrl: DefaultPicture,
    likes: `23`,
    usersLiked: ``
  },
  {
    userId: `efrgbg`,
    author: `billy@gmail.com`,
    text: `PARDON!!!!!?`,
    picture: DefaultPicture,
    likes: `29`,
    usersLiked: ``
  },
  {
    id: `cpisp`,
    author: `gregoire@gmail.com`,
    text: `moi perso, ça va, j'ai bouffé le chien du patron à 11h.`,
    picture: DefaultPicture,
  },
  {
    id: `bncbh`,
    author: `jill.Mory@hotmail.fr`,
    text: `s'est fermé aujourd'hui.`,
    picture: DefaultPicture,
  },
  {
    id: `cncnxsbsbs`,
    author: `girou@yahoo.fr`,
    text: `Pareille, il y a quoi à la cafétéiria ?`,
    picture: DefaultPicture,
  },
  {
    id: `llkjhgfs`,
    author: `simon.begam@yahoo.fr`,
    text: `Pffff, j'ai la daaaaaaaaalle.`,
    picture: DefaultPicture,
  },
];*/

function CreatePost() {
  const [post, setPost] = useState('')
  const [image, setImage] = useState('')

  const newPost = (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(post);
    console.log(image);

    return fetch('http://localhost:5500/api/posts/createPost', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post, image}),
    })
      .then((res) => res.json())

      .then((resJson) => {
        console.log(resJson);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form id="cardPost" onSubmit={newPost}>
      <p>
        <label htmlFor="newPostPicture">Image</label>
        <br />
        <input 
          type="file" 
          name="newPostPicture" 
          id="newPostPicture" 
          onChange={(e) => setImage(e.target.value)}
          value={image}
        /> 

        <br />

        <label htmlFor="newPostContenu">Contenu</label>
        <br />
        <textarea
          name="newPostContenu"
          id="newPostContenu"
          rows="15"
          cols="60"
          placeholder="écrivez votre message"
          onChange={(e) => setPost(e.target.value)}
          value={post}
        ></textarea>

        <br />

        <input type="submit" value="Envoyer" />
      </p>
    </form>
  );
}

/*function WorkTchat() {
  return (
    <ul id="postList">
      {posts.map((post) => (
        <Card
          key={post.id}
          author={post.author}
          picture={post.picture}
          text={post.text}
        />
      ))}
    </ul>
  );
}*/

/*function Card(props) {
  return (
    <li key={props.key} onClick={console.log("rouge")}>
      <span>{props.author}</span>
      <img src={props.picture} alt="" />
      <div className="content">{props.text}</div>
      <span>19 Likes</span>
    </li>
  );
}*/

/*function WorkTchat() {
  return (
    <ul id="postList">
      {posts.map((post) => (
        <li key={post.key} onClick={console.log('rouge')}>
          <span>{post.author}</span>
          <img src={post.picture} alt="" />
          <div className="content">{post.text}</div>
          <span>19 Likes</span>
        </li>
      ))}
    </ul>
  );
}*/

/*function FocusPost() {
  return (
    <div id="zoomPost">
      <span>lore@gregoire@gmail</span>
      <img src={DefaultPicture} alt="" />
      <div className="content">
        France, selon l'étendue de l'action récompensée, une citation très
        honorable est décernée à l'ordre de l'armée ou du corps d'armée ; une
        action de moindre envergure vaut une citation à l'ordre de la division,
        de la brigade du régiment ou de l'unité de rattachement. En période de
        conflit, elle s'accompagne souvent de l'attribution d'une croix de
        guerre. Au Royaume-Uni, la citation militaire récompense aussi la
        bravoure au combat{' '}
      </div>
      <div id="sousSection">
        <button>Modifier</button>
        <span>19 Likes</span>
        <button>Supprimer</button>
      </div>
    </div>
  );
}*/

function Accueil() {
  return (
    <section id="accueil">
      <CreatePost />
      {/* <FocusPost /> */}
      {/* <WorkTchat /> */}
    </section>
  );
}

export default Accueil;
