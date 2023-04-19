import { useAuth0 } from "@auth0/auth0-react";


const ProfilePic = () => {

     const {user, isAuthenticated, } = useAuth0()

     
     return (
          isAuthenticated &&(
               <>
               <img src={user.picture} alt={user.name} />
               </>
          )
     );
}

export default ProfilePic;