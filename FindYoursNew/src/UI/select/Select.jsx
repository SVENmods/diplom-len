import React from 'react';

function Select(props) {
     const { options, label, value, onChange, name, customClass } = props;

     return (
          <div className={customClass + " " + "d-flex flex-row align-items-center border"}>
               <label>{label}</label>
               <select value={value} onChange={onChange} name={name}>
                    <option value="">
                         Критерий
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
