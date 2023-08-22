import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { BsEnvelope, BsLock, BsEye, BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .email("Zadejte platný e-mail"),
    password: Yup.string()
      .required("Toto pole nesmí být prázdné")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
        "Heslo musí obsahovat alespoň 8 znaků včetně malých a velkých písmen, číslic a speciálního znaku"
      ),
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
            <div>
              <div className="inputContainer">
                <BsEnvelope className="inputIcon" size={21} />
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="inputField"
                  placeholder="E-mail"
                />
              </div>
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <div className="inputContainer">
                <BsLock className="inputIcon" size={21} />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="inputField"
                  placeholder="Heslo"
                />
                {showPassword ? (
                  <BsEyeSlash
                    className="showPassword"
                    size={21}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <BsEye
                    className="showPassword"
                    size={21}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="inputContainer">
              <h5>
                Forgot your <Link style={{ color: "#ff7038" }} to="/forgot-password">password?</Link>
              </h5>
            </div>
            <button className="formButton" type="submit">
              LOGIN
            </button>
            <div className="inputContainer">
              <h5>
                Nemáte účet? <Link style={{ color: "#ff7038" }} to="/register">Vytvořte si jej zde</Link>
              </h5>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};

export default Login;
