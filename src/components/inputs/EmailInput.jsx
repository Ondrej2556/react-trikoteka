import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsEnvelope } from "react-icons/bs";

const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Toto pole nesmí být prázdné")
    .email("Zadejte platný e-mail"),
});

const EmailInput = () => {
  return (
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
      <ErrorMessage name="email" component="div" className="error-message" />
    </div>
  );
};

export { emailValidationSchema, EmailInput };
