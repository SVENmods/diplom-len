import { useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfileAddExperiens = ({formData, userKey, editMode}) => {
     const navigate = useNavigate()

     const { id } = useParams();
     
     const [newSkill, setNewSkill] = useState([])

     const [isNow, setIsNow] = useState()

     const [newExperiens, setNewExperiens] = useState({
          nameComp: '',
          time: {
               date1: "",
               date2: "",
               now: false
          },
          position: '',
          about: '',
          skills: [],
     })


     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               let newId = id;
               if (!newId) {
                    const allIds = Object.keys(formData.experiens);
                    do {
                    newId = Math.floor(Math.random() * 1000);
               } while (allIds.includes(newId.toString()));
               }
               const updatedFormData = {
                    ...formData,
                    experiens: {
                         ...formData.experiens,
                         [newId]: { ...newExperiens }
                    }
               };
               const response = await axios.put(`http://localhost:8000/profiles/${userKey}`, {
                    data: updatedFormData
               });
               navigate('/profile');
               window.location.reload();
          } catch (error) {
               console.error("Error updating data:", error);
          }
     };

     const handleChange = (e) => {
          const value = e.target.value
          const name = e.target.name
          setNewExperiens((prevState) => ({
               ...prevState,
               [name]: value,
          }))
     }

     const handleDateChange = (e) => {
          const { name, value } = e.target;
          if (name === 'time1') {
               setNewExperiens((prev) => ({ ...prev, time: { ...prev.time, date1: value } }));
          } else if (name === 'time2') {
               setNewExperiens((prev) => ({ ...prev, time: { ...prev.time, date2: value } }));
          } else if (name === 'timeEnd') {
               setNewExperiens((prev) => ({ ...prev, time: { ...prev.time, now: event.target.checked } }));
               setIsNow(e.target.checked);
          }
     };

     const handleAddSkill = () => {
          const newSkillValue = document.querySelector("#newSkill").value;
          if (newSkillValue && newExperiens.skills.length < 10) {
               setNewSkill([...newSkill, newSkillValue]);
               setNewExperiens((prevState) => ({
               ...prevState,
               skills: [...prevState.skills, newSkillValue],
               }));
          }
          document.querySelector("#newSkill").value = '';
     };

     const handleRemoveSkill = (skillToRemove) => {
          setNewSkill(newSkill.filter(skill => skill !== skillToRemove));
          setNewExperiens((prevState) => ({
               ...prevState,
               skills: prevState.skills.filter(skill => skill !== skillToRemove),
          }));
     };

     const deleteExperience = async (id) => {
          try {
               const response = await axios.put(
                    `http://localhost:8000/profiles/${userKey}`,
               {
                    data: {
                    ...formData,
                    experiens: {
                         ...formData.experiens,
                         [id]: undefined
                         }
                    }
               }
               );
               navigate('/profile');
               window.location.reload();
          } catch (error) {
               console.error('Error deleting experience:', error);
               }
          };

     useEffect(()=>{
          if (id && formData.experiens[id]) {
               setNewExperiens(formData.experiens[id]);
          }
     },[id, formData.experiens])

     return (
          <main className="content-container mt-5">
               <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                    <h1 className="h1">Место работы</h1>
                    <div className="d-flex flex-column">
                         <label htmlFor="nameComp">Название компании</label>
                         <input 
                              type="text" 
                              value={newExperiens?.nameComp} 
                              name="nameComp" 
                              id="nameComp" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="time">Начало и конец работы</label>
                         <div className="d-flex flex-row align-items-center">
                              <input 
                                   type="date" 
                                   name="time1" 
                                   id="time1" 
                                   onChange={handleDateChange} 
                                   value={newExperiens?.time?.date1}
                                   className="border py-1 px-2 mt-2 rounded"
                                   onClick={()=>{
                                        document.querySelector('#time1').max = new Date().toISOString().split("T")[0];
                                   }}/>
                              <input 
                                   type="date" 
                                   name="time2" 
                                   id="time2" 
                                   onChange={handleDateChange} 
                                   value={newExperiens?.time?.date2} 
                                   disabled={isNow} 
                                   className="border py-1 px-2 mt-2 rounded ms-3"
                                   onClick={()=>{
                                        document.querySelector('#time2').max = new Date().toISOString().split("T")[0];
                                   }}/>
                                   
                              <div className="d-flex flex-row align-items-center ms-3 py-1 px-2">
                                   <label htmlFor="timeEnd">По настоящее время</label>
                                   <input 
                                        type="checkbox" 
                                        name="timeEnd" 
                                        id="timeEnd" 
                                        value={newExperiens?.time?.now} 
                                        onChange={handleDateChange}
                                        className="ms-2"
                                        style={{width:'15px', height:'15px'}}/>
                              </div>
                         </div>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="position">Должность</label>
                         <input 
                              type="text" 
                              name="position" 
                              value={newExperiens?.position} 
                              id="position" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="about">Расскажите про свою роль</label>
                         <textarea 
                              type="text" 
                              name="about" 
                              value={newExperiens?.about} 
                              id="about" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column align-items-start mt-3 w-100">
                         <label htmlFor="newSkill">Профессиональнальные компетенции</label>
                              <div className="d-flex flex-column mt-2 w-100">
                              <div className="d-flex flex-row flex-wrap">
                                   {
                                   newExperiens?.skills?.map((skill, idx) => (
                                        <div 
                                             key={idx} 
                                             className="me-2 my-1 text-center" >
                                             <div 
                                                  className="border profile-skill d-flex text-center p-2 rounded">
                                                            <span className="">{skill}</span>
                                                            <a
                                                                 className="bi bi-x-square ms-2 fs-5 pe-auto" 
                                                                 onClick={() => handleRemoveSkill(skill)}></a>
                                             </div>
                                        </div>
                                   ))
                                   }
                              </div>
                                   <div className="d-flex flex-row border rounded py-1 px-2 pe-1 mt-2 w-100">
                                        <input type="text" name="newSkill" id="newSkill" placeholder="Введите компетенцию" className="w-100"/>
                                        <button type="button" onClick={handleAddSkill} id="addNewSkill" className="ms-2"><i className="bi bi-check-square"></i></button>
                                   </div>
                              </div>
                         </div>
                    <div className="d-flex justify-content-center w-100">
                         <input type="submit" value="Сохранить" id="formSumbit" className="mt-3 rounded py-3 px-4 mx-2"/>
                         <a href="/profile" className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border">Вернуться без изменений</a>
                         {
                              id && (
                                   <a className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border" onClick={()=>{deleteExperience(id)}} role="button">Удалить запись</a>
                              )
                         }
                    </div>
               </form>
          </main>
     );
}
export default ProfileAddExperiens;