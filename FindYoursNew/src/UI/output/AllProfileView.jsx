import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProfileView = ({searchText, setAddToCheck, addToCheck, role}) => {

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

     const deleteUser = async (id) => {
          const response = await axios.delete(`http://localhost:8000/profiles/${id}`)
          const success = response.status === 200
          if (success) window.location.reload()
        }

     useEffect(()=>{
          fetchData();
          // setSavedAddToCheck(addToCheck)
     },[])

     useEffect(() => {
          const savedAddToCheck = JSON.parse(localStorage.getItem('addToCheck')) || [];
          setAddToCheck(savedAddToCheck);
          console.log(role)
     },[setAddToCheck])

     if (!allData) {
          return <div className="loader"></div>
     }
     
     // console.log(Object.entries(allData))

     const filteredData = Object.entries(allData)
          .filter(([id, user]) => {
               const sphereMatch = !searchText.sphere || user?.about?.sphere?.toLowerCase().includes(searchText.sphere.toLowerCase());
               const areaMatch = !searchText.area || user?.about?.area?.toLowerCase().includes(searchText.area.toLowerCase());
               return sphereMatch && areaMatch && user.role === "spec";
          })
          .map(([id, user]) => (
                    <div key={id} className="border d-flex flex-column mb-3 p-3 rounded w-100">
                         <div className="d-flex flex-row align-items-start">
                              <input 
                                   type="checkbox" 
                                   name="addToCheck"
                                   className="mt-2 me-3" 
                                   onChange={handleAddToCheck} 
                                   value={id} role="button" 
                                   checked={addToCheck.includes(id)}
                                   style={{width: '15px', height: '15px'}}/>
                                   {/* checked={savedAddToCheck.includes(id)} */}
                              <div className="d-flex flex-row align-items-center justify-content-between w-100 align-items-start">
                                   <h4 className="h4">{user.name} {user?.family_name}</h4>
                                   <div className="d-flex flex-column">
                                        <Link to={`/show/profile/${id}`} className="text-primary">
                                             Показать профиль
                                        </Link>
                                        {
                                             role === "admin" && (
                                                  <span 
                                                       role="button" 
                                                       onClick={()=>{deleteUser(id)}}
                                                       className="text-danger mt-2">
                                                       Удалить профиль
                                                  </span>
                                             )
                                        }
                                        
                                   </div>
                                   
                              </div>
                         </div>
                         <div className="d-flex flex-column mt-2">
                              <h4 className="h4">О себе:</h4>
                              <p className="mb-1">{user?.about?.text}</p>
                         </div>
                         <h4 className="h4">Компетенции</h4>
                              <div className="row ps-2">
                                   {
                                        user?.about?.skills?.map((skill, idx) => (
                                             <div key={idx} 
                                                  className="border col-md-auto 
                                                       mx-1 my-1 d-flex 
                                                       align-items-center 
                                                       justify-content-center p-1 
                                                       profile-skill">
                                                  {skill}
                                             </div>
                                        ))
                                   }
                              </div>
                    </div>
               
          ))

     return <div>{filteredData.length ? filteredData :
               <div className="d-flex flex-row align-items-start p-2">
                    Ничего не найдено
               </div>
          }
          </div>;
}
export default AllProfileView;
