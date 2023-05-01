import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";
import Select from "../../UI/select/Select";
import ContentLoader from "../../UI/ContentLoader";

const ProfileEditPage = ({formData, onUserDataChange, userKey}) => {

     const navigate = useNavigate()
     const mapLocation = ['Минск','Витебск','Могилев','Гродно','Брест','Гомель','Москва','Санкт-Петербург']

     const handleChange = (e) => {
          // console.log("e.value", e.target.value)
          const { name, value } = e.target;
          onUserDataChange({ [name]: value });
     }
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const response = await axios.put(`http://localhost:8000/profiles/${userKey}`, {
                    data: formData,
               });
               navigate('/profile')
          } catch (error) {
               console.error("Error updating data:", error);
          }
     };

     if(!userKey){
          return (
               <ContentLoader/>
          )
     }

     return (
          <main className="content-container mt-5">
               <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="d-flex flex-column">
                         <label htmlFor="name">Имя</label>
                         <input 
                              type="text" 
                              value={formData?.name} 
                              name="name" 
                              id="name" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"
                              required={true}/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="family_name">Фамилия</label>
                         <input 
                              type="text" 
                              value={formData?.family_name} 
                              name="family_name" 
                              id="family_name" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"
                              required={true}/>
                    </div>
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="birthday">Дата рождения</label>
                         <input 
                              type="date" 
                              value={formData?.birthday} 
                              name="birthday" 
                              id="birthday" 
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"
                              onClick={()=>{
                                   document.querySelector('#birthday').max = new Date().toISOString().split("T")[0];
                              }}/>
                    </div>
                    <Select
                         options = {mapLocation}
                         label = {"Город"}
                         value = {formData?.location}
                         onChange = {handleChange}
                         name = {'location'}
                         customClass = {"mt-3"}
                         required={true}
                    />
                    <div className="d-flex flex-column mt-3">
                         <label htmlFor="tel">Телефон</label>
                         <InputMask
                              mask="80 (99) 999-99-99"
                              maskChar=""
                              id="tel"
                              type="tel"
                              placeholder="80 (123) 678-91-12"
                              value={formData?.tel}
                              name="tel"
                              onChange={handleChange}
                              className="w-100 border py-1 px-2 mt-2 rounded"
                              required={true}
                         />
                    </div>
                    <div className="d-flex justify-content-center w-100">
                              <input type="submit" value="Сохранить" id="formSumbit" className="mt-3 rounded py-3 px-4 mx-2"/>
                              <a href="/profile" className="mt-3 rounded py-3 px-4 mx-2 bg-light-subtle border">Вернуться без изменений</a>
                    </div>
               </form>
               
          </main>
     );
}

export default ProfileEditPage;