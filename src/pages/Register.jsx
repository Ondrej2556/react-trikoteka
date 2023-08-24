import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsPerson, BsTelephone, BsPin } from "react-icons/bs";
import {
  PasswordInput,
  passwordValidationSchema,
} from "../components/inputs/PasswordInput";
import {
  emailValidationSchema,
  EmailInput,
} from "../components/inputs/EmailInput";

const Register = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    state: "",
    ic: "",
    dic: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Toto pole nesmí být prázdné"),
    lastname: Yup.string().required("Toto pole nesmí být prázdné"),
    email: emailValidationSchema.fields.email,
    phone: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(
        /^\+420\d{9}$/,
        "Zadejte platné telefonní číslo (formát: +420123456789)"
      ),
    address: Yup.string().required("Toto pole nesmí být prázdné"),
    postalCode: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(/^\d{5}$/, "Zadejte platný poštovní kód (formát: 11111)"),
    state: Yup.string().required("Toto pole nesmí být prázdné"),
    ic: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(
        /^\d{8}$/,
        "Zadejte platné identifikační číslo (formát: 8 číslic)"
      ),
    password: passwordValidationSchema.fields.password,
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <main>
      <div className="breadCrumbs">Register Here!</div>
      <div className="FormPage">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="FormStyle">
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="inputField"
                  placeholder="Jméno"
                />
              </div>
              <ErrorMessage
                name="firstname"
                component="p"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="inputField"
                  placeholder="Příjmení"
                />
              </div>
              <ErrorMessage
                name="lastname"
                component="p"
                className="error-message"
              />
            </div>
            <EmailInput />
            <div>
              <div className="inputContainer">
                <BsTelephone className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  className="inputField"
                  placeholder="Telefonní číslo"
                />
              </div>
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="address"
                  id="address"
                  className="inputField"
                  placeholder="Ulice a č. p."
                />
              </div>
              <ErrorMessage
                name="address"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="inputField"
                  placeholder="PSČ"
                />
              </div>
              <ErrorMessage
                name="postalCode"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  as="select"
                  name="state"
                  id="state"
                  className="inputField"
                >
                  <option value="">Stát</option>
                  <option value="Czechia">Česká republika</option>
                </Field>
              </div>
              <ErrorMessage
                name="state"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="ic"
                  id="ic"
                  className="inputField"
                  placeholder="IČO"
                />
              </div>
              <ErrorMessage
                name="ic"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="dic"
                  id="dic"
                  className="inputField"
                  placeholder="DIČ"
                />
              </div>
            </div>
            <PasswordInput />
            <button className="formButton" type="submit">
              REGISTER
            </button>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Register;
