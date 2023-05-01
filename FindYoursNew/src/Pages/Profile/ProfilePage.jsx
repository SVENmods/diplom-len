import ContentLoader from '../../UI/ContentLoader';
import FullProfile from './FullProfile';

const ProfilePage = ({formData, role}) => {
     if(!formData.name){
          return (
               <ContentLoader/>
          )
     }
     return (
          <FullProfile formData={formData} role={role}/>
     );
}

export default ProfilePage;