import { Link } from 'react-router-dom'

const ProfileViewExperiens = ({ profileData }) => {
     return (
          <div className="d-flex flex-column">
               {Object.entries(profileData.experiens).map(([id, experience]) => (
                    <div key={id}>
                         <div className="d-flex flex-row">
                         <Link to={`/profile/edit/experiens/${id}`}>
                              редактировать
                         </Link>
                         </div>
                         <h4 className="h4">{experience.nameComp}</h4>
                         <p>{experience.position}</p>
                         {/* <p>{experience.time}</p> */}
                         <p>{experience.about}</p>
                         <div className="d-flex flex-row flex-wrap">
                                   {
                                        experience?.skills?.map((skill, idx) => (
                                             <div key={idx} className="border profile-skill">{skill}</div>
                                        ))
                                   }
                         </div>
                    </div>
                    ))}
          </div>
     );
}
export default ProfileViewExperiens;