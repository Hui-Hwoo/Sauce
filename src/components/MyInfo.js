import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container, Row, Col } from "react-bootstrap";
import "./MyInfo.css";

const MyInfo = (props) => {
    const { show, setShow } = props;

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
            }}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>About Creator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <img
                                    className="myAvatar"
                                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/MyAvatar.png?alt=media&token=35f4b028-7d4e-44c2-bfb9-2ee3ece86674"
                                    alt="My Avatar"
                                ></img>
                            </div>
                        </Col>
                        <Col lg={8} className="content">
                            <div>
                                <div
                                    style={{
                                        fontFamily: "Permanent Marker, cursive",
                                        fontSize: "25px",
                                    }}
                                >
                                    Hi !
                                </div>
                                I'm{" "}
                                <label style={{ fontWeight: "bold" }}>
                                    Hui Hu
                                </label>
                                , the creator of Sauce.
                            </div>
                            <p>
                                Impressed by my roommate's huge collection of
                                sauce, I develop Sauce in my (little) spare
                                time.
                            </p>
                            <p>
                                If you like the project, please consider{" "}
                                <a
                                    href="https://account.venmo.com/u/Hui-Hu-61"
                                    className="donationLink"
                                >
                                    making a small donation
                                </a>
                                , it really helps :)
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="content">
                            <div>
                                If you’d like to get in touch, feel free to
                                write me at:{" "}
                                <label style={{ color: "#2868b2" }}>
                                    hui.hwoo@gmail.com
                                </label>
                                . You can also find me on various socials, feel
                                free to get it touch there too!
                                <br />
                                <Container className="contact">
                                    <Row>
                                        <Col md={6} sm={6} lg={3}>
                                            <div className="social-media">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/Github.png?alt=media&token=0d4dac3e-81da-4724-8fbf-9aa2c38f0da6"
                                                    alt="github"
                                                ></img>
                                                <a href="https://github.com/Hui-Hwoo">
                                                    Github
                                                </a>
                                            </div>
                                        </Col>
                                        <Col md={6} sm={6} lg={3}>
                                            <div className="social-media">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/Linkedin2.png?alt=media&token=dfaa2d53-fa05-42e7-96fc-a40cf5e2c015"
                                                    alt="linkedin"
                                                ></img>
                                                <a
                                                    id="linkedin"
                                                    href="https://www.linkedin.com/in/hui-hwoo/"
                                                >
                                                    LinkedIn
                                                </a>
                                            </div>
                                        </Col>
                                        <Col md={6} sm={6} lg={3}>
                                            <div className="social-media">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/Instagram.png?alt=media&token=564844c1-cf9c-4cbe-be8c-bb22fc5dcb3b"
                                                    alt="instagram"
                                                ></img>
                                                <a href="https://www.instagram.com/hui_hwoo/">
                                                    Instagram
                                                </a>
                                            </div>
                                        </Col>
                                        <Col md={6} sm={6} lg={3}>
                                            <div className="social-media">
                                                <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/Twitter.png?alt=media&token=8958f550-df5a-446b-a295-602c43b3fb1c"
                                                    alt="twitter"
                                                ></img>
                                                <a href="https://twitter.com/HuiHwoo">
                                                    Twitter
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MyInfo;
