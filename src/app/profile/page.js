"use client";
import React, { Suspense, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Account from "../../../components/Account"; // Assuming Account component exists
import { usePathname, useRouter } from "next/navigation";
import MyProfile from "../../../components/MyProfile";
import PostAds from "../../../components/PostAds";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/authSlice";
import moment from "moment";

function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);
  const activeTab = useSelector((state) => state.auth.activeTab) || "account";
  const handleLinkClick = (linkName) => {
    if (linkName === "logout") {
      localStorage.removeItem("accessToken");
      dispatch(authActions.setAccessToken(""));
      dispatch(authActions.setUserData({}));
      router.push("/login");
    } else {
      dispatch(authActions.setActiveTab(linkName)); // Update Redux state
    }
  };
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, []);
  return (
    <div className={`mx-5 my-4`}>
      <div>
        <span className={`${styles.profileText} mx-3`}>Home</span>
        <Image
          src={"/images/greaterthan.png"}
          alt="right arrow"
          width={5}
          height={10}
        />
        <span className={`${styles.profileText} mx-3`}>
          {activeTab === "account"
            ? "My Account"
            : activeTab === "profile"
            ? "Profile"
            : activeTab === "ads"
            ? "Ads"
            : activeTab === "postAd"
            ? "Post Ad"
            : ""}{" "}
        </span>
      </div>
      <Container fluid className={styles.profileContainer}>
        <Row>
          {/* Sidebar */}
          <Col md={3} className={styles.sidebar}>
            <ul className={styles.navList}>
              <li
                className={`${
                  activeTab === "account" ? styles.active : styles.textcolor
                }`}
                onClick={() => handleLinkClick("account")}
              >
                My Account
              </li>
              <li
                className={`${
                  activeTab === "profile" ? styles.active : styles.textcolor
                }`}
                onClick={() => handleLinkClick("profile")}
              >
                Profile
              </li>
              <li
                className={`${
                  activeTab === "ads" ? styles.active : styles.textcolor
                }`}
                onClick={() => handleLinkClick("ads")}
              >
                Ads
              </li>
              <li
                className={`${styles.postAd} ${
                  activeTab === "postAd" ? styles.active : styles.highlight
                }`}
                onClick={() => handleLinkClick("postAd")}
              >
                Post Ad
              </li>
              <li
                style={{ color: "#667085" }}
                onClick={() => handleLinkClick("logout")}
              >
                Logout
              </li>
            </ul>
          </Col>

          {/* Main Content */}
          <Suspense>
          <Col md={9}>
            {" "}
            {/* Adjust width as needed */}
            {activeTab === "account" ? (
              <Account activeLink={activeTab} />
            ) : activeTab === "profile" ? (
              <MyProfile />
            ) : activeTab === "ads" ? (
              <Account />
            ) : activeTab === "postAd" ? (
              <PostAds />
            ) : (
              ""
            )}
          </Col>
          </Suspense>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
