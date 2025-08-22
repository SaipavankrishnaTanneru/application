import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import Dropdown from "../../../Widgets/Dropdown/Dropdown";
import Inputbox from "../../../Widgets/Inputbox/InputBox";
import Button from "../../../Widgets/Button/Button";
import "./distributeform.css";

import rightarrow from "../../../assets/rightarrow";

// Predefined range options for dropdown
const rangeOptions = [
  { label: "1-10", value: "1-10" },
  { label: "11-20", value: "11-20" },
  { label: "21-30", value: "21-30" },
  { label: "31-40", value: "31-40" },
  { label: "41-50", value: "41-50" },
];

// Custom RangeInput component using react-select
const RangeInput = ({ field, form, label }) => {
  return (
    <div className="range-input-container">
      <label htmlFor={field.name}>{label}</label>
      <Select
        options={rangeOptions}
        value={rangeOptions.find((option) => option.value === field.value) || {
          label: field.value,
          value: field.value,
        }}
        isDisabled={false}
        placeholder="Select or type a range"
        isSearchable={true}
        className="react-select-container"
        classNamePrefix="react-select"
         onChange={(selectedOption) => form.setFieldValue(field.name, selectedOption.value)}
      />
    </div>
  );
};

// Common fields shared across Zone, DGM, and Campus
const commonFields = [
  { name: "academicYear", label: "Academic Year", options: ["2021", "2022", "2023"], disabled: true },
  { name: "cityName", label: "City Name", options: [], disabled: true },
  { name: "zoneName", label: "Zone Name", options: ["Zone 1", "Zone 2", "Zone 3"], disabled: true },
  { name: "issuedTo", label: "Issued To", options: ["DGM", "Campus"], disabled: true },
  { name: "applicationNoFrom", label: "Application No From", type: "text" },
  { name: "range", label: "Range", component: RangeInput },
  { name: "applicationNoTo", label: "Application No To", type: "text", disabled: true },
  { name: "issueDate", label: "Issue Date", type: "date" },
  { name: "mobileNumber", label: "Mobile Number", type: "tel", disabled: true },
];

// Zone-specific fields
const zoneFields = [
  { name: "stateName", label: "State Name", options: [], disabled: true },
];

// DGM-specific fields
const dgmFields = [
  { name: "campusName", label: "Campus Name", options: [], disabled: true },
  { name: "availableAppNoFrom", label: "Available Appno From", type: "text", disabled: true },
  { name: "availableAppNoTo", label: "Available Appno To", type: "text", disabled: true },
];

// Campus-specific fields
const campusFields = [
  { name: "campusName", label: "Campus Name", options: [], disabled: true },
  { name: "campaignDistrict", label: "Campaign District", options: [], disabled: true },
  { name: "campaignAreaName", label: "Campaign Area Name", options: [], disabled: true },
  { name: "availableAppNoFrom", label: "Available Appno From", type: "text", disabled: true },
  { name: "availableAppNoTo", label: "Available Appno To", type: "text", disabled: true },
];

