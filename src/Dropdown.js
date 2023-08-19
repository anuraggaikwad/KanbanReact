import React, { useState } from 'react';

function Dropdown({onOptionSelect}) {
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  };

  const handleDisplayClick = () => {
    setDisplayDropdown(!displayDropdown);
  };

  return (
    <div className="dropdown">
     <button className="dropdown-button" onClick={handleDisplayClick}>
        Display
      </button> 
      
      {displayDropdown && (<div className="dropdown-content">
        <button onClick={() => handleOptionSelect('Status')}>Status</button>
        <button onClick={() => handleOptionSelect('User')}>User</button>
        <button onClick={() => handleOptionSelect('Priority')}>Priority</button>
      </div>)}
    </div>
  );
}

export default Dropdown;