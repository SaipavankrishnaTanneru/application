import React from "react";
import PropTypes from "prop-types";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import styles from "./BarGraph.module.css";   // ⬅️ use module

const CustomLegend = ({ bars = [] }) => (
  <div className={styles.customLegend}>
    {bars.map((bar, i) => (
      <div key={i} className={styles.customLegendItem}>
        <span
          className={styles.customLegendDot}
          style={{
            background: bar.legendColor || (bar.fill ?? "#ccc"),
          }}
        />
        <span>{bar.label || bar.dataKey}</span>
      </div>
    ))}
  </div>
);

const BarGraph = ({ data = [], bars = [] }) => (
  <div className={styles.graphWidget}>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        {/* Gradients for each bar */}
        <defs>
          {bars.map((bar, i) => {
            if (bar.gradientType === "radial") {
              return (
                <radialGradient
                  key={i}
                  id={`gradient-${bar.dataKey}`}
                  cx="50%"
                  cy="50%"
                  r="100%"
                  fx="50%"
                  fy="50%"
                >
                  {bar.gradient?.map((stop, idx) => (
                    <stop
                      key={idx}
                      offset={stop.offset}
                      stopColor={stop.color}
                      stopOpacity={1}
                    />
                  ))}
                </radialGradient>
              );
            }
            return (
              <linearGradient
                key={i}
                id={`gradient-${bar.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                {bar.gradient?.map((stop, idx) => (
                  <stop
                    key={idx}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={1}
                  />
                ))}
              </linearGradient>
            );
          })}
        </defs>

        <XAxis
          dataKey="year"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: "11px" }}
        />

        {bars.map((bar, i) => (
          <Bar
            key={i}
            dataKey={bar.dataKey}
            fill={
              bar.gradient
                ? `url(#gradient-${bar.dataKey})`
                : bar.fill || "#999"
            }
            radius={6}
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
      fill: PropTypes.string, // solid fallback color
      gradientType: PropTypes.oneOf(["linear", "radial"]),
      gradient: PropTypes.arrayOf(
        PropTypes.shape({
          offset: PropTypes.string.isRequired,
          color: PropTypes.string.isRequired,
        })
      ),
      label: PropTypes.string,
      legendColor: PropTypes.string,
    })
  ),
};

export default BarGraph;
