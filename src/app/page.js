"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import styles from "./page.module.scss";
import Image from "next/image";
import { getAd } from "../../actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const [hoveredCardId, setHoveredCardId] = useState("");
  const [selectedView, setSelectedView] = useState("gridView");
  const [adData, setAdData] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const gu = async () => {
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
  }, [accessToken]);

  return (
    <Container fluid className={styles.homepage}>
      {/* Hero Section */}
      <Row className={`${styles.heroSection} text-center mb-5`}>
        <Col md={12}>
          <Image
            src="/images/Placeholder.png"
            width={1586}
            height={620}
            alt="Hero"
            className="img-fluid"
          />
        </Col>
      </Row>

      {/* Recommendations Section */}
      {adData?.length > 0 && (
        <Row className={`${styles.recommendationsSection} mb-5`}>
          <Col xs={12}>
            <h6 className="text-center text-uppercase">What's New</h6>
            <h1 className="text-center mb-4">Fresh Recommendations</h1>
            <div className="d-flex justify-content-between me-3">
              <p className="text-muted">
                <strong>
                  {" "}
                  <span style={{ color: "#f50964" }}>
                    {adData?.length}
                  </span>{" "}
                  {adData?.length === 1 ? "Item" : "Items"}
                </strong>
              </p>
              <div className="mb-2">
                <Image
                  width={40}
                  height={40}
                  src={
                    selectedView === "gridView"
                      ? "/images/gridViewSelet.png"
                      : "/images/gridView.png"
                  }
                  alt="grid view"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedView("gridView")}
                />
                <Image
                  width={40}
                  height={40}
                  src={
                    selectedView === "colView"
                      ? "/images/colViewSelect.png"
                      : "/images/colView.png"
                  }
                  alt="grid view"
                  className="mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedView("colView")}
                />
              </div>
            </div>
          </Col>
          <Row>
            {adData?.map((item) => (
              <React.Fragment key={item.id}>
                {selectedView === "gridView" ? (
                  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={`${styles.recommendationCard}`}
                    >
                      <Button className={`${styles.badgeEdit}`}>Edit Ad</Button>
                      <Card.Img
                        src={item.image}
                        alt={item.title}
                        className={`${styles.cardImage}`}
                      />
                      <Card.Body>
                        <Card.Text className="mb-2 text-muted">
                          {item.location} • {item.time}
                        </Card.Text>
                        <Card.Title className="mt-3">{item.title}</Card.Title>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <Card.Title className={`${styles.textColor} mt-3`}>
                            {item.price}
                          </Card.Title>
                          <Image
                            src={
                              hoveredCardId === item.id
                                ? "/images/Link2.png"
                                : "/images/Link.png"
                            }
                            alt="eye"
                            height={46}
                            width={46}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : (
                  <Row xs={12} sm={6} md={4} lg={1} className="mb-4">
                    <Card
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      className={`${styles.recommendationCard}`}
                    >
                      <Button className={`${styles.badgeEdit}`}>Edit Ad</Button>
                      <Card.Img
                        src={item.image}
                        alt={item.title}
                        className={`${styles.cardImage}`}
                      />
                      <Card.Body>
                        <Card.Text className="mb-2 text-muted">
                          {item.location} • {item.time}
                        </Card.Text>
                        <Card.Title className="mt-3">{item.title}</Card.Title>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <Card.Title className={`${styles.textColor} mt-3`}>
                            {item.price}
                          </Card.Title>
                          <Image
                            src={
                              hoveredCardId === item.id
                                ? "/images/Link2.png"
                                : "/images/Link.png"
                            }
                            alt="eye"
                            height={46}
                            width={46}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Row>
                )}
              </React.Fragment>
            ))}
          </Row>
        </Row>
      )}
    </Container>
  );
}
