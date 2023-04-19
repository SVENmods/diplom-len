import { useAuth0 } from "@auth0/auth0-react";


const ProfilePic = (props) => {

     const {user, isAuthenticated, isLoading } = useAuth0()

     if(isLoading){
          return (
               <div className="loader header-profile-pic"></div>
          )
     } else{
          return (
          isAuthenticated &&(
               <>
               <img src={user.picture} alt={user.name} className={props.customClass}/>
               </>
          )
     );
     }
}

export default ProfilePic;