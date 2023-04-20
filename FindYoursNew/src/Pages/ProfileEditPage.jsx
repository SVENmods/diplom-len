import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

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

     useEffect(()=>{
          document.querySelector('#birthday').max = new Date().toISOString().split("T")[0];

     },[])

     return (
          <main>
               <form onSubmit={handleSubmit} className="d-flex flex-column">
                    <div className="d-flex flex-row">
                         <label htmlFor="name">Имя</label>
                         <input type="text" value={formData?.name} name="name" id="name" onChange={handleChange}/>
                    </div>
                    <div className="d-flex flex-row">
                         <label htmlFor="family_name">Фамилия</label>
                         <input type="text" value={formData?.family_name} name="family_name" id="family_name" onChange={handleChange}/>
                    </div>
                    <div className="d-flex flex-row">
                         <label htmlFor="birthday">Дата рождения</label>
                         <input type="date" value={formData?.birthday} name="birthday" id="birthday" onChange={handleChange}/>
                    </div>
                    <div className="d-flex flex-row">
                    <select name="location">
                         {mapLocation.map((data, index) => (
                         <option key={index} value={data}>
                         {data}
                         </option>
                         ))}
                    </select>
                    </div>
                    <input type="submit" value="submit" />
               </form>
               
          </main>
     );
}

export default ProfileEditPage;