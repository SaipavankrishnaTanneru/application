import React from 'react';
import styles from './SuccessfulYPage.module.css';
import pageicon from '../../../assets/Sucessfully.png'; 

const SuccessfulYPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.paper}>
        <div className={styles.iconContainer}>
          <img src={pageicon} alt="Success Icon" className={styles.iconImage} />
        </div>
        <h5 className={styles.title}>Application No: 246189267</h5>
        <h6 className={styles.subtitle}>Update Successful</h6>
        <p className={styles.description}>Application Details Added Successfully</p>
        <button
          className={styles.button}
          onClick={() => console.log('Redirect or navigate to another page')}
        >
          Back To Application Status
        </button>
      </div>
    </div>
  );
};

export default SuccessfulYPage;
