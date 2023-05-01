import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllReplyView = ({profileData}) => {
     const [allData, setAllData] = useState()

     useEffect(()=>{
          const fetchData = async () => {
               try {
                    const response = await axios.get(`http://localhost:8000/profiles`);
                    setAllData(response.data.data);
               } catch (error) {
                    console.error("Error fetching data:", error);
               }
          };
          fetchData();
     },[])

     let filteredData;
     if (allData && profileData) {
          filteredData = Object.entries(allData)
               .filter(([id, user]) => {
                    return profileData.vacancy?.reply?.includes(id)
               })
               .map(([id, user]) => (
                         <div key={id} className="border d-flex flex-column mb-3 p-3 rounded w-100">
                              <div className="d-flex flex-row align-items-start">
                                   <div className="d-flex flex-row align-items-center justify-content-between w-100 align-items-start">
                                        <h4 className="h4">{user.name} {user?.family_name}</h4>
                                        <Link to={`/show/profile/${id}`} className="text-primary">
                                             Показать профиль
                                        </Link>
                                   </div>
                              </div>
                              <div className="d-flex flex-column mt-2">
                                   <h4 className="h4">О себе:</h4>
                                   <p className="mb-1">{user?.about?.text}</p>
                              </div>
                         </div>
                    
               ))
     } else {
          filteredData = <div className="d-flex flex-row align-items-start p-2">
               <div className="loader"></div>
          </div>
     }

     return <div>{filteredData.length ? filteredData :
          <div className="d-flex flex-row align-items-start p-2">
               Пока нет откликов
          </div>
     }
     </div>;
}
export default AllReplyView;
