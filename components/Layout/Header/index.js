"use client";
import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";
import Login from "../../Login";
import PostAd from "../../Ad";
import { useRouter } from "next/navigation";

function Header() {
  const route = useRouter();

  function handleLogoClick() {
    route.push("/");
  }
  return (
    <div className={`${styles.headerNav}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left-aligned logo */}
        <div style={{cursor:"pointer"}} className="d-flex align-items-center" onClick={handleLogoClick}>
          <Image
            src={`/images/logo.png.png`}
            width={186}
            height={40}
            className={`${styles.logo}`}
            alt="listbnb logo"
          />
        </div>
        {/* Right-aligned login and post ad */}
        <div className="d-flex align-items-center gap-3 gap-md-4">
          <Login />
          <PostAd />
        </div>
      </div>
    </div>
  );
}

export default Header;
