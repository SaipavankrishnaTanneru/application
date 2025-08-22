import "./distributecomponent.css";
import applicationnavtabsicon from "../../../assets/applicationnavtabsicon";
import { NavLink, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import DistributeForm from "./DistributeFrom"; 
import CampusGraph from "../GraphComponent/CampusGraph";
import DgmGraph from "../GraphComponent/DgmGraph";
import ZoneGraph from "../GraphComponent/ZoneGraph";
import styleanim from "../../../assets/Group 16.png";
import category from "../../../assets/Category.png";

const DistributeComponent = () => {
  const [selectedTab, setSelectedTab] = useState("zone");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const distributetabs = [
    { label: "Zone", path: "/application/distribute/zone", formType: "Zone" },
    { label: "DGM", path: "/application/distribute/dgm", formType: "DGM" },
    { label: "Campus", path: "/application/distribute/campus", formType: "Campus" },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className="distribute_content_left">
        <div className="distribute_content_top">
          <div className="distribute_content_top_left">
            {applicationnavtabsicon}
            <div className="distribute_content_heading">
              <p className="heading mb-0">Distribute Applications</p>
              <p className="sub mb-0">
                Distribute Applications to all Zones, DGM, and Campuses
              </p>
            </div>
          </div>
          <div className="distribute_content_nav_tabs">
            <ul className="nav nav-tabs">
              {distributetabs.map((mode) => (
                <li
                  key={mode.label}
                  className={`nav-item ${currentPath === mode.path ? "active" : ""}`}
                >
                  <NavLink
                    to={mode.path}
                    className="nav-link"
                    onClick={() => handleTabChange(mode.formType)}
                  >
                    {mode.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* LEFT CONTENT ROUTES */}
        <div className="distribute_nav_content">
          <Routes>
            <Route path="" element={<Navigate to="zone" replace />} />
            <Route path="/zone" element={<DistributeForm formType="Zone" />} />
            <Route path="/dgm" element={<DistributeForm formType="DGM" />} />
            <Route path="/campus" element={<DistributeForm formType="Campus" />} />
          </Routes>
        </div>
      </div>

      {/* RIGHT CONTENT (GRAPHS) */}
      <div className="distribute_content_graph ms-3">
        <h2>
          <img src={category} className="category" alt="category" />
          Previous Year Graph
        </h2>

        <Routes>
          <Route path="/zone" element={<ZoneGraph />} />
          <Route path="/dgm" element={<DgmGraph />} />
          <Route path="/campus" element={<CampusGraph />} />
        </Routes>

        <figure className="styleanim-wrapper mt-2">
          <img src={styleanim} className="styleanim" alt="styleanim" />
        </figure>
      </div>
    </>
  );
};

export default DistributeComponent;
