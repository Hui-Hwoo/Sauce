import React, { useState } from "react";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./LoginForm.css";

const LoginForm = (props) => {
    const { setUser, show, setShow } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMode, setLoginMode] = useState(true);

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginUser(
                email,
                password
            );
            setUser(response.user);
            setShow(false);
            console.log("successfully logged up");
            console.log(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const signupHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.registerUser(
                email,
                password
            );
            setUser(response.user);
            console.log("successful sign up");
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithGoogleHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithGoogle();
            setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithFacebookHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithFacebook();
            setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithGitHubHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithGitHub();
            setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Modal
            backdrop="static"
            show={show}
            fullscreen="md-down"
            centered
            onHide={() => {
                setShow(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkD.svg?alt=media&token=6d49ab4f-c294-4ccf-9586-b9d3425b4384"
                        alt="loginIcon"
                        className="loginIcon"
                    ></img>
                    {loginMode ? "Login" : "Signin"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>
            </Modal.Body>
            <Modal.Dialog id="otherLoginWay">
                {loginMode ? "No account? " : "Already have an account? "}
                {loginMode && (
                    <button
                        className="switch-btn"
                        onClick={() => {
                            setLoginMode(false);
                        }}
                    >
                        Create one
                    </button>
                )}
                {!loginMode && (
                    <button
                        className="switch-btn"
                        onClick={() => {
                            setLoginMode(true);
                        }}
                    >
                        Sign in
                    </button>
                )}
                <br />
                <br></br>
                Login with{" "}
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/google.png?alt=media&token=70385ad6-b06b-4c3e-8bd7-2fc645d94499"
                    alt="google"
                ></img>
                <button className="Log-google" onClick={loginWithGoogleHandler}>
                    Google
                </button>
                <div className="seperator1" />
                <img
                    className="github"
                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/Github.png?alt=media&token=0d4dac3e-81da-4724-8fbf-9aa2c38f0da6"
                    alt="github"
                ></img>
                <button className="Log-github" onClick={loginWithGitHubHandler}>
                    GitHub
                </button>
                <div className="seperator2" />
                <img
                    className="facebook"
                    src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/facebook.png?alt=media&token=86841fdf-7d8c-421b-ac39-dada02dad35b"
                    alt="facebook"
                ></img>
                <button
                    className="Log-facebook"
                    onClick={loginWithFacebookHandler}
                >
                    Facebook
                </button>
            </Modal.Dialog>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Close
                </Button>
                {loginMode && <Button onClick={loginHandler}>Login</Button>}
                {!loginMode && <Button onClick={signupHandler}>Sign in</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default LoginForm;
