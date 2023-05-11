import { useState, useEffect } from "react";
import axios from "axios";
import ProfileVacancyView from "../UI/output/ProfileVacancyView";

const ComparePage = ({userKey}) => {
     const [compareData, setCompareData] = useState([])
     const [formData, setFormData] = useState({});

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               const filteredData = Object.entries(response.data.data)
               .filter(([id]) => getAddToCheckFromStorage().includes(id))
               .map(([id, user]) => ({ id, ...user }));
               setCompareData(filteredData);
               // console.log('filteredData IN COMPARE PAGE', filteredData)
          } catch (error) {
               console.error("Error fetching compare data:", error);
          }
     };

     const fetchUser = async () => {
          if (!userKey) return;
          try {
               const response = await axios.get(
                    `http://localhost:8000/profiles/${userKey}`
               );
               setFormData(response.data.data);
          } catch (error) {
               console.error("Error fetching user data:", error);
          }
     };

     const getAddToCheckFromStorage = () => {
          const addToCheckStr = localStorage.getItem('addToCheck');
          if (addToCheckStr) {
               return JSON.parse(addToCheckStr);
          } else {
               return [];
          }
     }


     useEffect(()=>{
          fetchData();
     },[])

     useEffect(() => {
          fetchUser();
     }, [userKey]);

     return (
          <main className="h-100">
               <div className="w-100 d-flex flex-column align-items-start mt-5">
                    <a href="/selection" className="my-2">Вернуться</a>
               </div>
               <table className="mt-5 w-100">
                    <tbody>
                         <tr>
                              <td className="border p-3">Имя</td>
                              {compareData.map((user) => (
                                   <td key={user.id} className="border p-3">
                                        <span>{user.name}</span>
                                   </td>
                              ))}
                         </tr>
                         <tr>
                              <td className="border p-3">Професииональные <br />компетенции</td>
                              {compareData.map((user) => (
                                   <td key={user.id} className="border p-3">
                                   <div className="row">
                                        {user.about.skills.map((skill) => (
                                        <span
                                        key={skill}
                                        className={
                                                  "border col-md-auto mx-1 d-flex align-items-center justify-content-center p-1 my-1" +
                                                  (formData.vacancy?.skills.some(
                                                  (s) => s.trim() === skill.trim()
                                                  )
                                                  ? " bg-warning"
                                                  : "")
                                             }
                                        >
                                        {skill}
                                        </span>
                                        ))}
                                   </div>
                                   </td>
                              ))}
                         </tr>
                    </tbody>
               </table>
               <div className="d-flex flex-row mt-2 fs-4">
                         <div className="bg-warning text-warning pe-none">
                              <span>00</span>
                         </div> 
                         <span>&nbsp;- </span>
                         <strong>найденные совпадения с Вашей вакансией</strong>
               </div>
               {
                    userKey && (
                         <div className="mt-auto">
                              <ProfileVacancyView formData={formData}/>
                         </div>
                    )
               }
          </main>
     );
}
export default ComparePage;