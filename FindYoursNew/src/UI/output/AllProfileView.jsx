import { useState, useEffect } from "react";
import axios from "axios";

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

     return (
          <div className="">
          {Object.entries(allData)
          .filter(([id, user]) =>
               user.name.toLowerCase().includes(searchText?.toLowerCase())
          )
          .map(([id, user]) => (
               <div key={id}>
                    <div className="d-flex flex-row">
                    {/* <Link to={`/profile/edit/experiens/${id}`}>
                    редактировать
                    </Link> */}
                    </div>
                    <h4 className="h4">{user.name}</h4>
                    <span>{user.email}</span>
               </div>
               ))}
          </div>
     );
}
export default AllProfileView;
