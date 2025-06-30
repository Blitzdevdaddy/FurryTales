import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import "./HomeSection.css"; // Import a CSS file for custom styling

function Home() {
  return (
    <div>
      <Header />
      <div className="video-container">
        <video src="/video/cat2.mp4" autoPlay loop muted className="w-100 h-100 position-absolute" />
        <Container fluid className="video-overlay h-100">
          <Row className="h-100">
            <Col className="d-flex flex-column justify-content-center align-items-center text-center text-white">
              <h1 className="display-2">Pet Lover's Paradise</h1>
              <p className="lead">Because every tail deserves a happy tale!</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
