import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import "./BarGraph.css";

const CustomLegend = ({ bars = [] }) => (
  <div className="custom-legend">
    {bars.map((bar, i) => (
      <div key={i} className="custom-legend-item">
        <span
          className="custom-legend-dot"
          style={{ backgroundColor: bar.color }}
        />
        <span>{bar.label || bar.dataKey}</span>
      </div>
    ))}
  </div>
);

const BarGraph = ({ data = [], bars = [] }) => (
  <div className="graph-widget">
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "12px" }}
        />
        {bars.map((bar, i) => (
          <Bar
            key={i}
            dataKey={bar.dataKey}
            fill={bar.color}
            radius={8}
            barSize={20}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
    <CustomLegend bars={bars} />
  </div>
);

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  bars: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ),
};

export default BarGraph;
