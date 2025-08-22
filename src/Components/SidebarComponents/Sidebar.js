import { useState } from "react"
import "./sidebar.css"
import { NavLink } from "react-router-dom";

const Sidebar = () =>{

    const [sidebartab, setSidebarTab] = useState('Application');

    const sidebartabs = [
        {label:'Dashboard',path:'/dashboard' },
        {label:'Students',path:'/students' },
        {label:'Application',path:'/application' },
        {label:'Employee',path:'/employee' },
        {label:'Fleet',path:'/fleet' },
        {label:'Warehouse',path:'/warehouse' },
        {label:'SMS',path:'/sms' },
        {label:'Question Bank',path:'/question-bank' },
        {label:'Assets Management',path:'/assets-management' },
        {label:'Payments Service',path:'/payments-service' },
        {label:'CCTV',path:'/cctv' },
        {label:'HRMS',path:'/hrms' },
        {label:'Masters',path:'/masters' },
    ]

    return(
        <>
        <div className="sidebar_tabs">
             <ul className="navbar-nav">
                    {sidebartabs.map((mode)=>(
                        <li className="nav-item" key={mode.label}>
                            <NavLink
                            to={mode.path}
                            className={({isActive})=>`nav-link ${isActive ? 'active':''}`}
                            end={mode.label !== 'Application'}
                            >{mode.label}</NavLink>
                        </li>
                    ))}
                </ul>
        </div>
        <div className="sidebar_alerts">

        </div>
        <div className="sidebar_footer">
         
        </div>
        </>
    )
}

export default Sidebar;