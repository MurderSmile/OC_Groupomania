/* eslint-disable array-callback-return */
import '../../utils/styles/css/index.css';

import NewPost from './newPost'
import WorkTchat from './workTchat';


function Accueil() {

  return (
    <section id="accueil">
      {/*{!ModifOnePost && <NewPost />*/}
      <NewPost />
      <WorkTchat />
      
    </section>
  );
}

export default Accueil;