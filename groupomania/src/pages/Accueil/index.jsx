import '../../index.css';
import DefaultPicture from '../../assets/656510.jpg';

const posts = [
  {
    id: `cnsksp`,
    author: `nono@yahoo.fr`,
    text: `Je plaisante, s'était son fils, mais il était tellement moche faut dire.`,
    picture: DefaultPicture,
  },
  {
    id: `efrgbg`,
    author: `billy@gmail.com`,
    text: `PARDON!!!!!?`,
    picture: DefaultPicture,
  },
  {
    id: `cnsksp`,
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
];

function WorkTchat() {
  return (
    <ul id="postList">
      {posts.map((post) => (
        <Card key={`${post.id}`} author={post.author} picture={post.picture} text={post.text} />
      ))}
    </ul>
  );
}

function Card({author, picture, text }) {
  return (
    <li>
      <span>{author}</span>
      <img src={picture} alt="" />
      <div className="content">
        {text}
      </div>
      <span>19 Likes</span>
    </li>
  );
}

function CreatePost() {
  return (
    <div className="cardPost">
      <img src={DefaultPicture} alt="" />
      <form method="post">
        <p>
          <label for="newPost"></label>

          <br />

          <textarea name="newPost" id="newPost" rows="10" cols="50" placeholder='écrivez votre message'></textarea>
        </p>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

function Accueil() {
  return (
    <section id="accueil">
      <CreatePost />
      <WorkTchat />
    </section>
  );
}

export default Accueil;
