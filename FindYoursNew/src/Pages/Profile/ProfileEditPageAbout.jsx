import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Select from "../../UI/select/Select";
import { allSphere, allArea } from '../../data/category/dataCategory'
import '../../assets/css/components/form.scss'


const ProfileEditPageAbout = ({formData, onUserDataChange, userKey}) => {

     const navigate = useNavigate()

     const [selectedSphere, setSelectedSphere] = useState("");

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

     const handleSphereChange = (event) => {
          setSelectedSphere(event.target.value);
          onUserDataChange({ ...formData, about: { ...formData.about, sphere: event.target.value } });
     };
     
     const handleAreaChange = (event) => {
          onUserDataChange({ ...formData, about: { ...formData.about, area: event.target.value } });
     };

     useEffect(()=>{
          if(formData?.about.skills){
               setNewSkill([...formData?.about.skills])
          }
          if(formData?.about.sphere){
               setSelectedSphere(formData?.about.sphere)
          }
     },[])

     return (
          <main className="content-container mt-5">
               <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                    <div className="d-flex flex-column align-items-start">
                         <label htmlFor="about.text">О себе</label>
                         <textarea 
                              type="text" 
                              value={formData?.about.text} 
                              name="about.text" 
                              id="about.text" 
                              onChange={handleChange}
                              className="w-100 border rounded mt-2"/>
                    </div>
                    <Select
                              options = {allSphere}
                              label = {"Выберите сферу"}
                              value = {formData.about.sphere}
                              onChange = {handleSphereChange}
                              name = {'about.sphere'}
                              customClass = {"mt-3"}
                              required={true}
                         />

                    {allArea[formData.about.sphere] && (
                         <Select
                              options = {allArea[formData.about.sphere]}
                              label = {"Выберите направление"}
                              value = {formData.about.area}
                              onChange = {handleAreaChange}
                              name = {'about.area'}
                              customClass = {"mt-3"}
                         />
                    )}
                    <div className="d-flex flex-column align-items-start mt-3 w-100">
                         <label htmlFor="newSkill">Профессиональнальные компетенции</label>
                         <div className="d-flex flex-column mt-2 w-100">
                              <div className="d-flex flex-row flex-wrap">
                                   {
                                        formData?.about.skills
                                        ?.map((skill, idx) => (
                                             <div 
                                                  key={idx} 
                                                  className="me-2 my-1 text-center" 
                                                  >
                                                       <div 
                                                            className="border profile-skill d-flex text-center p-2 rounded "
                                                            >
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
                    </div>
               </form>
               
          </main>
     );
}

export default ProfileEditPageAbout;