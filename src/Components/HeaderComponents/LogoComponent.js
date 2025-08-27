import React from "react";
import logo from "../../assets/sclogo.png";
import styles from "./LogoComponent.module.css";

const LogoComponent = () => {
  return (
    <header className={styles.logo_item}>
      <div className={styles.logo_img}>
        <img src={logo} className={styles.sclogo} alt="School Logo" />
      </div>
    </header>
  );
};

export default LogoComponent;
