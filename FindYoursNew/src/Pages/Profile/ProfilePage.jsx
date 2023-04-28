import { useAuth0 } from "@auth0/auth0-react";
import ProfileViewExperiens from '../../UI/output/ProfileViewExperiens';

const ProfilePage = ({formData}) => {
     const {user} = useAuth0()

     return (
          <main>
               <h1 className="h1">Мой профиль</h1>
               <div className="row">
                    <div className="col-md-4">
                         <div className="content-box h-100">
                              <div className="d-flex flex-row align-items-end justify-content-between">
                                   <h3 className="h3">{formData?.name} {formData?.family_name}</h3>
                                   <a href="/profile/edit/personal" className="mb-3">редактировать</a>
                              </div>
                         </div>
                    </div>
                    
                    <div className="col-md-4">
                         <div className="content-box h-100">
                              <div className="d-flex flex-row w-100 align-items-center justify-content-between">
                                   <h3 className="h3">О себе</h3>
                                   <a href="/profile/edit/about">редактировать</a>
                              </div>
                              {
                                   formData?.about?.text && (
                                        <pre>
                                             {
                                                  formData?.about?.text
                                             }
                                        </pre>
                                   )
                                   
                              }
                              <h4 className="h4 mt-4">Компетенции</h4>
                              <div className="row ps-2">
                                   {
                                        formData?.about.skills?.map((skill, idx) => (
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
                    <div className="col-md-4">
                         <div className="content-box h-100">
                         <h3 className="h3">Опыт работы</h3>
                         <a href="/profile/add/experiens">добавить новый</a>
                         <ProfileViewExperiens profileData={formData}/>
                         </div>
                    </div>
                    <div className="col-md-12">
                         <div className="content-box mt-4 h-100">
                              <h3 className="h3">Ваша услуга</h3>
                              <a href="/profile/add/service">Создать</a>
                         </div>
                    </div>
               </div>
          </main>
     );
}

export default ProfilePage;