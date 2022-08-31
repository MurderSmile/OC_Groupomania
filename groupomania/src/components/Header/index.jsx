import OriginalLogo from '../../assets/icon-left-font-monochrome-black.png';
import DefaultPicture from '../../assets/profile.png';

let localName = sessionStorage.getItem("name")
const name = !localName || localName === '' ? 'Déconnecté' : localName

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
        {localName && localName !=='' && <button onClick={deconnect}>se déconnecter</button>}
      </div>
    </nav>
  );
}

export default Header;
