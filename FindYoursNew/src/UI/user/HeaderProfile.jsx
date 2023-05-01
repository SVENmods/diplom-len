import ProfilePic from './ProfilePic';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthenticationButton from '../buttons/AuthenticationButton';


const HeaderProfile = ({userData, role}) => {
     return (
          <div className="d-flex flex-row align-items-center">
               <a href="/profile" className="d-flex flex-row align-items-center">
                    <ProfilePic customClass="rounded-circle header-profile-pic"/>
                    <div className="d-flex flex-column justify-content-start ms-3">
                         <span>Мой профиль</span>
                         {/* <span className='mt-1'>{userData.status}</span> */}
                    </div>
               </a>
               <DropdownButton id="header-dropdown-button" className='ms-3' variant="none" title="">
                    <Dropdown.Item href='/profile'>Профиль</Dropdown.Item>
                    {
                    role === "admin" ? (
                         <Dropdown.Item href='/admin/panel'>Администрирование</Dropdown.Item>
                    )
                    : null
                    }
                    <Dropdown.Item><AuthenticationButton/></Dropdown.Item>
               </DropdownButton>
          </div>
     );
}

export default HeaderProfile;