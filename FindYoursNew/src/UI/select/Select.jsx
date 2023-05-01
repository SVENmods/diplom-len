import React from 'react';

function Select(props) {
     const { options, label, value, onChange, name, customClass, required } = props;

     return (
          <div className={customClass + " " + "d-flex flex-column flex-wrap align-items-start justify-content-between mb-1 w-100"}>
               <label>{label}</label>
               <select 
                    value={value} 
                    onChange={onChange} 
                    name={name} 
                    className="border mt-2 py-1 px-2 w-100 rounded"
                    required={required}>
                    <option value="">
                         {/* Критерий */}
                    </option>
                    {options.map((option) => (
                    <option key={option} value={option}>
                         {option}
                    </option>
                    ))}
               </select>
     </div>
     );
}

export default Select;
