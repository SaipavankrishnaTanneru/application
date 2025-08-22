import React from "react";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import dgmIcon from "../../../assets/Paper.svg";
import "./DgmGraph.css";

const DgmGraph = () => {
  const dgmData = {
    labels: ["2017-2018", "2019-2020", "2021-2022", "2023-2024"],
    issued: [140, 200, 160, 180],
    sold: [220, 210, 180, 210],
  };

  const formattedData = dgmData.labels.map((year, idx) => ({
    year,
    Issued: dgmData.issued[idx],
    Sold: dgmData.sold[idx],
  }));

  const bars = [
    { dataKey: "Issued", color: "#0000ff" },
    { dataKey: "Sold", color: "#ffa500" },
  ];

  return (
    <div className="Dgm_graph mt-3">
      <AccordionWidget
        id="dgm-graph"
        className="dgm-accordion"
        title={
          <div className="dgm-header">
            <img src={dgmIcon} alt="DGM Icon" className="dgm-header-icon" />
            <span className="dgm-header-title">DGM Graph</span>
          </div>
        }
      >
        <GraphWidget data={formattedData} bars={bars} />
      </AccordionWidget>
    </div>
  );
};

export default DgmGraph;
