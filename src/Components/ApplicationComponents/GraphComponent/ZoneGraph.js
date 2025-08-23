import React from "react";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import zoneIcon from "../../../assets/Paper.svg";
import styles from "./ZoneGraph.module.css";   // ⬅️ use CSS module

const ZoneGraph = () => {
  const data = [
    { year: "2017-2018", Issued: 3500, Sold: 5000 },
    { year: "2019-2020", Issued: 3000, Sold: 4000 },
    { year: "2021-2022", Issued: 3200, Sold: 3600 },
    { year: "2023-2024", Issued: 3285, Sold: 3600 },
  ];

  const bars = [
    {
      dataKey: "Issued",
      gradientType: "linear",
      gradient: [
        { offset: "0%", color: "#F31616" },
        { offset: "100%", color: "#8D0D6F" },
      ],
      legendColor: "#F31616",
      label: "Issued",
    },
    {
      dataKey: "Sold",
      gradientType: "radial",
      gradient: [
        { offset: "0%", color: "#45D92E" },
        { offset: "100%", color: "#07968F" },
      ],
      legendColor: "#45D92E",
      label: "Sold",
    },
  ];

  return (
    <div className={`${styles.zoneGraph} mt-2`}>
      <AccordionWidget
        id="zone-graph"
        className="zone-accordion"
        title={
          <div className={styles.zoneHeader}>
            <img
              src={zoneIcon}
              alt="Zone Icon"
              className={styles.zoneHeaderIcon}
            />
            <span className={styles.zoneHeaderTitle}>Zone Wise Graph</span>
          </div>
        }
      >
        <GraphWidget data={data} bars={bars} />
      </AccordionWidget>
    </div>
  );
};

export default ZoneGraph;
