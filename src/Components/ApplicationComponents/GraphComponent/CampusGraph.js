import React from "react";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import campusIcon from "../../../assets/Paper.svg";
import styles from "./CampusGraph.module.css";   

const CampusGraph = () => {
  const campusData = {
    labels: ["2017-2018", "2019-2020", "2021-2022", "2023-2024"],
    issued: [150, 120, 180, 190],
    sold: [250, 170, 190, 250],
  };

  const formattedData = campusData.labels.map((year, idx) => ({
    year,
    Issued: campusData.issued[idx],
    Sold: campusData.sold[idx],
  }));

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
    <div className={`${styles.campusGraph} mt-2`}>
      <AccordionWidget
        id="campus-graph"
        className="campus-accordion"
        title={
          <div className={styles.campusHeader}>
            <img
              src={campusIcon}
              alt="Campus Icon"
              className={styles.campusHeaderIcon}
            />
            <span className={styles.campusHeaderTitle}>Campus Graph</span>
          </div>
        }
      >
        <GraphWidget data={formattedData} bars={bars} />
      </AccordionWidget>
    </div>
  );
};

export default CampusGraph;