const DistributeForm = ({ formType }) => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    applicationNoFrom: Yup.string()
      .required("Required")
      .transform((value) => (value ? String(value) : value))
      .matches(/^[0-9]+$/, "Must be a valid number")
      .test("min-value", "Application No. From must be greater than 0", (value) => {
        const numValue = parseInt(value);
        return !isNaN(numValue) && numValue > 0;
      }),
    range: Yup.mixed()
      .required("Required")
      .test("is-valid-range", "Range must be a valid number greater than 0", (value) => {
        if (!value) return false;
        const numValue = value.includes("-") ? parseInt(value.split("-")[1]) : parseInt(value);
        return !isNaN(numValue) && numValue > 0;
      }),
    applicationNoTo: Yup.string()
      .required("Required")
      .transform((value) => (value ? String(value) : value))
      .matches(/^[0-9]+$/, "Must be a valid number")
      .test(
        "more-than-from",
        "Application No. To must be greater than Application No. From",
        function (value) {
          const numValue = parseInt(value);
          const numFrom = parseInt(this.parent.applicationNoFrom);
          return !isNaN(numValue) && !isNaN(numFrom) && numValue > numFrom;
        }
      ),
    ...(formType === "DGM" && {
      availableAppNoFrom: Yup.string()
        .required("Required")
        .transform((value) => (value ? String(value) : value))
        .matches(/^[0-9]+$/, "Must be a valid number"),
      availableAppNoTo: Yup.string()
        .required("Required")
        .transform((value) => (value ? String(value) : value))
        .matches(/^[0-9]+$/, "Must be a valid number"),
    }),
    ...(formType === "Campus" && {
      availableAppNoFrom: Yup.string()
        .required("Required")
        .transform((value) => (value ? String(value) : value))
        .matches(/^[0-9]+$/, "Must be a valid number"),
      availableAppNoTo: Yup.string()
        .required("Required")
        .transform((value) => (value ? String(value) : value))
        .matches(/^[0-9]+$/, "Must be a valid number"),
    }),
  });

  const [applicationNoFrom, setApplicationNoFrom] = useState("");
  const [applicationNoTo, setApplicationNoTo] = useState("");
  const [dropdownData, setDropdownData] = useState({
    academicYear: ["2021", "2022", "2023"],
    cityName: [],
    zoneName: ["Zone 1", "Zone 2", "Zone 3"],
    issuedTo: ["DGM", "Campus"],
    stateName: [],
    campusName: [],
    campaignDistrict: [],
    campaignAreaName: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("");

  // Function to check if application numbers overlap with previously issued ranges
  const checkOverlap = (applicationNoFrom, applicationNoTo) => {
    const issuedRanges = [
      { applicationNoFrom: 100, applicationNoTo: 200 },
      { applicationNoFrom: 300, applicationNoTo: 400 },
    ];

    const numFrom = parseInt(applicationNoFrom);
    const numTo = parseInt(applicationNoTo);

    return issuedRanges.some(
      (range) =>
        (numFrom >= range.applicationNoFrom && numFrom <= range.applicationNoTo) ||
        (numTo >= range.applicationNoFrom && numTo <= range.applicationNoTo)
    );
  };

  // Parse range value for calculations
  const parseRangeValue = (range) => {
    if (!range) return 0;
    return range.includes("-") ? parseInt(range.split("-")[1]) : parseInt(range);
  };

  // Calculate Application No To based on Application No From and Range
  const calculateApplicationNoTo = (appNoFrom, range) => {
    if (appNoFrom && range) {
      const numFrom = parseInt(appNoFrom);
      if (!isNaN(numFrom)) {
        return String(numFrom + parseRangeValue(range) - 1);
      }
    }
    return "";
  };

  // Calculate Available App No To based on Available App No From
  const calculateAvailableAppNoTo = (availAppNoFrom, range) => {
    if (availAppNoFrom && range) {
      const numFrom = parseInt(availAppNoFrom);
      if (!isNaN(numFrom)) {
        return String(numFrom + parseRangeValue(range) - 1);
      }
    }
    return "";
  };

  // Memoize fetchDropdownData to stabilize its reference
  const fetchDropdownData = useCallback(async () => {
    try {
      const states = ["State 1", "State 2", "State 3"];
      const citiesForState1 = ["City 1A", "City 1B"];
      const citiesForState2 = ["City 2A", "City 2B"];
      const citiesForState3 = ["City 3A", "City 3B"];
      const campuses = ["Campus 1", "Campus 2"];
      const districts = ["District 1", "District 2"];
      const areas = ["Area 1", "Area 2", "Area 3"];

      setDropdownData((prev) => ({
        ...prev,
        stateName: states,
        cityName:
          selectedState === "State 1"
            ? citiesForState1
            : selectedState === "State 2"
            ? citiesForState2
            : citiesForState3,
        campusName: campuses,
        campaignDistrict: districts,
        campaignAreaName: areas,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      setLoading(false);
    }
  }, [selectedState]);

  // Update applicationNoTo and availableAppNoTo when dependencies change
  useEffect(() => {
    setApplicationNoTo(calculateApplicationNoTo(applicationNoFrom, "1-10"));
  }, [applicationNoFrom]);

  // Fetch dropdown data when component mounts
  useEffect(() => {
    fetchDropdownData();
  }, [fetchDropdownData]);

  // Define field layouts for each form type
  const fieldLayouts = {
    Zone: [
      { id: "row-1", fields: ["academicYear", "stateName"] },
      { id: "row-2", fields: ["cityName", "zoneName"] },
      { id: "row-3", fields: ["issuedTo", "applicationNoFrom"] },
      { id: "row-4", fields: ["range", "applicationNoTo"] },
      { id: "row-5", fields: ["issueDate", "mobileNumber"] },
    ],
    DGM: [
      { id: "row-1", fields: ["academicYear", "cityName"] },
      { id: "row-2", fields: ["zoneName", "campusName"] },
      { id: "row-3", fields: ["issuedTo", "availableAppNoFrom"] },
      { id: "row-4", fields: ["availableAppNoTo", "applicationNoFrom"] },
      { id: "row-5", fields: ["range", "applicationNoTo"] },
      { id: "row-6", fields: ["issueDate", "mobileNumber"] },
    ],
    Campus: [
      { id: "row-1", fields: ["academicYear", "cityName"] },
      { id: "row-2", fields: ["zoneName", "campusName"] },
      { id: "row-3", fields: ["campaignDistrict", "campaignAreaName"] },
      { id: "row-4", fields: ["issuedTo", "applicationNoFrom"] },
      { id: "row-5", fields: ["availableAppNoFrom", "availableAppNoTo"] },
      { id: "row-6", fields: ["range", "applicationNoTo"] },
      { id: "row-7", fields: ["issueDate", "mobileNumber"] },
    ],
  };

  const fields = [
    ...commonFields,
    ...(formType === "Zone" ? zoneFields : []),
    ...(formType === "DGM" ? dgmFields : []),
    ...(formType === "Campus" ? campusFields : []),
  ];

  const initialValues = {
    academicYear: "2023",
    cityName: "City 1A",
    stateName: "State 1",
    issuedTo: "DGM",
    applicationNoFrom: applicationNoFrom,
    range: "",
    applicationNoTo: applicationNoTo,
    issueDate: "2025-08-21",
    mobileNumber: "9876543210",
    ...(formType === "Zone" && { stateName: "State 1" }),
    ...(formType === "DGM" && {
      campusName: "Campus 1",
      availableAppNoFrom: "500",
      availableAppNoTo: calculateAvailableAppNoTo("500", "1-10"),
    }),
    ...(formType === "Campus" && {
      campusName: "Campus 1",
      campaignDistrict: "District 1",
      campaignAreaName: "Area 1",
      availableAppNoFrom: "500",
      availableAppNoTo: calculateAvailableAppNoTo("500", "1-10"),
    }),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const submissionValues = {
          ...values,
          applicationNoFrom: parseInt(values.applicationNoFrom),
          applicationNoTo: parseInt(values.applicationNoTo),
          ...(formType === "DGM" && {
            availableAppNoFrom: parseInt(values.availableAppNoFrom),
            availableAppNoTo: parseInt(values.availableAppNoTo),
          }),
          ...(formType === "Campus" && {
            availableAppNoFrom: parseInt(values.availableAppNoFrom),
            availableAppNoTo: parseInt(values.availableAppNoTo),
          }),
        };

        if (checkOverlap(values.applicationNoFrom, values.applicationNoTo)) {
          alert("Application numbers already issued");
        } else {
          console.log("Form Submitted", submissionValues);
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="form-container">
            {loading ? (
              <div>Loading...</div>
            ) : (
              fieldLayouts[formType]
                .filter((row) => row.fields.length > 0)
                .map((row, rowIndex,array) => (
                  <div key={row.id} className={`form-row ${rowIndex === array.length - 1 ? "last-row" : ""}`}>
                    {row.fields.map((fieldName) => {
                      const field = fields.find((f) => f.name === fieldName);
                      if (!field) return null;
                      return (
                        <div key={field.name} className="form-field">
                          {field.options && !field.component ? (
                            <Field
                              as={Dropdown}
                              dropdownname={field.label}
                              list={dropdownData[field.name] || []}
                              name={field.name}
                              isDisabled={field.disabled}
                            />
                          ) : (
                            <Field
                              name={field.name}
                              label={field.label}
                              type={field.type || "text"}
                              component={field.component || Inputbox}
                              disabled={field.disabled || false}
                              onChange={
                                field.name === "applicationNoFrom"
                                  ? (e) => {
                                      setFieldValue(field.name, e.target.value);
                                      setApplicationNoFrom(e.target.value);
                                    }
                                  : undefined
                              }
                            />
                          )}
                          <ErrorMessage
                            name={field.name}
                            component="div"
                            className="error-message"
                          />
                        </div>
                      );
                    })}
                  </div>
                ))
            )}
          </div>
          <div className="form-button">
             <Button buttonname="Insert" type="submit" icon={rightarrow} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DistributeForm;