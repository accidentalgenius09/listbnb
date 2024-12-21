"use client"
import React, { useEffect, useState, useTransition } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { deleteAd, getAd, getUserProfile } from "../../actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import moment from "moment";

function Account({ activeLink = "" }) {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [adData, setAdData] = useState([]);
  const activeTab = useSelector((state) => state.auth.activeTab);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const ts = searchParams.get("ts") || "";
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    if (accessToken) {
      const gu = async () => {
        await getUserProfile(accessToken)
          .then((res) => {
            dispatch(authActions.setUserData(res));
          })
          .catch(async (error) => {
            route.push("/login");
          });
        await getAd(accessToken)
          .then((res) => {
            setAdData(res);
          })
          .catch(async (error) => {
            route.push("/");
          });
      };
      gu();
    }
  }, [activeTab, ts]);
  function handleEditClick() {
    dispatch(authActions.setActiveTab("profile"));
  }
  function handleDeleteClick(id) {
    startTransition(async () => {
      const res = await deleteAd(accessToken, id);
      if (res?.data === null) {
        toast(res?.error?.message);
      } else {
        toast(
          "Profile Created Successfully. Kindly wait while you redirect to your Profile"
        );
        if (activeTab === "ads") {
          dispatch(authActions.setActiveTab("ads"));
          route.replace(`${pathName}?ts=${moment().unix()}`);
        } else {
          dispatch(authActions.setActiveTab("account"));
          route.replace(`${pathName}?ts=${moment().unix()}`);
        }
      }
    });
  }

  return (
    <Col md={12}>
      {/* User Info */}
      {activeLink === "account" && (
        <Card className={`${styles.cardFormat} mb-4 px-3 pt-3`}>
          <Row>
            <Col md={1}>
              <Image
                src={"/images/myAccout.png.png"}
                alt="Profile"
                width={65}
                height={65}
                className={styles.profileImage}
              />
            </Col>
            <Col md={9}>
              <h5 style={{ color: "#333333" }}>
                {userData?.firstName && userData?.lastName
                  ? userData?.firstName + userData.lastName
                  : userData?.firstName && !userData?.lastName
                  ? userData?.firstName
                  : userData?.username}
              </h5>
              <p style={{ color: "#667085" }}>
                Member since <br /> 2019
              </p>
            </Col>
            <Col md={2} className="text-end">
              <button
                onClick={(e) => {
                  handleEditClick();
                }}
                className={`${styles.editprof}`}
              >
                Edit Profile
              </button>
            </Col>
            <div style={{ color: "#667085" }}>
              <hr className="w-100" />
              <p>
                {userData?.location && (
                  <span>
                    <Image
                      width={13}
                      height={17}
                      alt="location"
                      className="mb-1 me-3"
                      src={`/images/location.png`}
                    />
                    {userData?.location}
                  </span>
                )}
                {userData?.email && (
                  <span className="mx-3">
                    {" "}
                    <Image
                      width={29}
                      height={25}
                      alt="location"
                      className="mb-2"
                      src={`/images/Container.png`}
                    />
                    {userData?.email}
                  </span>
                )}
                {userData?.phone && (
                  <span className="me-3">
                    {" "}
                    <Image
                      width={18}
                      height={18}
                      alt="location"
                      className="mb-1 me-3"
                      src={`/images/phone.png`}
                    />
                    {userData?.phone}
                  </span>
                )}
              </p>
            </div>
          </Row>
        </Card>
      )}

      {/* Ads Section */}
      {adData?.map((ad, index) => (
        <Card className={`${styles.cardFormat} mb-3 p-3`} key={index}>
          {" "}
          {/* Add key prop for unique identification */}
          <Row>
            <Col md={2}>
              <Image
                src={ad?.image}
                width={100}
                height={150}
                alt="Ad Image"
                className={styles.adImage}
              />
            </Col>
            <Col md={6} className="mb-5">
              <h6 style={{ color: "#333333" }}>{ad?.title}</h6>
              <p>
                <span style={{ color: "#667085" }}>Dallas, Texas ·</span>{" "}
                <span style={{ color: "#524EB7" }}>24hrs ago</span>
              </p>
              <p>{ad?.description}</p>
              <h5 style={{ color: "#333333" }}>${ad?.price}</h5>
            </Col>
            <Col md={4} className="text-end">
              <button className={`me-2 ${styles.viewAdSection}`}>View</button>
              <button
                onClick={() => {
                  handleDeleteClick(ad?.id);
                }}
                className={`me-2 ${styles.editAdSection}`}
              >
                Delete
              </button>
            </Col>
          </Row>
        </Card>
      ))}
    </Col>
  );
}

export default Account;
