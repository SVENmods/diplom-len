import AllProfileView from "../UI/output/AllProfileView";
import { useState } from "react";
import useDebounce from '../hooks/useDebounce';
import Select from "../UI/select/Select";
import { Link } from "react-router-dom";
import { allSphere, allArea } from '../data/category/dataCategory'

const Selection = ({addToCheck, setAddToCheck, role}) => {

     const [searchText, setSearchText] = useState({
          sphere: '',
          area: '',
     });

     const debouncedSearch = useDebounce(searchText, 500)

     // const handleSearch = (e) => {
     //      setSearchText(e.target.value);
     // };

     const handleSphereChange = (e) => {
          setAddToCheck([])
          setSearchText({...searchText, sphere: e.target.value, area: ''});
     };

     const handleAreaChange = (e) => {
          setAddToCheck([])
          setSearchText({...searchText, area: e.target.value});
     };


     const clearLocalStorage = () => {
          localStorage.clear()
          setAddToCheck([])
     }

     
     return (
     <main className="row align-items-start pt-5 w-100">
          <div className="col-md-6 d-flex flex-column justify-content-start align-items-start">
               <div className="search-form d-flex flex-column w-100">
               {/* <div className="d-flex flex-column">
                    <label htmlFor="main-search">Поиск</label>
                    <input type="text" value={searchText} onChange={handleSearch} className="border mt-2" id="main-search" placeholder=""/>
               </div> */}
               <div className="d-flex flex-column">
                    <Select
                         options = {allSphere}
                         label = {"Выберите сферу"}
                         onChange = {handleSphereChange}
                         name = {'sphere'}
                         customClass = ""
                         />
                    {allArea[searchText.sphere] && (
                         <Select
                              options = {allArea[searchText.sphere]}
                              label = {"Выберите направление"}
                              onChange = {handleAreaChange}
                              name = {'area'}
                              customClass = ""
                              />
                         )}
                    </div>
               </div>
               <div className="d-flex flex-row rounded border align-items-center justify-content-center mt-3">
                    <Link to={{ 
                         pathname: "/compare", 
                         state: { addToCheck: addToCheck } }} 
                         className="p-2">
                              <i className="bi bi-table me-2"></i>
                              В сравнении: 
                              <span className="ms-1">{addToCheck.length}</span>
                    </Link>
                    <a className="ms-4 border-start d-flex p-2" role="button" onClick={() => clearLocalStorage()}>
                         <i className="bi bi-trash"></i>
                    </a>
               </div>
          </div>
          
          <div className="col-md-6">
               <AllProfileView
                    searchText={debouncedSearch}
                    setAddToCheck = {setAddToCheck}
                    addToCheck = {addToCheck}
                    role = {role}
               />
          </div>
          
     </main>
     );
}

export default Selection;