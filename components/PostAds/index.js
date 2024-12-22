"use client";
import React, { useTransition } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postAd } from "../../actions";
import { toast } from "react-toastify";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function PostAds() {
  // Yup validation schema
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const route = useRouter();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const validationSchema = Yup.object({
    title: Yup.string().required("Ad Title is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string()
      .url("Invalid URL format")
      .required("image URL is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const strObj = {
        title: values?.title,
        price: values?.price,
        description: values?.description,
        image: values?.image,
      };
      startTransition(async () => {
        const res = await postAd(accessToken, strObj);
        if (res?.data === null) {
          toast(res?.error?.message);
        } else {
          dispatch(authActions.setActiveTab("ads"));
        }
      });
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center vh-90">
      <Row className={`${styles.cardFormat} w-100`}>
        <Col xs={12} md={6} className="mx-auto">
          <div className="form-wrapper p-4">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Ad Title</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Price</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-danger">{formik.errors.price}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Description</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className={`${styles.inputDesc} w-100`}
                  placeholder="Type here"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-danger">{formik.errors.description}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Photo</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Image URL"
                  {...formik.getFieldProps("image")}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-danger">{formik.errors.image}</div>
                )}
              </Form.Group>

              <button
                type="submit"
                className={`${styles.btnPink} text-center w-100 mt-3 mb-4`}
              >
                <div>Post</div>
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PostAds;
