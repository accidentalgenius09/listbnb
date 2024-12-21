import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

function PostAd() {
  const route = useRouter();
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.auth.activeTab);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    if (!accessToken) {
      route.push("/login");
    }
  }, [accessToken, dispatch, route]);

  function handlePostAd() {
    if (accessToken) {
      dispatch(authActions.setActiveTab("postAd"));
      route.push("/profile");
    } else {
      route.push("/login");
    }
  }
  return (
    <button
      className={`${styles.Ad}`}
      onClick={(e) => {
        handlePostAd();
      }}
    >
      <div>
        Post your Ad{" "}
        <Image
          src={"/images/rightArrow.png"}
          width={14}
          height={9}
          alt={"Right arrow"}
        />
      </div>{" "}
    </button>
  );
}

export default PostAd;
