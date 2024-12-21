"use client";
import React, { useTransition } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authActions } from "../../store/authSlice";

function MyProfile() {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const userData = useSelector((state) => state.auth.userData);
  const accessToken = localStorage.getItem("accessToken");
  const route = useRouter();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().required("Username is required"),
    photo: Yup.string().url("Invalid URL").required("Photo URL is required"),
    location: Yup.string().required("Location is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Contact Number must be numeric")
      .required("Contact Number is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
      username: userData?.username || "",
      photo: userData?.photo || "",
      location: userData?.location || "",
      phone: userData?.phone || "",
    },
    validationSchema,
    onSubmit: (values) => {
      const strObj = {
        firstName: values.firstName || userData?.firstName,
        lastName: values.lastName || userData?.lastName,
        email: values.email || userData?.email,
        username: values.username || userData?.username,
        photo: values.photo || userData?.photo,
        location: values.location || userData?.location,
        phone: values.phone || userData?.phone,
      };
      startTransition(async () => {
        const res = await updateUserProfile(accessToken, strObj);
        if (res?.data === null) {
          toast(res?.error?.message);
        } else {
          toast(
            "Profile Created Successfully. Kindly wait while you redirect to your Profile"
          );
          dispatch(authActions.setUserData(res?.user));
          dispatch(authActions.setActiveTab("account"))
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
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>
                  <span style={{ color: "#212121" }}>First Name</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-danger">{formik.errors.firstName}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Last Name</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-danger">{formik.errors.lastName}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Email</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="email"
                  placeholder="Type here"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Username</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger">{formik.errors.username}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="photo">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Photo</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Image URL"
                  {...formik.getFieldProps("photo")}
                />
                {formik.touched.photo && formik.errors.photo && (
                  <div className="text-danger">{formik.errors.photo}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="location">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Location</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("location")}
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="text-danger">{formik.errors.location}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>
                  <span style={{ color: "#212121" }}>Contact Number</span>
                  <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <Form.Control
                  className={`${styles.inputForm} w-100`}
                  type="text"
                  placeholder="Type here"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-danger">{formik.errors.phone}</div>
                )}
              </Form.Group>

              <button
                type="submit"
                className={`${styles.btnPink} text-center w-100 mt-3 mb-4`}
              >
                <div>Save</div>
              </button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfile;
