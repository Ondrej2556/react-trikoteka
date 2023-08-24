import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  PasswordInput,
  passwordValidationSchema,
} from "../components/inputs/PasswordInput";
import {
  emailValidationSchema,
  EmailInput,
} from "../components/inputs/EmailInput";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: emailValidationSchema.fields.email,
    password: passwordValidationSchema.fields.password,
  });

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <main>
      <div className="breadCrumbs">Login Here!</div>
      <div className="FormPage">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="FormStyle">
            <EmailInput />
            <PasswordInput />
            <div className="inputContainer">
              <h5>
                Forgot your{" "}
                <Link style={{ color: "#ff7038" }} to="/forgot-password">
                  password?
                </Link>
              </h5>
            </div>
            <button className="formButton" type="submit">
              LOGIN
            </button>
            <div className="inputContainer">
              <h5>
                Nemáte účet?{" "}
                <Link style={{ color: "#ff7038" }} to="/register">
                  Vytvořte si jej zde
                </Link>
              </h5>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Login;
