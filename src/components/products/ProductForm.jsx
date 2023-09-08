import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import { createProduct, editProductById, uploadMedia } from "../../api/productApi";
import {
  getAllCategories,
  getAllColors,
  getAllKeywords,
} from "../../api/productApi";
import Loader from "../loader/Loader";
import ProductImage from "./ProductImage";

const ProductForm = ({ type, product }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasImageChanged, sethasImageChanged] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCategories();
        const colors = await getAllColors();
        const keywords = await getAllKeywords();
        if (!categories || !colors || !keywords) {
          setIsLoading(false);
          return;
        }
        setCategories(categories);
        setColors(colors);
        setKeywords(keywords);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const initialValues = {
    image: product?.mediaId || null,
    title: product?.title || "",
    description: product?.description || "",
    colorIds: product?.colors || [],
    categoryIds: product?.categoryIds || [],
    keywords: product?.keywords || [],
    version: product ? "edited" : "new",
  };
  // Convert category IDs to names
  if (product && product.categoryIds) {
    const categoryNames = product.categoryIds.map((categoryId) => {
      const category = categories.find((cat) => cat.id === categoryId);
      return category ? category : "";
    });
    initialValues.categoryIds = categoryNames;
  }

  useEffect(() => {
    if (product) {
      
      setSelectedImage(product.mediaId);
    }
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
    if (hasImageChanged) {
      console.log("Image change: ", hasImageChanged)
      const imageResult = await uploadMedia(values.image);
      if (!imageResult) {
        console.error("Something went wrong uploading image.");
        return;
      }
  
      const modifiedProductData = {
        ...values,
        colors: values.colorIds.map((color) => color.id),
        categoryIds: values.categoryIds.map((category) => category.id),
        mediaId: imageResult.id,
      };
  
      if (initialValues.version === "new") {
        const product = await createProduct(modifiedProductData);
        console.log("Product created: ", product);
        if (!product) {
          console.error("Something went wrong creating product.");
          return;
        }
      } else {
        console.log("edit produtc data: ", modifiedProductData)
        const editedProduct = await editProductById(product.uuid, modifiedProductData);
        console.log("Product edited: ", editedProduct);
        if (!editedProduct) {
          console.error("Something went wrong editing product.");
          return;
        }
      }
    } else {
      console.log("Image change: ", hasImageChanged)
      // No image change, use initialValues directly
      const productData = {
        ...initialValues,
        colors: initialValues.colorIds.map((color) => color.id),
        categoryIds: initialValues.categoryIds.map((category) => category.id),
      };
      console.log(productData, "produktdata")
        const editedProduct = await editProductById(product.uuid, productData);
        console.log("Product edited: ", editedProduct);
        if (!editedProduct) {
          console.error("Something went wrong editing product.");
          return;
        }
    }
  };
  

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="FormPage">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
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
                          sethasImageChanged(true)
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
                  {/* {selectedImage && <img src={selectedImage} width="50px" />} */}
                  {selectedImage && <ProductImage mediaUrl={selectedImage} title="Produkt" width="50px" />}
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
                    <FormGroup>
                      <label>Zvolte barvu</label>
                      {colors.map((color) => (
                        <FormControlLabel
                          key={color.id}
                          control={
                            <Checkbox
                              sx={{
                                color: color.hex,
                                "&.Mui-checked": {
                                  color: color.hex,
                                },
                              }}
                              defaultChecked={initialValues.colorIds.includes(
                                color.id
                              )}
                              onChange={() => {
                                const newSelectedColors = values.colorIds.includes(color.id)
                                  ? values.colorIds.filter((id) => id !== color.id)
                                  : [...values.colorIds, color.id];
                                setFieldValue("colorIds", newSelectedColors);
                              }}
                            />
                          }
                          label={color.name}
                        />
                      ))}
                    </FormGroup>
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
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
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
      )}
    </main>
  );
};

export default ProductForm;
