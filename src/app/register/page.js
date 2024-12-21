"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Form, Row, Col, Container, InputGroup, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import { registerUser } from "../../../actions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";

export default function Register() {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!accessToken) {
      route.push("/register");
    }
  }, [accessToken]);

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle navigation to Login
  function handleLoginClick() {
    route.push("/login");
  }

  return (
    <Container className={`${styles.loginContainer}`}>
      <Row className="justify-content-center">
        {/* Left Section: Login Form */}
        <Col md={6} className={`${styles.loginform} mt-5 my-3`}>
          <div className={`${styles.loginBrand} text-center`}>
            <Image
              src={`/images/logo.png.png`}
              width={186}
              height={40}
              className={`${styles.logo}`}
              alt="listbnb logo"
            />
            <p className="my-5">
              <strong>Listbnb</strong> a Largest Classified Listing Marketplace
              offers perfect <br /> Ads classifieds...
            </p>
          </div>
          <h4 className="text-center mb-4">
            Create Your <br /> Account
          </h4>
          <Container className={`${styles.formContainer}`}>
            <Formik
              initialValues={{
                email: "",
                username: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const strObj = {
                  email: values?.email,
                  username: values?.username,
                  password: values?.password,
                };
                startTransition(async () => {
                  const res = await registerUser(strObj);
                  if (res?.data === null) {
                    toast(res?.error?.message);
                  } else {
                    toast(
                      "Profile Created Successfully. Kindly wait while you redirect to your Profile"
                    );
                    dispatch(authActions.setAccessToken(res?.jwt));
                    localStorage.setItem("accessToken", res?.jwt);
                    dispatch(authActions.setUserData(res?.user));
                    route.push("/profile");
                  }
                });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email <span className={`${styles.mainColor}`}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Type here"
                        className={`${styles.inputForm} w-75`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputGroup.Text className={`${styles.inputBox}`}>
                        <Image
                          src={"/images/Container.png"}
                          width={29}
                          height={26}
                          alt="email"
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {touched.email && errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Username <span className={`${styles.mainColor}`}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Type here"
                        className={`${styles.inputForm} w-75`}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputGroup.Text className={`${styles.inputBox}`}>
                        <Image
                          src={"/images/Container.png"}
                          width={29}
                          height={26}
                          alt="username"
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {touched.username && errors.username && (
                      <div className="text-danger">{errors.username}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password <span className={`${styles.mainColor}`}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Type here"
                        className={`${styles.inputForm} w-75`}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputGroup.Text
                        className={`${styles.inputBox}`}
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src={"/images/ContainerKey.png"}
                          width={29}
                          height={26}
                          alt="password visibility toggle"
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {touched.password && errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Confirm Password{" "}
                      <span className={`${styles.mainColor}`}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Type here"
                        className={`${styles.inputForm} w-75`}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <InputGroup.Text
                        className={`${styles.inputBox}`}
                        onClick={toggleConfirmPasswordVisibility}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          src={"/images/ContainerKey.png"}
                          width={29}
                          height={26}
                          alt="password visibility toggle"
                        />
                      </InputGroup.Text>
                    </InputGroup>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="text-danger">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Group>

                  <button
                    type="submit"
                    className={`${styles.btnPink} text-center w-100 my-5`}
                  >
                    <div>
                      Register{" "}
                      <Image
                        src={"/images/rightArrow.png"}
                        width={14}
                        height={9}
                        alt={"Right arrow"}
                      />
                    </div>
                  </button>
                </Form>
              )}
            </Formik>
          </Container>
        </Col>

        {/* Right Section: Illustration + Register */}
        <Col md={6} className={`${styles.registerSection}`}>
          <div className={`${styles.registerCard}`}>
            <Image
              src={`/images/thumb-1-1.png.png`}
              alt="Illustration"
              className="img-fluid mt-3 mb-4"
              width={325}
              height={344}
            />
            <h4>
              Already Have an Account
              <span className={`${styles.mainColor}`}>?</span>
            </h4>
            <p className="my-4">
              To connect with us please login to our <br /> account if you are
              having one already.
            </p>
            <button
              className={`${styles.btnPink} w-25 mt-2`}
              onClick={handleLoginClick}
            >
              <div>
                Login{" "}
                <Image
                  src={"/images/rightArrow.png"}
                  width={14}
                  height={9}
                  alt={"Right arrow"}
                />
              </div>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
