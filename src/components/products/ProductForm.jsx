import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Other"];
const colors = ["Blue", "Red", "Green", "White", "Other"];

const ProductForm = ({ type, product }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const initialValues = {
    image: product?.imageUrl || null,
    title: product?.title || "",
    description: product?.description || "",
    color: product?.color || [],
    category: product?.categories || [],
    keywords: product?.keywords || [],
    version: product ? "edited" : "new",
  };

  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
    }
  }, [product]);

  const validationSchema = Yup.object({
    image: Yup.mixed().required("File is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    color: Yup.array().min(1, "Colors are required"),
    category: Yup.array().min(1, "Category are required"),
    keywords: Yup.array().min(1, "Keywords are required"),
  });

  const renderTextField = (name, label, setFieldValue) => (
    <div className="inputContainer">
      <Field
        component={TextField}
        fullWidth
        variant="filled"
        name={name}
        id={name}
        placeholder={label}
        defaultValue={initialValues[name]}
        inputProps={{
          onChange: (e) => {
            setFieldValue(name, e.currentTarget.value);
          },
        }}
      />
      <ErrorMessage name={name} component="p" className="error-message" />
    </div>
  );

  const handleSubmit = (values) => {
    // Handle form submission

    console.log(values);
  };

  return (
    <main>
      <div className="FormPage">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="FormStyle">
              {/* IMAGE FIELD */}
              <div>
                <div className="inputContainer">
                  <label htmlFor="image">Obrázek (PNG) &nbsp;</label>
                  <Field
                    component={TextField}
                    type="file"
                    name="image"
                    id="image"
                    placeholder="Obrázek"
                    inputProps={{
                      accept: ".png",
                      onChange: (e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                        setSelectedImage(
                          e.currentTarget.files[0]
                            ? URL.createObjectURL(e.currentTarget.files[0])
                            : null
                        );
                      },
                    }}
                  />
                </div>
                {selectedImage && <img src={selectedImage} width="50px" />}
                <ErrorMessage
                  name="image"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />

              {/* TEXT FIELD */}

              {renderTextField("title", "Název", setFieldValue)}

              <br />

              {/* TEXT FIEL DESCRIPTION */}

              {renderTextField("description", "Popis", setFieldValue)}

              <br />

              {/* COLOR FIELD */}
              <div>
                <div className="inputContainer">
                  <Field
                    fullWidth
                    type="text"
                    component={Autocomplete}
                    autoHighlight
                    id="color"
                    name="color"
                    multiple
                    defaultValue={initialValues.color}
                    options={colors}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Zvolte barvu"
                      />
                    )}
                    onChange={(_, value) => setFieldValue("color", value)}
                  />
                </div>
                <ErrorMessage
                  name="color"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />

              {/* CATEGORY FIELD */}
              <div>
                <div className="inputContainer">
                  <Field
                    id="category"
                    name="category"
                    type="text"
                    fullWidth
                    autoHighlight
                    component={Autocomplete}
                    multiple
                    defaultValue={initialValues.category}
                    options={categories}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Kategorie"
                      />
                    )}
                    onChange={(_, value) => setFieldValue("category", value)}
                  />
                </div>
                <ErrorMessage
                  name="category"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />

              {/* CATEGORY FIELD */}

              <div>
                <div className="inputContainer">
                  <Field
                    fullWidth
                    type="text"
                    component={Autocomplete}
                    autoHighlight
                    multiple
                    id="keywords"
                    name="keywords"
                    defaultValue={initialValues.keywords}
                    options={categories}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label="Klíčová slova"
                      />
                    )}
                    onChange={(_, value) => setFieldValue("keywords", value)}
                  />
                </div>
                <ErrorMessage
                  name="keywords"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />
              <button className="formButton" type="submit">
                {type}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default ProductForm;
