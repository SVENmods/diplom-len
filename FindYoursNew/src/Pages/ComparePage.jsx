import { useState, useEffect } from "react";
import axios from "axios";

const ComparePage = () => {
     const [compareData, setCompareData] = useState([])

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               const filteredData = Object.entries(response.data.data)
               .filter(([id]) => getAddToCheckFromStorage().includes(id))
               .map(([id, user]) => ({ id, ...user }));
               setCompareData(filteredData);
               console.log('filteredData IN COMPARE PAGE', filteredData)
          } catch (error) {
               console.error("Error fetching data:", error);
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

     return (
          <main>
               <table>
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
                              <td className="border p-3">Професииональные компетенции</td>
                              {compareData.map((user) => (
                                   <td key={user.id} className="border p-3">
                                        <div className="row">{
                                             user.about.skills.map((skill) => (
                                                  <span key={skill} 
                                                       className="border col-md-auto mx-1 d-flex align-items-center justify-content-center p-1">
                                                            {skill}
                                                  </span>
                                             ))
                                        }</div>
                                   </td>
                              ))}
                         </tr>
                    </tbody>
               </table>
               <a href="/selection">Вернуться</a>
          </main>
     );
}
export default ComparePage;