"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions";
import { authActions } from "../../store/authSlice";

function Login() {
  const route = useRouter();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  const searchParams = useSearchParams();
  const ts = searchParams.get("ts") || "";


  function handleLoginClick() {
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
  }, [accessToken, route, ts]);

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
