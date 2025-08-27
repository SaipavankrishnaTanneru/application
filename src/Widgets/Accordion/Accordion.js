// AccordionWidget.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.css";

const AccordionWidget = ({ id, title, header, children }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prev) => !prev)}
      className={`${styles.accordionRoot} ${
        expanded ? styles.accordionExpanded : ""
      }`}
      sx={{
        "&:before": { display: "none" }, // removes MUI default divider line
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${id}-content`}
        id={`panel-${id}-header`}
        className={styles.accordionSummary}
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "unset",
          "& .MuiAccordionSummary-content": { margin: 0 },
        }}
      >
        {header ? (
          header(expanded)
        ) : (
          <Typography variant="subtitle1" fontWeight="500">
            {title}
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails className={styles.accordionDetails}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

AccordionWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
  header: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default AccordionWidget;
