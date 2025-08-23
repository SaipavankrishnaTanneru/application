import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Accordion.module.css";  
import arrowUpIcon from "../../assets/iconamoon_arrow-up.svg";
import arrowDownIcon from "../../assets/iconamoon_arrow-down.svg";

const AccordionWidget = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleAccordionEvent = (event) => {
      if (event.detail === id) {
        setIsOpen((prev) => !prev);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("accordion-toggle", handleAccordionEvent);
    return () =>
      window.removeEventListener("accordion-toggle", handleAccordionEvent);
  }, [id]);

  const handleToggle = () => {
    const event = new CustomEvent("accordion-toggle", { detail: id });
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.accordionWidget}>
      <div className={styles.accordionHeader} onClick={handleToggle}>
        {/* Title */}
        <span className={styles.accordionTitle}>{title}</span>

        {/* Toggle Arrow */}
        <img
          src={isOpen ? arrowUpIcon : arrowDownIcon}
          alt={isOpen ? "Collapse" : "Expand"}
          className={styles.accordionToggleIcon}
        />
      </div>

      {/* Body */}
      {isOpen && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
};

AccordionWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default AccordionWidget;
