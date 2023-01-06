import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import SauceIcon from "./SauceIcon";
import MyInfo from "./MyInfo";
import LoginForm from "./LoginForm";
import FirebaseAuthService from "../firebase/FirebaseAuthService";
import "./SauceNavbar.css";


const SauceNavbar = (props) => {
    const { user, setUser, setIsHome, setShowAddSauce, setErrorMsg, setSuccessMsg } = props;
    const [showMyInfo, setShowMyInfo] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
            <Navbar key="navbar" expand="sm" className="NavFrame">
                <Container fluid>
                    <Navbar.Text
                        className="logo"
                        href=""
                        onClick={() => {
                            setShowMyInfo(true);
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            <SauceIcon size="35px" type="fork"></SauceIcon>
                            <div className="icon">Sauce</div>
                        </div>
                    </Navbar.Text>
                    <Navbar.Toggle
                        aria-controls={"offcanvasNavbar-expand-sm"}
                    />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-sm"
                        aria-labelledby="offcanvasNavbarLabel-expand-sm"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                                Homepage
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Button
                                    className="home-bt"
                                    variant="warning"
                                    onClick={() => {
                                        setIsHome(true);
                                    }}
                                >
                                    All Sauce
                                </Button>
                                <Button
                                    className="bt"
                                    variant="warning"
                                    onClick={() => {
                                        if(user){
                                            setIsHome(false);
                                        }else{
                                            setShowLogin(true);
                                        }
                                    }}
                                >
                                    My Sauce
                                </Button>
                                <Button
                                    className="bt"
                                    variant="warning"
                                    onClick={() => {
                                        if(user){
                                            setShowAddSauce(true);
                                        }else{
                                            setShowLogin(true);
                                        }
                                    }}
                                >
                                    Add
                                </Button>
                                {!user && (
                                    <Button
                                        className="bt-login"
                                        variant="outline-success"
                                        onClick={() => {
                                            setShowLogin(true);
                                        }}
                                    >
                                        Log in
                                    </Button>
                                )}
                                {user && (
                                    <Button
                                        className="bt-login"
                                        variant="outline-success"
                                        onClick={() => {
                                            FirebaseAuthService.logoutUser();
                                            setUser(null);
                                            setIsHome(true);
                                            setSuccessMsg("Successfully logged out!")
                                        }}
                                    >
                                        Log out
                                    </Button>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <MyInfo show={showMyInfo} setShow={setShowMyInfo}></MyInfo>
            <LoginForm
                setUser={setUser}
                show={showLogin}
                setShow={setShowLogin}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
            ></LoginForm>
        </>
    );
};

export default SauceNavbar;
