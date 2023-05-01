import { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import axios from "axios";
import FullProfile from './FullProfile';


const ProfileShow = () => {

     const { id } = useParams();
     const [profleData, setProfileData] = useState()

     useEffect(() => {
          const fetchData = async (userId) => {
               try {
               const response = await axios.get(`http://localhost:8000/profiles/${id}`);
               const data = response.data.data
               setProfileData(data)
               } catch (error) {
                    console.error("Error fetching data:", error);
                    return null;
               }
          };
          fetchData()
     }, [])
     
     if (!profleData) {
          return <div className="loader"></div>

     }

     return (
          // <a href="/selection">Вернуться к подбору</a>
          <FullProfile formData={profleData} compareShow={true}/>
     );
}

export default ProfileShow;