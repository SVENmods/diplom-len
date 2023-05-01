import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement, Title, Legend} from 'chart.js/auto'
Chart.register(ArcElement, Title, Legend);

const AdminPage = () => {
     const [data, setData] = useState({});
     const [spheresData, setSpheresData] = useState({});
     const [skillsData, setSkillsData] = useState({});

     useEffect(() => {
     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               const usersData = response.data.data;
           // Сбор данных о сферах
          const spheres = Object.keys(usersData).reduce((acc, userID) => {
               const sphere = usersData[userID].about.sphere;
               if (sphere !== undefined) {
                    if (acc[sphere]) {
                         acc[sphere]++;
                    } else {
                         acc[sphere] = 1;
                    }
               }
               return acc;
          }, {});
          setSpheresData(spheres);

           // Сбор данных о навыках
          const skills = Object.keys(usersData).reduce((acc, userID) => {
               const userSkills = usersData[userID].about.skills;
               userSkills.forEach((skill) => {
                    if (skill !== undefined) {
                         if (acc[skill]) {
                              acc[skill]++;
                         } else {
                              acc[skill] = 1;
                         }
                    }
               });
               return acc;
          }, {});
          setSkillsData(skills);

           // Сохранение данных о пользователях
          setData(usersData);
          } catch (error) {
               console.error("Error fetching data:", error);
     }
     };
     fetchData();
     }, []);

     return (
     <main className="content-container mt-5 row">
          <div className="content-box">
               <h1 className="h1">Графики</h1>
               <div className="row w-100">
                    <div className="col-md-4 p-3">
                    {Object.keys(spheresData).length > 0 && (
                         <Pie
                              data={{
                              labels: Object.keys(spheresData),
                              datasets: [
                              {
                                   label: "Сферы",
                                   data: Object.values(spheresData),
                                   backgroundColor: [
                                        "#ff6384",
                                        "#36a2eb",
                                        "#ffce56",
                                        "#cc65fe",
                                        "#ffa726",
                                   ],   
                                   hoverBackgroundColor: [
                                        "#ff6384",
                                        "#36a2eb",
                                        "#ffce56",
                                        "#cc65fe",
                                        "#ffa726",
                                   ],
                              },   
                         ],
                    }}
                    options={{
                         title: {
                              display: true,
                              text: "Распределение пользователей по сферам",
                         },
                              maintainAspectRatio: false,
                         }}/>
                    )
                    }
                    
                    </div>
                    <div className="col-md-4 p-3">
                    {Object.keys(skillsData).length > 0 && (
                         <Pie
                         data={{
                              labels: Object.keys(skillsData),
                              datasets: [
                              {
                                   label: "Копетенции",
                                   data: Object.values(skillsData),
                                   backgroundColor: [
                                        "#ff6384",
                                        "#36a2eb",
                                        "#ffce56",
                                        "#cc65fe",
                                        "#ffa726",
                                   ],   
                                   hoverBackgroundColor: [
                                        "#ff6384",
                                        "#36a2eb",
                                        "#ffce56",
                                        "#cc65fe",
                                        "#ffa726",
                                   ],
                              },   
                         ],
                    }}
                    options={{
                         title: {
                              display: true,
                              text: `Распределение навыков пользователей`,
                              fontSize: 25
                         },
                         legend: {
                              display: true,
                              position: "bottom"
                         }
                         }}
                         />
                    )}
                    </div>
               </div>
          </div>
     </main>          
     );
}    
export default AdminPage;