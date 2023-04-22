import { useAuth0 } from "@auth0/auth0-react";

const ProfilePage = ({formData}) => {
     const {user} = useAuth0()

     return (
          <main>
          <h1 className="h1">Мой профиль</h1>
          <div className="content-box">
               <h2 className="h2">{formData?.name} {formData?.family_name}</h2>
               <br />
               <a href="/profile/edit/personal">редактировать</a>
          </div>
          <div className="content-box">
               <h2 className="h2">О себе</h2>
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
               <div className="d-flex flex-row flex-wrap border">
                              {
                                   formData?.about.skills?.map((skill, idx) => (
                                        <div key={idx} className="border profile-skill">{skill}</div>
                                   ))
                              }
               </div>
          </div>
          </main>
     );
}

export default ProfilePage;