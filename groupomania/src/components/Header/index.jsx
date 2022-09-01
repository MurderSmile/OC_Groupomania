import OriginalLogo from '../../assets/icon-left-font-monochrome-black.png';
import DefaultPicture from '../../assets/profile.png';
import AdminImage from '../../assets/1200px-OOjs_UI_icon_eye.svg.png'

let localName = sessionStorage.getItem("name")
const name = !localName || localName === '' ? 'Déconnecté' : localName

function deconnect(){
  sessionStorage.clear();
  window.location.href = '../';
}

function Header() {
  const auth = JSON.parse(sessionStorage.getItem("auth"))

  return (
    <nav>
      <img id="logo" src={OriginalLogo} alt="Groupania" />
      <div id="profil">
        <img src={auth ? AdminImage : DefaultPicture} alt="" />
        <span>{name}</span>
        {auth ? <span>----- Mode Admin -----</span> : null}
        {localName && localName !=='' && <button onClick={deconnect}>se déconnecter</button>}
      </div>
    </nav>
  );
}

export default Header;
