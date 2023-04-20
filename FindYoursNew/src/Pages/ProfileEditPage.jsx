import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileEditPage = ({userData}) => {
     // let { userKey } = useParams()
     // const fetchData = async (userKey) => {
     //      try {
     //        const response = await axios.get(`http://localhost:8000/profiles/${userKey}`)
     //        const data = response
     //        console.log("PROFILE DATA", data)
            
     //      } catch (error) {
     //        console.error("Error fetching data:", error);
     //      }
     //    };
     //    fetchData(userKey)
     return (
          <main>
               {/* <input type="text" value={userData.role} name="role" onChange={handleChange}/> */}
               <pre>
                    {userData}
               </pre>
          </main>
     );
}
 
export default ProfileEditPage;