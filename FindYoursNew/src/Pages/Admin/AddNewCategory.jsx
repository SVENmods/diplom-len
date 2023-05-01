import { useState } from "react";
import { saveAs } from 'file-saver';
import { allSphere, allArea } from '../../data/category/dataCategory'

const AddNewCategory = () => {
     const [newSphere, setNewSphere] = useState("");
     const [newArea, setNewArea] = useState("");

     const handleSphereAdd = () => {
          const newAllSphere = [...allSphere, newSphere];
          const newAllArea = {
               ...allArea,
               [newSphere]: [] // создаем новый ключ в allArea
          }
          saveToFile(newAllSphere, newAllArea);
     };

     const handleAreaAdd = () => {
          const newAllArea = {
               ...allArea,
               [newSphere]: [...allArea[newSphere], newArea]
          };
          saveToFile(allSphere, newAllArea);
     };

     const saveToFile = (allSphere, allArea) => {
          const data = `export const allSphere = ${JSON.stringify(allSphere)};\nexport const allArea = ${JSON.stringify(allArea)};`; // создаем новую строку с данными
          const file = new Blob([data], {type: "text/plain;charset=utf-8"});
          saveAs(file, "dataCategory.js"); // сохраняем файл
     }

     return (
          <main className="content-container mt-5">
               <div>
                    <label>New Sphere:</label>
                    <input type="text" value={newSphere} onChange={(e) => setNewSphere(e.target.value)} />
                    <button onClick={handleSphereAdd}>Add Sphere</button>
               </div>
               <div>
                    <label>New Area:</label>
                    <select value={newSphere} onChange={(e) => setNewSphere(e.target.value)}>
                         {allSphere.map((sphere) => (
                              <option key={sphere} value={sphere}>{sphere}</option>
                         ))}
                    </select>
                    <input type="text" value={newArea} onChange={(e) => setNewArea(e.target.value)} />
                    <button onClick={handleAreaAdd}>Add Area</button>
               </div>
          </main>
     );
}

export default AddNewCategory;
