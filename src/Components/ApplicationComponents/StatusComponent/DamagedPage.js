import React from "react";
import { Formik, Field, Form } from "formik";
import Inputbox from "../../../Widgets/Inputbox/InputBox";
import Dropdown from "../../../Widgets/Dropdown/Dropdown"; 
import { Button, Typography } from "@mui/material";
import styles from "./DamagedPage.module.css";

const DamagedPage = () => {
  const initialValues = {
    applicationNo: "257000006",
    zoneName: "",
    campusName: "",
    proName: "",
    dgmName: "",
    status: "",
    reason: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className={styles.pageWrapper}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form className={styles.formWrapper}>
            <div>
              <label>Application No</label>
              <Field
                name="applicationNo"
                component={Inputbox}
                disabled
              />
            </div>
            {["zoneName", "campusName", "proName", "dgmName", "status"].map((field) => (
              <div key={field}>
                <label>{field.replace(/([A-Z])/g, " $1")}</label>
                <Field
                  name={field}
                  component={Dropdown}
                  results={["Option 1", "Option 2", "Option 3"]} 
                  onChange={setFieldValue}
                />
              </div>
            ))}
            <div>
              <label>Enter The Reason</label>
              <Field
                name="reason"
                component="textarea"
                className={styles.textArea}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.submitButton}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DamagedPage;
