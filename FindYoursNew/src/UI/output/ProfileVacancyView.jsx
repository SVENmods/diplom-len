const ProfileVacancyView = ({formData}) => {
     return (
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
                              <div className="d-flex flex-column">
                                   <strong>Компетенции</strong>
                                   <div className="row ps-2 mt-2">
                                   {
                                        formData?.vacancy?.skills?.map((skill, idx) => (
                                             <div key={idx} 
                                                  className="border col-md-auto 
                                                       mx-1 my-1 d-flex 
                                                       align-items-center 
                                                       justify-content-center p-1 
                                                       profile-skill"
                                                  id={"skill" + idx}>
                                                  {skill}
                                             </div>
                                        ))
                                   }
                              </div>
                              </div>
                              
                         </div>
                              )
                         }
                    </div>
               </div>
          </div>
     );
}

export default ProfileVacancyView;