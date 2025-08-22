import React from "react";
import logo from "../../assets/sclogo.png";
import './header.css';

const LogoComponent =()=>{
    return (

         <div className="logo-item">
        <figure className=" logoimg mb-0 ">
            <img  src={logo} className="sclogo" alt="logo"/>
        </figure>

    </div>

    );
   
};
export default LogoComponent;