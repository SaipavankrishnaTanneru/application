import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Tabs, Tab, Box } from "@mui/material";
import ConfirmationNav from "./ConfirmationNav";
import StudentInformation from "./StudentInformation";
import PaymentInformation from "./PaymentInformation";
import DamagedInformation from "./DamagedPage";  
import styles from "./StatusComponent.module.css";

const StatusComponent = () => {
  const [activeTab, setActiveTab] = useState("sale");
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();  // Initialize navigate hook

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  const handleFormSubmit = () => {
    // After form submission, navigate to the Success Page
    navigate("/successfully"); // This will navigate to the /successfully route
  };

  return (
    <main className={styles.main_container}>
      <header className={styles.header}>
        <h1>Application Status</h1>
      </header>

      {/* Rounded Tabs */}
      <Box className={styles.status_tabs}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            label="Sale"
            value="sale"
            className={`${styles.tab_btn} ${activeTab === "sale" ? styles.active_tab : ""}`}
          />
          <Tab
            label="Confirmation"
            value="confirmation"
            className={`${styles.tab_btn} ${activeTab === "confirmation" ? styles.active_tab : ""}`}
          />
          <Tab
            label="Damaged"
            value="damaged"
            className={`${styles.tab_btn} ${activeTab === "damaged" ? styles.active_tab : ""}`}
          />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <div className={styles.tab_content}>
        {activeTab === "confirmation" && (
          <>
            <ConfirmationNav
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            <div className={styles.content_wrapper}>
              {currentStep === 1 && <StudentInformation onNext={() => setCurrentStep(2)} />}
              {currentStep === 2 && (
                <PaymentInformation
                  onBack={() => setCurrentStep(1)}
                  onSubmit={handleFormSubmit} // Pass the onSubmit handler
                />
              )}
            </div>
          </>
        )}
        {activeTab === "sale" && <Box p={2}>Sale Content</Box>}
        {activeTab === "damaged" && (
          <Box p={2}>
            <DamagedInformation onSubmit={handleFormSubmit} /> {/* Pass the submit handler to Damaged Tab */}
          </Box>
        )}
      </div>
    </main>
  );
};

export default StatusComponent;
