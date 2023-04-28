import React from 'react';

function Select(props) {
     const { options, label, value, onChange, name, customClass } = props;

     return (
          <div className={customClass + " " + "row align-items-center border p-2 justify-content-between mb-1"}>
               <label className='col-md-6'>{label}</label>
               <select value={value} onChange={onChange} name={name} className="col-md-6">
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
