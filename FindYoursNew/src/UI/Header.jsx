import Nav from './Nav';
import AuthenticationButton from './buttons/AuthenticationButton'
import logo from '/img/logo2.png'
import '../assets/css/components/header.scss'
import HeaderProfile from './user/HeaderProfile';


const Header = (props) => {
     return (
          <header className="d-flex flex-row align-items-center justify-content-between content-container">
               <a href='/' className='d-flex flex-row align-items-center'>
                    <img src={logo} alt="logo"></img>
                    <span className='ms-3'>FindYours</span>
               </a>
               {props.role}
               <Nav/>
               <HeaderProfile/>
               <AuthenticationButton/>
          </header>
     );
}

export default Header;