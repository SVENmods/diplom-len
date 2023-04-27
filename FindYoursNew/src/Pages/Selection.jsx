import AllProfileView from "../UI/output/AllProfileView";
import { useState } from "react";
import useDebounce from '../hooks/useDebounce';
import Select from "../UI/select/Select";

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

     
     return (
     <main className="d-flex flex-row align-items-start">
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
                    />
                    )}
                    
               </div>
          </div>
          <AllProfileView
               searchText={debouncedSearch}
               setAddToCheck = {setAddToCheck}
               addToCheck = {addToCheck}
          />
          <a href="/compare" className="ms-5 border p-2 rounded"><i className="bi bi-table me-2"></i>В сравнении: {addToCheck.length}</a>
     </main>
     );
}

export default Selection;