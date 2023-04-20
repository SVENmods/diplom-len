import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileEditPage = ({userData, onUserDataChange}) => {
     const handleChange = (e) => {
          // console.log("e.value", e.target.value)
          const { name, value } = e.target;
          onUserDataChange({ [name]: value });
     }
     return (
          <main>
               <input type="text" value={userData.role} name="role" onChange={handleChange}/>
               
          </main>
     );
}
 
export default ProfileEditPage;