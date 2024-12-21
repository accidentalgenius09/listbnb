"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions";
import { authActions } from "../../store/authSlice";

function Login() {
  const route = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [accessToken, setAccessToken] = useState("");
  
  
  function handleLoginClick() {
    setAccessToken(localStorage.getItem("accessToken"));
    if (accessToken) {
      dispatch(authActions.setActiveTab("account")); // Set active tab
      route.push("/profile"); // Navigate to profile page
    } else {
      route.push("/login");
    }
  }

  useEffect(() => {
    if (accessToken) {
      const gu = async () => {
        await getUserProfile(accessToken)
          .then((res) => {
            dispatch(authActions.setUserData(res));
          })
          .catch(async (error) => {
            route.push("/");
          });
      };
      gu();
    }
  }, [accessToken, route]);

  return (
    <button
      className={`${styles.signIn}`}
      onClick={(e) => {
        handleLoginClick();
      }}
    >
      <div>
        {" "}
        <Image
          src={"/images/Vector.png"}
          width={12}
          height={14}
          alt="Sign In"
        />{" "}
        {userData?.username ? userData?.username : "Sign In"}
      </div>{" "}
    </button>
  );
}

export default Login;
