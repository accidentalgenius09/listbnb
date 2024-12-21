"use client";
import React, { useEffect, useTransition } from "react";
import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userLogin } from "../../../actions";
import { authActions } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      const strObj = {
        identifier: values?.username,
        password: values?.password,
      };
      startTransition(async () => {
        const res = await userLogin(strObj);
        if (res?.data === null) {
          toast(res?.error?.message);
        } else {
          toast(
            "Profile Created Successfully. Kindly wait while you redirect to your Profile"
          );
          dispatch(authActions.setAccessToken(res?.jwt));
          localStorage.setItem("accessToken", res?.jwt);
          dispatch(authActions.setUserData(res?.user));
          router.push("/profile");
        }
      });
    },
  });

  function handleRegister() {
    router.push("/register");
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
            Login To Your <br /> Account
          </h4>
          <Container className={`${styles.formContainer}`}>
            <Form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Password <span className={`${styles.mainColor}`}>*</span>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Type here"
                    className={`${styles.inputForm} w-75`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputGroup.Text className={`${styles.inputBox}`}>
                    <Image
                      src={"/images/ContainerKey.png"}
                      width={29}
                      height={26}
                      alt="password"
                    />
                  </InputGroup.Text>
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Group>
              <Button
                type="submit"
                className={`${styles.btnPink} text-center w-100 my-5`}
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
              </Button>
            </Form>
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
              Don't Have an Account
              <span className={`${styles.mainColor}`}>?</span>
            </h4>
            <p className="my-4">
              To connect with us please register for a new <br /> account if you
              are not having one already.
            </p>
            <Button
              className={`${styles.btnPink} w-25 mt-2`}
              onClick={handleRegister}
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
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
