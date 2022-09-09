import OriginalLogo from '../../assets/icon-left-font-monochrome-black.png';
import DefaultPicture from '../../assets/profile.png';
import AdminImage from '../../assets/1200px-OOjs_UI_icon_eye.svg.png'

let localName = sessionStorage.getItem("name")
const name = !localName ? 'Déconnecté' : localName

const deconnect = () =>{
  sessionStorage.clear();
  window.location.href = '../';
}

function Header() {
  const profil = JSON.parse(sessionStorage.getItem('profil'))

  return (
    <nav>
      <img id="logo" src={OriginalLogo} alt="Groupania" />
      <div id="profil">
        <img src={profil && profil.admin ? AdminImage : DefaultPicture} alt="" />
        <span>{name}</span>
        {profil && profil.admin ? <span>----- Mode Admin -----</span> : null}
        {localName && localName !=='' && <button onClick={deconnect}>se déconnecter</button>}
      </div>
    </nav>
  );
}

export default Header;
