import Nav from './Nav';
import logo from '/img/logo2.png'
import '../assets/css/components/header.scss'
import HeaderProfile from './user/HeaderProfile';


const Header = ({userData, role}) => {
     return (
          <header className="d-flex flex-row align-items-center justify-content-between content-container py-2">
               <a href='/' className='d-flex flex-row align-items-center'>
                    <img src={logo} alt="logo"></img>
                    <span className='ms-3'>FindYours</span>
               </a>
               <Nav role={role}/>
               <HeaderProfile userData={userData} role={role}/>
          </header>
     );
}

export default Header;