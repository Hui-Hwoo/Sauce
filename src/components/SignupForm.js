import { useState } from "react";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import "./form.css";

const SignupForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await FirebaseAuthService.registerUser(
                email,
                password
            );
            props.setUser(response.user);
            console.log("successful sign up")
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
            <input
                type="password"
                required
                placeholder="password"
                onInput={(e) => setPassword(e.target.value)}
            />
            <button type="submit"> sign up </button>
        </form>
    );
};

export default SignupForm;
