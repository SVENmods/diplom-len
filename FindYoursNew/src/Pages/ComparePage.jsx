import { useState, useEffect } from "react";
import axios from "axios";

const ComparePage = ({addToCheck}) => {
     const [allData, setAllData] = useState([])

     const fetchData = async () => {
          try {
               const response = await axios.get(`http://localhost:8000/profiles`);
               // const filteredData = response.data.data
               // .map((user) => {
               //      if (addToCheck.includes(user.id)) {
               //           return user;
               //      }
               //           return null;
               // })
               // .filter((user) => user !== null);
               // setAllData(filteredData);
               // console.log(filteredData)

               // Object.entries(response.data.data).map(([id, user]) => {
               //      console.log('id', id)
               //      console.log('user.name', user.name)
               // })
               // console.log(Object.entries(response.data.data))

               const filteredData = Object.entries(response.data.data)
               .filter(([id]) => addToCheck.includes(id))
               // .map(([id, user]) => ({ id, ...user }));
               setAllData(filteredData);
               console.log(filteredData)
               
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };

     useEffect(()=>{
          fetchData();
     },[])

     return (
          <main>
               <a href="/selection">Вернуться</a>
          </main>
     );
}
export default ComparePage;