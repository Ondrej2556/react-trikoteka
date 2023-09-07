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
import { registerUser } from "../api/userApi";

const Register = () => {
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    street: "",
    zipCode: "",
    city: "",
    country: "",
    bussinessId: "",
    taxId: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Toto pole nesmí být prázdné"),
    surname: Yup.string().required("Toto pole nesmí být prázdné"),
    email: emailValidationSchema.fields.email,
    phone: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(
        /^\+420\d{9}$/,
        "Zadejte platné telefonní číslo (formát: +420123456789)"
      ),
    street: Yup.string().required("Toto pole nesmí být prázdné"),
    zipCode: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(/^\d{5}$/, "Zadejte platný poštovní kód (formát: 11111)"),
    city: Yup.string().required("Toto pole nesmí být prázdné"),
    country: Yup.string().required("Toto pole nesmí být prázdné"),
    bussinessId: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(
        /^\d{8}$/,
        "Zadejte platné identifikační číslo (formát: 8 číslic)"
      ),
    password: passwordValidationSchema.fields.password,
  });

  const handleSubmit = async (values) => {
    // Handle form submission
    const user = await registerUser(values)
    console.log(user);

    //save user token to localstorage / cookies
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
                  name="name"
                  id="name"
                  className="inputField"
                  placeholder="Jméno"
                />
              </div>
              <ErrorMessage
                name="name"
                component="p"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="surname"
                  id="surname"
                  className="inputField"
                  placeholder="Příjmení"
                />
              </div>
              <ErrorMessage
                name="surname"
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
                  name="street"
                  id="street"
                  className="inputField"
                  placeholder="Ulice a č. p."
                />
              </div>
              <ErrorMessage
                name="street"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  className="inputField"
                  placeholder="PSČ"
                />
              </div>
              <ErrorMessage
                name="zipCode"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="city"
                  id="city"
                  className="inputField"
                  placeholder="Město"
                />
              </div>
              <ErrorMessage
                name="city"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPin className="inputIcon" size={21} />
                <Field
                  as="select"
                  name="country"
                  id="country"
                  className="inputField"
                >
                  <option value="">Stát</option>
                  <option value="Czechia">Česká republika</option>
                </Field>
              </div>
              <ErrorMessage
                name="country"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="bussinessId"
                  id="bussinessId"
                  className="inputField"
                  placeholder="IČO"
                />
              </div>
              <ErrorMessage
                name="bussinessId"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsPerson className="inputIcon" size={21} />
                <Field
                  type="text"
                  name="taxId"
                  id="taxId"
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
