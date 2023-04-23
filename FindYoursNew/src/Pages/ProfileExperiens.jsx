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

     useEffect(()=>{
          if (id && formData.experiens[id]) {
               setNewExperiens(formData.experiens[id]);
          }
     },[id, formData.experiens])

     return (
          <form onSubmit={handleSubmit} className="d-flex flex-column">
               <h1 className="h1">Место работы</h1>
               <div className="d-flex flex-row">
                    <label htmlFor="nameComp">Имя</label>
                    <input type="text" value={newExperiens?.nameComp} name="nameComp" id="nameComp" onChange={handleChange}/>
               </div>
               <div className="d-flex flex-row">
                    <label htmlFor="time">Начало и конец работы</label>
                    <div className="d-flex flex-row">
                         <input type="date" name="time1" id="time1" onChange={handleDateChange} value={newExperiens?.time?.date1}/>
                         <input type="date" name="time2" id="time2" onChange={handleDateChange} value={newExperiens?.time?.date2} disabled={isNow} />
                         <div className="d-flex flex-row">
                              <label htmlFor="timeEnd">По настоящее время</label>
                              <input type="checkbox" name="timeEnd" id="timeEnd" value={newExperiens?.time?.now} onChange={handleDateChange}/>
                         </div>
                    </div>
               </div>
               <div className="d-flex flex-row">
                    <label htmlFor="position">Должность</label>
                    <input type="text" name="position" value={newExperiens?.position} id="position" onChange={handleChange}/>
               </div>
               <div className="d-flex flex-row">
                    <label htmlFor="about">Расскажите про свою роль</label>
                    <textarea type="text" name="about" value={newExperiens?.about} id="about" onChange={handleChange}/>
               </div>
               <div className="d-flex flex-row align-items-center border">
                    <label htmlFor="newSkill">Профессиональнальные компетенции</label>
                         <div className="d-flex flex-row flex-wrap border">
                         {
                              newExperiens?.skills?.map((skill, idx) => (
                                   <div key={idx} className="border profile-skill" onClick={() => handleRemoveSkill(skill)}>{skill}</div>
                              ))
                         }
                         </div>
                    <input type="text" name="newSkill" id="newSkill" placeholder="Введите навык" />
                    <button type="button" onClick={handleAddSkill} id="addNewSkill" className=""><i className="bi bi-check2"></i></button>
               </div>
               <input type="submit" value="submit" />
          </form>
     );
}
export default ProfileAddExperiens;