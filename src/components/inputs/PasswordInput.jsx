import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { BsLock, BsEye, BsEyeSlash } from "react-icons/bs";

const passwordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Toto pole nesmí být prázdné")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
      "Heslo musí obsahovat alespoň 8 znaků včetně malých a velkých písmen, číslic a speciálního znaku"
    ),
});

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
      <ErrorMessage name="password" component="div" className="error-message" />
    </div>
  );
};

export { passwordValidationSchema, PasswordInput };
