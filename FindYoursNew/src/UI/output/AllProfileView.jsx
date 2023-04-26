import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProfileView = ({searchText}) => {

     const [allData, setAllData] = useState()

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               setAllData(response.data.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     useEffect(()=>{
          fetchData();
          console.log('allData', allData)
          
     },[])

     if (!allData) {
          return <div className="loader"></div>
     }
     
     // console.log(Object.entries(allData))
     return (
          <div className="">
          {Object.entries(allData)
               .filter(([id, user]) => {
                    const sphereMatch = !searchText.sphere || user.about.sphere.toLowerCase().includes(searchText.sphere.toLowerCase());
                    const areaMatch = !searchText.area || user.about.area.toLowerCase().includes(searchText.area.toLowerCase());
                    return sphereMatch && areaMatch;
               })
                    .map(([id, user]) => (
                    <div key={id}>
                         <h4 className="h4">{user.name}</h4>
                         <span>{id}</span><br />
                         <span>{user.email}</span>
                         <div className="d-flex flex-row">
                              <Link to={`/show/profile/${id}`}>
                                   Показать профиль
                              </Link>
                         </div>
                    </div>
               ))}
          </div>
     );
}
export default AllProfileView;
