import React from "react";
import GraphWidget from "../../../Widgets/GraphWidget/BarGraph";
import AccordionWidget from "../../../Widgets/Accordion/Accordion";
import dgmIcon from "../../../assets/Paper.svg";
import MetricCards from "../AnalyticsComponent/MetricCards";
import styles from "./DgmGraph.module.css";

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
    <div className={styles.dgm_graph}>
      <AccordionWidget
        id="dgm-graph"
        header={(expanded) => (
          <div className={styles.dgm_header_wrapper}>
            <div className={styles.dgm_header_left}>
              <img
                src={dgmIcon}
                alt="DGM Icon"
                className={styles.dgm_header_icon}
              />
              <span className={styles.dgm_header_title}>DGM Graph</span>
            </div>

            {!expanded && (
              <div className={styles.dgm_header_right}>
                <MetricCards />
              </div>
            )}
          </div>
        )}
      >
        <GraphWidget data={formattedData} bars={bars} />
      </AccordionWidget>
    </div>
  );
};

export default DgmGraph;
