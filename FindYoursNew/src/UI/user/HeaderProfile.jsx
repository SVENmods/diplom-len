import ProfilePic from './ProfilePic';

const HeaderProfile = () => {
     return (
          <a href='/profile' className="d-flex flex-row align-items-center">
               <ProfilePic customClass="rounded-circle header-profile-pic"/>
               <span className='ms-3'>Мой профиль</span>
          </a>
     );
}

export default HeaderProfile;