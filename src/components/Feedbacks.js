import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./Feedbacks.css"

const Feedbacks = (props) => {
    const { show, setShow, errorMsg, successMsg } = props;

    return (
        <ToastContainer className="p-3" position="top-end">
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={5000}
                autohide
                animation={true}
                bg={errorMsg?"warning":"light"}
            >
                <Toast.Header>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkD.svg?alt=media&token=6d49ab4f-c294-4ccf-9586-b9d3425b4384"
                        alt="errorIcon"
                        style={{
                            display: "inline-block",
                            width: "25px",
                            height: "25px",
                            marginRight: "3px",
                        }}
                    />
                    <strong className="me-auto">{errorMsg?"Error":"Success"}</strong>
                    <small>1 mins ago</small>
                </Toast.Header>
                <Toast.Body>{errorMsg?errorMsg:successMsg}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Feedbacks;
