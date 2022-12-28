import React, { useState } from "react";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import "./form.css";

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginUser(
                email,
                password
            );
            props.setUser(response.user);
            console.log("successfully logged up");
            console.log(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithGoogleHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithGoogle();
            props.setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithFacebookHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithFacebook();
            props.setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    const loginWithGitHubHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.loginWithGitHub();
            props.setUser(response.user);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form style={{ align: "center" }} onSubmit={submitHandler}>
            <input
                type="email"
                required
                placeholder="email"
                onInput={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                required
                placeholder="password"
                onInput={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">login</button>
            <br />
            <button type="button" onClick={loginWithGoogleHandler}>
                login with Google
            </button>
        </form>
    );
};

export default LoginForm;
