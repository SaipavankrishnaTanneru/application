import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import styles from "./Stepper.module.css";

/**
 * Reusable Custom Stepper
 * @param {Array} steps - step labels
 * @param {number} activeStep - current active step index
 * @param {function} onStepChange - callback when step clicked
 * @param {string} orientation - "horizontal" | "vertical"
 */
const CustomStepper = ({ steps, activeStep, onStepChange, orientation = "horizontal" }) => {
  return (
    <div className={styles.stepperContainer}>
      <Stepper activeStep={activeStep} alternativeLabel={orientation === "horizontal"} orientation={orientation}>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => onStepChange(index)}>
            <StepLabel
              StepIconComponent={() => (
                <span
                  className={`${styles.stepNumber} ${
                    activeStep === index ? styles.activeStepNumber : ""
                  }`}
                >
                  {index + 1}
                </span>
              )}
              classes={{
                label: `${styles.stepLabel} ${activeStep === index ? styles.activeStepLabel : ""}`,
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CustomStepper;
