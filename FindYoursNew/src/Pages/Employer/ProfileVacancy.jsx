import { useNavigate, useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { allSphere, allArea } from '../../data/category/dataCategory'
import Select from "../../UI/select/Select";
import ContentLoader from "../../UI/ContentLoader";

const ProfileVacancy = ({formData, userKey, editMode}) => {
     const navigate = useNavigate()

     const { id } = useParams();
     
     const [selectedSphere, setSelectedSphere] = useState("");

     const [newService, setnewService] = useState({
          title: '',
          company: '',
          about: '',
          contacts: '',
          status: '',
          money: '',
          sphere: '',
          area: '',
          reply:[],
     })


     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const updatedFormData = {
                    ...formData,
                    vacancy: {
                         ...newService
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
          setnewService((prevState) => ({
               ...prevState,
               [name]: value,
          }))
     }

     const handleSphereChange = (e) => {
          setSelectedSphere(e.target.value);
          setnewService((prevState) => ({
               ...prevState,
               sphere: e.target.value,
          }))
     };
     
     const handleAreaChange = (e) => {
          setnewService((prevState) => ({
               ...prevState,
               area: e.target.value,
          }))
     };

     useEffect(()=>{
          if (formData.vacancy) {
               setnewService(formData.vacancy);
          }
     },[id, formData.service])

     // if(!newService.title){
     //      return (
     //           <ContentLoader/>
     //      )
     // }

     return (
          <main className="content-container mt-5">
               <form onSubmit={handleSubmit} className="d-flex flex-column w-100">
                    {
                         formData?.vacancy?.title ? (
                              <h1 className="h1">Изменение вакансии</h1>
                         )
                         : (
                              <h1 className="h1">Создание вакансии</h1>
                         )
                    }
                    <div className="d-flex flex-column">
                         <label htmlFor="title">Название</label>
                         <input 
                              type="text" 
                              value={newService?.title} 
                              name="title" 
                              id="title" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column">
                         <label htmlFor="company">Название компании</label>
                         <input 
                              type="text" 
                              value={newService?.company} 
                              name="company" 
                              id="company" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <Select
                         options = {allSphere}
                         label = {"Выберите сферу"}
                         value = {newService?.sphere}
                         onChange = {handleSphereChange}
                         name = {'sphere'}
                         customClass = {"mt-3"}
                    />
                    {allArea[newService?.sphere] && (
                         <Select
                              options = {allArea[newService?.sphere]}
                              label = {"Выберите направление"}
                              value = {newService?.area}
                              onChange = {handleAreaChange}
                              name = {'area'}
                              customClass = {"mt-3"}
                         />
                    )}
                    <div className="d-flex flex-column flex-wrap align-items-start justify-content-between mb-1 w-100 mt-3">
                         <label htmlFor="status">Статус вакансии</label>
                         <select 
                              name="status" 
                              id="status" 
                              className="border mt-2 py-1 px-2 w-100 rounded"
                              onChange={handleChange}
                              value={newService?.status}>
                              value = {newService?.status}
                              <option value={""}></option>
                              <option value="true">Открыта</option>
                              <option value="false">Закрыта</option>
                         </select>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="about">Кратко о вакансии</label>
                         <textarea 
                              type="text" 
                              value={newService?.about} 
                              name="about" 
                              id="about" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="company">Зарплата(в рублях)</label>
                         <input 
                              type="text" 
                              value={newService?.money} 
                              name="money" 
                              id="money" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="company">Контактные данные</label>
                         <input 
                              type="text" 
                              value={newService?.contacts} 
                              name="contacts" 
                              id="contacts" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"/>
                    </div>
                    <div className="d-flex justify-content-center w-100">
                              <input type="submit" value="Сохранить" id="formSumbit" className="mt-3 rounded py-3 px-4 mx-2"/>
                              <a href="/profile" className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border">Вернуться без изменений</a>
                    </div>
               </form>
          </main>
     );
}
export default ProfileVacancy;