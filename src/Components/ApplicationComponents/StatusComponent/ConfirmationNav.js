import React from "react";
import { Box } from "@mui/material";
import styles from "./ConfirmationNav.module.css";

const ConfirmationNav = ({ currentStep, setCurrentStep }) => {
  return (
    <Box className={styles.nav_container}>
      <Box className={styles.step_nav}>
        <Box
          className={`${styles.step_tab} ${
            currentStep === 1 ? styles.active : ""
          }`}
          onClick={() => setCurrentStep(1)}
        >
          <span className={styles.step_number}>1</span>
          <span className={styles.step_label}>Student Information</span>
        </Box>
        <Box
          className={`${styles.step_tab} ${
            currentStep === 2 ? styles.active : ""
          }`}
          onClick={() => setCurrentStep(2)}
        >
          <span className={styles.step_number}>2</span>
          <span className={styles.step_label}>Payment Information</span>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationNav;
