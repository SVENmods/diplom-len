import { useAuth0 } from "@auth0/auth0-react";
import ProfileViewExperiens from '../../UI/output/ProfileViewExperiens';

const ProfilePage = ({formData}) => {
     const {user} = useAuth0()

     return (
          <main>
               <h1 className="h1">Мой профиль</h1>
               <div className="content-box">
                    <h3 className="h3">{formData?.name} {formData?.family_name}</h3>
                    <br />
                    <a href="/profile/edit/personal">редактировать</a>
               </div>
               <div className="content-box">
                    <h3 className="h3">О себе</h3>
                    <a href="/profile/edit/about">редактировать</a>
                    {
                         formData?.about?.text && (
                              <pre>
                                   {
                                        formData?.about?.text
                                   }
                              </pre>
                         )
                         
                    }
                    <h4 className="h4">Компетенции</h4>
                    <div className="d-flex flex-row flex-wrap">
                                   {
                                        formData?.about.skills?.map((skill, idx) => (
                                             <div key={idx} className="border profile-skill">{skill}</div>
                                        ))
                                   }
                    </div>
               </div>
               <div className="content-box">
                    <h3 className="h3">Опыт работы</h3>
                    <a href="/profile/add/experiens">добавить новый</a>
                    <ProfileViewExperiens profileData={formData}/>
               </div>
          </main>
     );
}

export default ProfilePage;