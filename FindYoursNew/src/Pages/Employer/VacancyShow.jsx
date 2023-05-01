import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const VacancyShow = ({userKey}) => {

     const { id } = useParams();
     const [vacancyData, setVacancyData] = useState()

     useEffect(() => {
          const fetchData = async () => {
               try {
               const response = await axios.get(`http://localhost:8000/profiles/${id}`);
               const data = response.data.data.vacancy
               setVacancyData(data)
               } catch (error) {
                    console.error("Error fetching data:", error);
                    return null;
               }
          };
          fetchData()
     }, [])

     const userReply = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles/${id}`);
               const formData = response.data.data;
               if (!vacancyData.reply) {
                    vacancyData.reply = [];
               }
               if (!vacancyData.reply.includes(userKey)) {
                    vacancyData.reply.push(userKey);
               }
               const updatedFormData = {
                    ...formData,
                    vacancy: {
                         ...vacancyData
                    }
               };
               const sendReply = await axios.put(`http://localhost:8000/profiles/${id}`, {
                    data: updatedFormData
               });
               if (sendReply.status >= 200 && sendReply.status < 300 && sendReply.data) {
                    window.location.reload()
               }
                    } catch (error) {
               console.error("Error replying to vacancy:", error);
          }
     };
     
     if (!vacancyData) {
          return <div className="loader"></div>
     }

     return (
          <main className="content-container">
               <div className="col-md-12 mt-3">
                    <div className="content-box mt-4 h-100">
                         <div className="d-flex flex-row flex-wrap w-100 justify-content-between">
                              <h3 className="h3">Вакансия</h3>
                              {
                                   id != userKey && (
                                        <div className="">
                                             {
                                             vacancyData.reply.includes(userKey) ? (
                                                  <span className=" text-success">Вы уже откикнулись</span>
                                             )
                                             : (
                                                  <a
                                                       className="ms-3 text-primary"
                                                       onClick={userReply}
                                                       role="button">
                                                       Откликнуться
                                                  </a>
                                             )
                                        }
                                        </div>
                                   )
                              }
                         </div>
                         <div className="d-flex">
                         {
                         vacancyData?.title && (
                              <div className="d-flex flex-column align-items-start">
                                   <div className="row align-items-start">
                                        <h5 className="h5 col-md-6">
                                             {vacancyData?.title} в {vacancyData?.company}
                                        </h5>
                                        <div className="col-md-6 d-flex flex-row flex-wrap">
                                             <div className="border border-primary py-1 px-3 d-flex align-items-center ms-3 pe-none border-2 my-2">
                                                  {vacancyData?.area}
                                             </div>
                                             <div className={"border border-primary py-1 px-3 d-flex align-items-center ms-3 pe-none border-2 my-2"}>
                                                  {
                                                       vacancyData?.status === "true" ?
                                                       (
                                                            <span className='text-success'>Открыта</span>
                                                       )
                                                       :
                                                       (
                                                            <span className='text-danger'>Закрата</span>
                                                       )
                                                  }
                                             </div>
                                        </div>
                                   </div>
                                   <div className="row mt-3 w-100">
                                        <div className="d-flex flex-column col-md-6">
                                             <strong>Описание:</strong>
                                             <p className='mt-2'>
                                                  {vacancyData?.about}
                                             </p>
                                        </div>
                                        <div className="col-md-6">
                                             <div className="d-flex flex-column">
                                                  <strong>Зарплата:</strong>
                                                  <p className='mt-2'>
                                                       {vacancyData?.money} BYN
                                                  </p>
                                             </div>
                                             <div className="d-flex flex-column">
                                                  <strong>Контакты:</strong>
                                                  <p className='mt-2'>
                                                       {vacancyData?.contacts}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                                   
                                   
                              </div>
                                   )
                              }
                         </div>
                    </div>
               </div>
                    
          </main>
     );
}
export default VacancyShow;