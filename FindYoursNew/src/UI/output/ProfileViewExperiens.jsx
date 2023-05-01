import { Link } from 'react-router-dom'

const ProfileViewExperiens = ({ profileData, compareShow }) => {
     return (
          <div className="d-flex flex-column">
               {Object.entries(profileData.experiens).map(([id, experience]) => (
                    <div key={id} className="border border-primary py-2 px-3 rounded mb-3">
                         <div className="d-flex flex-row align-items-center">
                              {
                                   !compareShow && (
                                        <Link to={`/profile/edit/experiens/${id}`} className="ms-auto text-primary">
                                             Изменнить
                                        </Link>
                                   )
                              }
                         </div>
                         <h4 className="h4 mt-2">{experience.nameComp}</h4>
                         <div className="d-flex flex-column mt-4">
                              <strong>Позиция</strong> 
                              <p className='mt-2'>{experience.position}</p>
                         </div>
                         {/* <p>{experience.time}</p> */}
                         <div className="d-flex flex-column">
                              <strong>Описание:</strong>
                              <p className='mt-2'>{experience.about}</p>
                         </div>
                         <div className="d-flex flex-column">
                              <strong>Навыки:</strong>
                              <div className="row ps-2 mt-2">
                                   {
                                        experience?.skills?.map((skill, idx) => (
                                             <div 
                                                  key={idx} 
                                                  className="border col-md-auto 
                                                  mx-1 my-1 d-flex 
                                                  align-items-center 
                                                  justify-content-center p-1 
                                                  profile-skill">{skill}</div>
                                        ))
                                   }
                              </div>
                         </div>
                    </div>
                    ))}
          </div>
     );
}
export default ProfileViewExperiens;