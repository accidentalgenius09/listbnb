import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

function Footer() {
  return (
    <div className={`${styles.footerMain}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left-aligned logo */}
        <div className="d-flex align-items-center j">
          <Image
            src={`/images/logo-white-2.png.png`}
            width={186}
            height={40}
            className={`${styles.logo}`}
            alt="listbnb logo"
          />
          <Image
            src={`/images/Vertical-Divider.png`}
            width={1}
            height={20}
            alt="vertical divider"
          />
          <div className={`${styles.copyright} ms-5`}>Copyright 2024</div>
        </div>
        {/* Right-aligned login and post ad */}
        <div className="d-flex align-items-center gap-3 gap-md-4">
          <Image
            src={`/images/Component3.png`}
            width={10}
            height={26}
            alt="vertical divider"
          />
          <Image
            src={`/images/Component4.png`}
            width={16}
            height={26}
            alt="vertical divider"
          />
          <Image
            src={`/images/Component.png`}
            width={18}
            height={26}
            alt="vertical divider"
          />
          <Image
            src={`/images/Component2.png`}
            width={18}
            height={26}
            alt="vertical divider"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
