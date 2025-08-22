import React from "react";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import "./CampusGraph.css";
import campusIcon from "../../../assets/Paper.svg";

const CampusGraph = () => {
  const campusData = {
    labels: ["2017-2018", "2019-2020", "2021-2022","2023-2024"],
    issued: [150, 120, 180,190],
    sold: [250, 170, 190,250],
  };

  const formattedData = campusData.labels.map((year, idx) => ({
    year,
    Issued: campusData.issued[idx],
    Sold: campusData.sold[idx],
  }));

  const bars = [
    { dataKey: "Issued", color: "#0000ff" },
    { dataKey: "Sold", color: "#ffa500" },
  ];

  return (
    <div className="Campus_graph mt-2">

  
    <AccordionWidget
      id="campus-graph"
      className="campus-accordion"
      title={
        <div className="campus-header">
          <img src={campusIcon} alt="Campus Icon" className="campus-header-icon" />
          <span className="campus-header-title">Campus Graph</span>
        </div>
      }
    >
      <GraphWidget data={formattedData} bars={bars} />
    </AccordionWidget>
      </div>
  );
};

export default CampusGraph;
