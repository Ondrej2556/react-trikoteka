import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { createProduct, uploadMedia } from "../../api/productApi";
import {
  getAllCategories,
  getAllColors,
  getAllKeywords,
} from "../../api/productApi";


const ProductForm = ({ type, product }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCategories();
        const colors = await getAllColors();
        const keywords = await getAllKeywords();
        if (!categories || !colors || !keywords) {
          return;
        }
        setCategories(categories);
        setColors(colors);
        setKeywords(keywords);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (product) {
    }

    fetchData();
  }, []);

  const [initialValues, setInitialValues] = useState({
    image: product?.imageUrl || null,
    title: product?.title || "",
    description: product?.description || "",
    colorIds: product?.colorIds || [],
    categoryIds: product?.categoryIds || [],
    keywords: product?.keywords || [],
    version: product ? "edited" : "new",
  });


  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrl);
    }
    console.log("INITIAL VALUELS", initialValues);
  }, [product]);

  const validationSchema = Yup.object({
    image: Yup.mixed().required("File is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    colorIds: Yup.array().min(1, "Colors are required"),
    categoryIds: Yup.array().min(1, "Category are required"),
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

  const handleSubmit = async (values) => {
    const { image, ...productData } = values;
    const imageResult = await uploadMedia(values.image);
    if (!imageResult) {
      console.error("something went wrong uploading image.");
      return;
    }
    const modifiedProductData = {
      ...productData,
      colorIds: productData.colorIds.map((color) => color.id),
      categoryIds: productData.categoryIds.map((category) => category.id),
      mediaId: imageResult.id,
    };

    const product = await createProduct(modifiedProductData);
    console.log(product);
    if (!product) {
      console.error("something went wrong creating product.");
      return;
    }
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
                    id="colorIds"
                    name="colorIds"
                    multiple
                    defaultValue={initialValues.colorIds}
                    options={colors}
                    getOptionLabel={(option) => option.name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
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
                    onChange={(_, value) => setFieldValue("colorIds", value)}
                  />
                </div>
                <ErrorMessage
                  name="colorIds"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />

              {/* CATEGORY FIELD */}
              <div>
                <div className="inputContainer">
                  <Field
                    id="categoryIds"
                    name="categoryIds"
                    type="text"
                    fullWidth
                    autoHighlight
                    component={Autocomplete}
                    multiple
                    defaultValue={initialValues.categoryIds}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
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
                    onChange={(_, value) => {
                      setFieldValue("categoryIds", value);
                    }}
                  />
                </div>
                <ErrorMessage
                  name="categoryIds"
                  component="p"
                  className="error-message"
                />
              </div>
              <br />

              {/* KEYWORDS FIELD */}

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
                    options={keywords}
                    //getOptionLabel={(option) => option.name}
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
