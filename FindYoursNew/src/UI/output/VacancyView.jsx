import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VacancyView = () => {

     const [allData, setAllData] = useState()

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               setAllData(response.data.data);
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };
     useEffect(()=>{
          fetchData();
     },[])
     const filteredData = allData && Object.entries(allData)
          .filter(([id, user]) => {
               return user.vacancy?.status === "true"
          })
          .map(([id, user]) => (
          <div key={id} className="border d-flex flex-column mb-3 p-3 rounded w-100">
               <div className="d-flex flex-row align-items-start">
                    <div className="d-flex flex-row flex-wrap align-items-start justify-content-between w-100">
                         <h4 className="h4 col-md-8 my-2">{user.vacancy.title}</h4>
                         <Link to={`/show/vacancy/${id}`} className="col-md-4 my-2 text-primary">
                              Просмотреть
                         </Link>
                    </div>
               </div>
               <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column mt-2">
                         <h5 className="h5">В копманию:</h5>
                         <p className="mb-1">{user?.vacancy?.company}</p>
                    </div>
                    <div className="d-flex flex-column mt-2">
                         <h5 className="h5">Зарплата:</h5>
                         <p className="mb-1">{user?.vacancy?.money} BYN</p>
                    </div>
               </div>
          </div>
          ));

     return filteredData
          // <div>{filteredData.length ? filteredData :
          //      <div className="d-flex flex-row align-items-start p-2">
          //           Ничего не найдено
          //      </div>
          // }
          // </div>;
}
export default VacancyView;
