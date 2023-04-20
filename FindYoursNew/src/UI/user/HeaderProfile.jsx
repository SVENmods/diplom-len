import ProfilePic from './ProfilePic';


const HeaderProfile = ({userData}) => {
     return (
          <a href='/profile' className="d-flex flex-row align-items-center">
               <ProfilePic customClass="rounded-circle header-profile-pic"/>
               <div className="d-flex flex-column justify-content-start ms-3">
                    <span>Мой профиль</span>
                    <span className='mt-1'>{userData.status}</span>
               </div>
          </a>
     );
}

export default HeaderProfile;