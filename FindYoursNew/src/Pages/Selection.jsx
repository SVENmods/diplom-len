import AllProfileView from "../UI/output/AllProfileView";
import { useState } from "react";
import useDebounce from '../hooks/useDebounce';


const Selection = () => {

     const [searchText, setSearchText] = useState('');

     const debouncedSearch = useDebounce(searchText, 500)

     const handleSearch = (e) => {
          setSearchText(e.target.value);
     };

     
     return (
     <main>
          <input type="text" value={searchText} onChange={handleSearch} className="border"/>
          <AllProfileView
               searchText={debouncedSearch}
          />
     </main>
     );
}

export default Selection;