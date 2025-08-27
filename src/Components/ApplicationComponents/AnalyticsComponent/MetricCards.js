import React from "react";
import { cards } from "./MetricCardsObject";
import styles from "./MetricCards.module.css";

const MetricCards = () => {
  return (
    <div className={styles.metric_cards_container}>
      {cards.map((card) => {
        const isPositive = card.percentage > 0;
        return (
          <div
            key={card.id}
            className={`${styles.percentage_badge} ${
              isPositive ? styles.green_border : styles.red_border
            }`}
          >
            <span
              className={`${styles.percentage_text} ${
                isPositive ? styles.green_text : styles.red_text
              }`}
            >
              {`${isPositive ? "+" : ""}${card.percentage}%`}
            </span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
              >
                <path
                  d={
                    isPositive
                      ? "M2.08337 4.66667L5.00004 1.75M5.00004 1.75L7.91671 4.66667M5.00004 1.75V9.25"
                      : "M7.91671 6.33333L5.00004 9.25M5.00004 9.25L2.08337 6.33333M5.00004 9.25V1.75"
                  }
                  stroke={isPositive ? "#22C55E" : "#EF4444"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCards;
