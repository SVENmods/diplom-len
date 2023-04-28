import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProfileView = ({searchText, setAddToCheck, addToCheck}) => {

     const [allData, setAllData] = useState()

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               setAllData(response.data.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     const handleAddToCheck = (e) => {
          const val = e.target.value;
          const checked = e.target.checked;
          if (checked) {
               if (!addToCheck.includes(val)) {
                    const updatedAddToCheck = [...addToCheck, val];
                    setAddToCheck(updatedAddToCheck);
                    localStorage.setItem('addToCheck', JSON.stringify(updatedAddToCheck));
          }
          } else {
               const updatedAddToCheck = addToCheck.filter((item) => item !== val);
               setAddToCheck(updatedAddToCheck);
               localStorage.setItem('addToCheck', JSON.stringify(updatedAddToCheck));
          }
     }

     useEffect(()=>{
          fetchData();
          // setSavedAddToCheck(addToCheck)
     },[])

     useEffect(() => {
          const savedAddToCheck = JSON.parse(localStorage.getItem('addToCheck')) || [];
          setAddToCheck(savedAddToCheck);
     },[setAddToCheck])

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
                    <div key={id} className="d-flex flex-row align-items-start border mb-3 p-2">
                         <input type="checkbox" name="addToCheck"className="mt-2 me-3" onChange={handleAddToCheck} value={id} role="button" checked={addToCheck.includes(id)}/>
                         {/* checked={savedAddToCheck.includes(id)} */}
                         <div className="d-flex flex-column">
                              <div className="d-flex flex-row align-items-center justify-content-between">
                                   <h4 className="h4">{user.name}</h4>
                                   <Link to={`/show/profile/${id}`}>
                                        Показать профиль
                                   </Link>
                              </div>
                              <span>{id}</span>
                              <span>{user.email}</span>
                         </div>
                    </div>
               ))}
          </div>
     );
}
export default AllProfileView;
