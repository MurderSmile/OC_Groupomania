import OriginalLogo from '../../assets/icon-left-font-monochrome-black.png';
import DefaultPicture from '../../assets/profile.png';

let local = sessionStorage.getItem("name")
const name = !local || local === '' ? 'Pas connecté' : local

function deconnect(){
  sessionStorage.clear();
  window.location.href = '../';
}

function Header() {
  return (
    <nav>
      <img id="logo" src={OriginalLogo} alt="Groupania" />
      <div id="profil">
        <img src={DefaultPicture} alt="" />
        <span>{name}</span>
        {local && local !=='' && <button onClick={deconnect}>se déconnecter</button>}
      </div>
    </nav>
  );
}

export default Header;
