import React from 'react';
import { Formik, Form } from 'formik';
import Inputbox from "../../../Widgets/Inputbox/InputBox";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import styles from "./PaymentInformation.module.css";

const dropdownFields = [
  { label: "Join Year", name: "joinYear", options: ["2023", "2024"] },
  { label: "Stream", name: "stream", options: ["MPC", "BIPC"] },
  { label: "Program", name: "program", options: ["Regular", "Integrated"] },
  { label: "Exam Program", name: "examProgram", options: ["JEE", "NEET"] },
  { label: "Course Name", name: "courseName", options: ["Course A", "Course B"], searchable: true },
  { label: "Batch Name", name: "batchName", options: ["Batch 1", "Batch 2"], searchable: true },
  { label: "Section", name: "section", options: ["A", "B"] },
];

const inputFields = [
  { label: "Course Batch Start Date", name: "startDate", type: "date" },
  { label: "Course Batch End Date", name: "endDate", type: "date" },
  { label: "Course Fee", name: "courseFee", placeholder: "Enter Fee" },
];

const PaymentInformation = ({ onBack, onSubmit }) => {
  const initialValues = Object.fromEntries([...dropdownFields, ...inputFields].map(f => [f.name, ""]));

  return (
    <div className={styles.payment_information}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange }) => (
          <Form className={styles.form}>
            <div className={styles.form_grid}>
              {dropdownFields.map(f => (
                <Dropdown
                  key={f.name}
                  dropdownname={f.label}
                  name={f.name}
                  value={values[f.name]}
                  onChange={handleChange}
                  results={f.options}
                  searchable={f.searchable || false}
                  labelClass={styles.label_important}
                />
              ))}

              {inputFields.map(f => (
                <Inputbox
                  key={f.name}
                  label={f.label}
                  type={f.type || "text"}
                  name={f.name}
                  placeholder={f.placeholder}
                  value={values[f.name]}
                  onChange={handleChange}
                  labelClass={styles.label_important}
                />
              ))}
            </div>

            <div className={styles.table_wrapper}>
              <Table className={styles.table}>
                <TableHead>
                  <TableRow>
                    {["HEADS", "FEE AMOUNT", "RECEIPT NO", "PAYMENT MODE", "PAYMENT STATUS", "PAYMENT DATE"].map(h => (
                      <TableCell key={h}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {Array(6).fill("Text").map((t, i) => <TableCell key={i}>{t}</TableCell>)}
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className={styles.submit_wrapper}>
              <Button type="submit" className={styles.submit_btn} variant="contained">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentInformation;
