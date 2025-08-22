import React from "react";
import "./button.css";


const Button = ({ buttonname, icon, onClick, type }) => {
  return (
    <div className="button-wrapper">
      <button  onClick={onClick} type={type}>
         {buttonname}{icon && <span className="icon">{icon}</span>} 
      </button>
    </div>
  );
};

export default Button;