import AllProfileView from "../UI/output/AllProfileView";
import { useState } from "react";
import useDebounce from '../hooks/useDebounce';
import Select from "../UI/select/Select";
import { Link } from "react-router-dom";

const Selection = ({addToCheck, setAddToCheck}) => {

     const [searchText, setSearchText] = useState({
          sphere: '',
          area: '',
     });


     const allSphere = ['Айти', 'Строительство', 'Транспорт, логистика', 'Финансы']

     const allArea = {
          'Айти' : ['Дизайн', 'Front-end', 'Back-end', 'Аналитика', 'DevOps', 'Верстка'],
          'Строительство' : ['Архитектора', 'Разнрабочий',  'Монтаж', 'Сантехник', 'Электромонтаж',],
          'Транспорт, логистика' : ['Водитель', 'Грузчик', 'Курьер', 'Начальник Склада', 'Упаковщик'],
          'Финансы' : ['Брокер', 'Бухгалтер', 'Экономист', 'Аудитор', 'Кредитный специалист',], 
     }

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
     <main className="d-flex flex-row align-items-start pt-5">
          <div className="search-form d-flex flex-column me-5">
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
          <AllProfileView
               searchText={debouncedSearch}
               setAddToCheck = {setAddToCheck}
               addToCheck = {addToCheck}
          />
          <div className="ms-5 d-flex flex-row rounded border align-items-center justify-content-center">
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
     </main>
     );
}

export default Selection;