import AllReplyView from '../../UI/output/AllReplyView';
import ProfileViewExperiens from '../../UI/output/ProfileViewExperiens';

const FullProfile = ({formData, compareShow, role}) => {
     console.log("role", role)
     return (
          <main className="content-container mt-5">
               {
                    compareShow ? (
                         <h1 className="h1">Профиль {formData?.name} {formData?.family_name}</h1>
                    )
                    : (
                         <h1 className="h1">Мой профиль</h1>
                    )
               }
               <div className="row">
                    <div className="row col-md-8 h-100">
                         <div className="col-md-6">
                              <div className="content-box">
                                   <div className="d-flex flex-row justify-content-between">
                                        <div className="">
                                             <h3 className="h3">{formData?.name} <br /> {formData?.family_name}</h3>
                                        </div>
                                        {
                                             !compareShow && (
                                                  <a href="/profile/edit/personal" className="text-primary">Изменить</a>
                                             )
                                        }
                                        
                                   </div>
                                   {
                                        formData?.location && (
                                             <div className="d-flex flex-row mt-3 fs-6">
                                                  <i className="bi bi-pin-map"></i>
                                                  <span className='ms-2 pe-none'>{formData.location}</span>
                                             </div>
                                        )
                                   }
                                   {
                                        formData?.birthday && (
                                             <div className="d-flex flex-row mt-3 fs-6">
                                                  <i className="bi bi-balloon"></i>
                                                  <span className='ms-2 pe-none'>{formData.birthday}</span>
                                             </div>
                                        )
                                   }
                                   {
                                        formData?.tel && (
                                             <div className="d-flex flex-row mt-3 fs-6">
                                                  <i className="bi bi-telephone-outbound"></i>
                                                  <span className='ms-2' role='button'>{formData.tel}</span>
                                             </div>
                                        )
                                   }
                              </div>

                         </div>
                         <div className="col-md-6">
                              {
                                   role=== "admin" || role==="spec" || role === undefined ?
                                   (
                                        <div className="content-box">
                                   <div className="d-flex flex-row w-100 justify-content-between">
                                        <h3 className="h3">О себе</h3>
                                        {
                                             !compareShow && (
                                                  <a href="/profile/edit/about" className='text-primary'>Изменить</a>
                                             )
                                        }
                                   </div>
                                   {
                                        formData?.about?.text && (
                                             <div>
                                                  {
                                                       formData?.about?.text
                                                  }
                                             </div>
                                        )
                                        
                                   }
                                   <div className="">
                                        <h4 className="h4 mt-4">Компетенции</h4>
                                        <div className="row ps-2">
                                             {
                                                  formData?.about?.skills?.map((skill, idx) => (
                                                       <div key={idx} 
                                                            className="border col-md-auto 
                                                                 mx-1 my-1 d-flex 
                                                                 align-items-center 
                                                                 justify-content-center p-1 
                                                                 profile-skill">
                                                            {skill}
                                                       </div>
                                                  ))
                                             }
                                        </div>
                                   </div>
                              </div>
                              )
                              : null
                              }
                         </div>
                         {
                              role === "spec" || role === undefined ?
                              (
                                   <div className="col-md-12 ">
                                        <div className="content-box mt-4 h-100">
                                             <div className="d-flex flex-row flex-wrap w-100 justify-content-between">
                                             {
                                                  compareShow ? (
                                                       <h3 className="h3">Оказываемая услуга</h3>
                                                  )
                                                  : (
                                                       <h3 className="h3">Ваша услуга</h3>
                                                  )
                                             }
                                                  {
                                                       !compareShow && (
                                                            <a href="/profile/service" className="ms-3 text-primary">
                                                                 Изменить
                                                            </a>
                                                       )
                                                  }
                                                  
                                             </div>
                                             <div className="d-flex">
                                                  {
                                                       formData.service?.title && (
                                                            <div className="d-flex flex-column align-items-start">
                                                                 <div className="d-flex flex-row align-items-start">
                                                                      <h5 className="h5">
                                                                           {formData.service?.title}
                                                                      </h5>
                                                                      <div className="border border-primary py-1 px-3 d-flex align-items-center ms-3 pe-none border-2">
                                                                           {formData.service?.sphere}
                                                                      </div>
                                                                 </div>
                                                       
                                                                 <div className="d-flex flex-column mt-3">
                                                                      <strong>Описание:</strong>
                                                                      <p className='mt-2'>
                                                                           {formData.service?.about}
                                                                      </p>
                                                                 </div>
                                                            </div>
                                                       )
                                                  }
                                             </div>
                                        </div>
                         </div>
                         )
                         : null
                         }
                         {
                              role === "employee" || role === "admin" || role === "employer" ? (
                                   <div className="col-md-12 mt-3">
                                        <div className="content-box mt-4 h-100">
                                             <div className="d-flex flex-row flex-wrap w-100 justify-content-between">
                                                  <h3 className="h3">Ваша вакансия</h3>
                                                  <a href="/employer/vacancy" className="ms-3 text-primary">
                                                       Изменить
                                                  </a>
                                             </div>
                                             <div className="d-flex">
                                             {
                                             formData.vacancy?.title && (
                                                  <div className="d-flex flex-column align-items-start">
                                                       <div className="row align-items-start">
                                                            <h5 className="h5 col-md-6">
                                                                 {formData.vacancy?.title} в {formData.vacancy?.company}
                                                            </h5>
                                                            <div className="col-md-6 d-flex flex-row flex-wrap">
                                                                 <div className="border border-primary py-1 px-3 d-flex align-items-center ms-3 pe-none border-2 my-2">
                                                                      {formData.vacancy?.area}
                                                                 </div>
                                                                 <div className={"border border-primary py-1 px-3 d-flex align-items-center ms-3 pe-none border-2 my-2"}>
                                                                      {
                                                                           formData.vacancy?.status === "true" ?
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
                                                                      {formData.vacancy?.about}
                                                                 </p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                 <div className="d-flex flex-column">
                                                                      <strong>Зарплата:</strong>
                                                                      <p className='mt-2'>
                                                                           {formData.vacancy?.money} BYN
                                                                      </p>
                                                                 </div>
                                                                 <div className="d-flex flex-column">
                                                                      <strong>Контакты:</strong>
                                                                      <p className='mt-2'>
                                                                           {formData.vacancy?.contacts}
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
                              )
                              : null
                         }
                    </div>
                    
                    <div className="col-md-4 h-100">
                         {
                              role != "employee" && role != "employer" && (
                                   <div className="content-box mb-4">
                                        <div className="d-flex flex-row justify-content-between">
                                                  <h3 className="h3">Опыт работы</h3>
                                                  {
                                                       !compareShow && (
                                                            <a href="/profile/add/experiens" className="text-primary">Добавить</a>
                                                       )
                                                  }
                                                  
                                        </div>
                                        <ProfileViewExperiens profileData={formData} compareShow={compareShow}/>
                                   </div>
                              )
                         }
                         
                         {
                              role === "employee" || role === "admin" || role === "employer" && !compareShow ? (
                                   <div className="content-box h-100">
                                        <div className="d-flex flex-row justify-content-between">
                                                  <h3 className="h3">Отклики</h3>
                                        </div>
                                        <AllReplyView profileData={formData}/>
                                   </div>
                              )
                              : null
                         }
                    </div>
               </div>
          </main>
     );
}
export default FullProfile;