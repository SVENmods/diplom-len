import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

const ProfileEditPageAbout = ({formData, onUserDataChange, userKey}) => {

     const navigate = useNavigate()

     const [newSkill, setNewSkill] = useState([])

     const handleChange = (e) => {
     const { name, value } = e.target
     onUserDataChange({
          about: {
               ...formData.about,
               [name.split('.')[1]]: value,
          },
          })
     };

     const handleAddSkill = () => {
          const newSkillValue = document.querySelector("#newSkill").value;
          if (newSkillValue && newSkill.length < 10) {
               setNewSkill([...newSkill, newSkillValue]);
               onUserDataChange({
                    about: {
                         ...formData.about,
                         skills: [...formData.about.skills, newSkillValue],
                         },
                    });
               } 
               document.querySelector("#newSkill").value = '';
               
     } 

     const handleRemoveSkill = (skillToRemove) => {
          setNewSkill(newSkill.filter(skill => skill !== skillToRemove));
          onUserDataChange({
               about: {
                    ...formData.about,
                    skills: formData.about.skills.filter(skill => skill !== skillToRemove),
               },
          });
     }

     const handleSubmit = async (e) => {
          e.preventDefault()
          try {
               const response = await axios.put(`http://localhost:8000/profiles/${userKey}`, {
                    data: formData,
               });
               navigate('/profile')
          } catch (error) {
               console.error("Error updating data:", error);
          }
     };

     useEffect(()=>{
          if(formData?.about.skills){
               setNewSkill([...formData?.about.skills])
          }
     },[])

     return (
          <main>
               <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="d-flex flex-row align-items-center border">
                         <label htmlFor="about.text">О себе</label>
                         <textarea type="text" value={formData?.about.text} name="about.text" id="about.text" onChange={handleChange}/>
                    </div>
                    <div className="d-flex flex-row align-items-center border">
                         <label htmlFor="newSkill">Профессиональнальные компетенции</label>
                              <div className="d-flex flex-row flex-wrap border">
                              {
                                   formData?.about.skills?.map((skill, idx) => (
                                        <div key={idx} className="border profile-skill" onClick={() => handleRemoveSkill(skill)}>{skill}</div>
                                   ))
                              }
                              </div>
                         <input type="text" name="newSkill" id="newSkill" placeholder="Введите навык" />
                         <button type="button" onClick={handleAddSkill} id="addNewSkill" className=""><i className="bi bi-check2"></i></button>
                    </div>
                    <input type="submit" value="submit" />
               </form>
               
          </main>
     );
}

export default ProfileEditPageAbout;