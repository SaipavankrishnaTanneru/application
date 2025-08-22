import React from "react";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import zoneIcon from "../../../assets/Paper.svg";
import "./ZoneGraph.css";

const ZoneGraph = () => {
  const data = [
    { year: "2017-2018", Issued: 3500, Sold: 5000 },
    { year: "2019-2020", Issued: 3000, Sold: 4000 },
    { year: "2021-2022", Issued: 3200, Sold: 3600 },
    { year: "2023-2024", Issued: 3285, Sold: 3600 },
  ];

  const bars = [
    { dataKey: "Issued", color: "#0000ff" },
    { dataKey: "Sold", color: "#ffa500" },
  ];

  return (
    <div className="Zone_graph mt-2">
      <AccordionWidget
        id="zone-graph"
        className="zone-accordion"
        title={
          <div className="zone-header">
            <img src={zoneIcon} alt="Zone Icon" className="zone-header-icon" />
            <span className="zone-header-title">Zone Wise Graph</span>
          </div>
        }
      >
        <GraphWidget data={data} bars={bars} />
      </AccordionWidget>
    </div>
  );
};

export default ZoneGraph;
