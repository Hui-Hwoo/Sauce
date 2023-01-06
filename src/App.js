import React, { useState, useEffect } from "react";
import FirebaseAuthService from "./firebase/FirebaseAuthService";
import RestService from "./firebase/RestService";
import Filter from "./components/SauceFilter";

import "bootstrap/dist/css/bootstrap.min.css";
import SauceItem from "./components/SauceItem";
import SauceNavbar from "./components/SauceNavbar";
import SauceCarousel from "./components/SauceCarousel";
import SauceForm from "./components/SauceForm";
import Feedbacks from "./components/Feedbacks";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
    // For basic Info
    const [user, setUser] = useState(null);
    const [sauce, setSauce] = useState([]);
    const [isHome, setIsHome] = useState(true);

    useEffect(() => {
        FirebaseAuthService.subscribeToAuthChanges(setUser);
    }, []);

    // For filter
    const [taste, setTaste] = useState({
        all: true,
        salty: true,
        hot: true,
        sweet: true,
        sour: true,
    });
    const [state, setState] = useState({
        all: true,
        liquid: true,
        solid: true,
    });

    useEffect(() => {
        fetchSauce();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, state, taste]);

    // For One Sauce Info
    const [currentSauce, setCurrentSauce] = useState(null);
    const [showCard, setShowCard] = useState(false);

    // For feedback message
    const [showMsg, setShowMsg] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        if (errorMsg || successMsg) {
            setShowMsg(true);
        }
    }, [errorMsg, successMsg]);

    useEffect(() => {
        if (!showMsg) {
            setErrorMsg("");
            setSuccessMsg("");
        }
    }, [showMsg]);

    // For updating after each change
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        if (updateList) {
            fetchSauce()
            setUpdateList(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateList]);

    const fetchSauce = async () => {
        try {
            const response = await RestService.readDocuments("sauce", {
                state: getStateStr(state),
                taste: getTasteStr(state),
                uid: isHome?"":user.uid,
            }, !!user);
            let fetchedData = [];
            if (response && response.documents) {
                fetchedData = response.documents;
                fetchedData.forEach((item) => {
                    const unixPublishDateTime = item.publishDate;
                    item.publishDate = new Date(unixPublishDateTime * 1000);
                });
            }
            setSauce(fetchedData);
        } catch (error) {
            console.log(error.message);
            setErrorMsg("Something wrong when fetching sauce!")
        }
    };

    // Helper toString-function
    const getStateStr = (state) => {
        if (state["all"]) {
            return "";
        } else {
            return state["liquid"] ? "0" : "1";
        }
    };

    const getTasteStr = (taste) => {
        var tasteStr = "";
        if (!taste["all"]) {
            const tasteList = ["salty", "hot", "sweet", "sour"];
            tasteList.forEach((value, index) => {
                if (taste[value]) {
                    tasteStr += index.toString();
                }
            });
        }
        return tasteStr;
    };

    return (
        <React.Fragment>
            <SauceNavbar
                user={user}
                setUser={setUser}
                setIsHome={setIsHome}
                setShowAddSauce={setShowCard}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
            ></SauceNavbar>
            <Feedbacks
                show={showMsg}
                setShow={setShowMsg}
                errorMsg={errorMsg}
                successMsg={successMsg}
            ></Feedbacks>
            {isHome && <SauceCarousel></SauceCarousel>}
            <SauceForm
                user={user}
                show={showCard}
                setShow={setShowCard}
                currentSauce={currentSauce}
                setCurrentSauce={setCurrentSauce}
                setErrorMsg={setErrorMsg}
                setSuccessMsg={setSuccessMsg}
                setUpdateList={setUpdateList}
                hasAccess={
                    user && (!currentSauce || user.uid === currentSauce.creator)
                }
            ></SauceForm>
            <Filter
                taste={taste}
                setTaste={setTaste}
                state={state}
                setState={setState}
                isHome={isHome}
            ></Filter>
            <Container>
                <Row>
                    {sauce.map((item, index) => {
                        return (
                            <Col xl={3} lg={4} md={6} key={index}>
                                <SauceItem
                                    sauce={item}
                                    editItem={() => {
                                        setCurrentSauce(item);
                                        setShowCard(true);
                                    }}
                                ></SauceItem>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default App;
