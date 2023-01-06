import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SauceIcon from "./SauceIcon";
import React from "react";
import "./SauceFilter.css";

const Filter = (props) => {
    const { taste, setTaste, state, setState, isHome } = props;

    const checkTaste = (item) => {
        if (item === "all") {
            if (taste["all"]) {
                setTaste({
                    all: false,
                    salty: false,
                    hot: false,
                    sweet: false,
                    sour: false,
                });
            } else {
                setTaste({
                    all: true,
                    salty: true,
                    hot: true,
                    sweet: true,
                    sour: true,
                });
            }
        } else {
            if (taste["all"]) {
                setTaste({
                    ...taste,
                    all: false,
                    [item]: false,
                });
            } else {
                var flag = true;
                for (const element in taste) {
                    if (element !== "all" && element !== item) {
                        flag = flag && taste[element];
                    }
                }

                if (flag) {
                    setTaste({
                        all: true,
                        salty: true,
                        hot: true,
                        sweet: true,
                        sour: true,
                    });
                } else {
                    setTaste({
                        ...taste,
                        [item]: !taste[item],
                    });
                }
            }
        }
    };

    const checkState = (item) => {
        if (item === "all") {
            if (state["all"]) {
                setState({
                    all: false,
                    liquid: false,
                    solid: false,
                });
            } else {
                setState({
                    all: true,
                    liquid: true,
                    solid: true,
                });
            }
        } else {
            if (state["all"]) {
                setState({
                    ...state,
                    all: false,
                    [item]: false,
                });
            } else {
                var flag = true;
                for (const element in state) {
                    if (element !== "all" && element !== item) {
                        flag = flag && state[element];
                    }
                }

                if (flag) {
                    setState({
                        all: true,
                        liquid: true,
                        solid: true,
                    });
                } else {
                    setState({
                        ...state,
                        [item]: !state[item],
                    });
                }
            }
        }
    };

    const tasteList = ["salty", "hot", "sweet", "sour"];
    const stateList = ["solid", "liquid"];

    return (
        <Container className={!isHome ? "personalMode" : "homeMode"}>
            <Row>
                <Col>
                    <Form.Group
                        as={Row}
                        className="mb-3 selector"
                        controlId="Title"
                    >
                        <Form.Label column md={1} className="category">
                            Taste
                        </Form.Label>
                        <Col md={11}>
                            <InputGroup>
                                <Container>
                                    <Row>
                                        <Col
                                            lg={3}
                                            sm={12}
                                            xs={12}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    taste["all"]
                                                        ? "TAll-checked"
                                                        : "TAll"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="ALL"
                                                    checked={taste["all"]}
                                                    onChange={() => {
                                                        checkTaste("all");
                                                    }}
                                                    style={{
                                                        marginRight: "19px",
                                                    }}
                                                />
                                                {tasteList.map(
                                                    (item, index) => {
                                                        if (taste[item]) {
                                                            return (
                                                                <SauceIcon
                                                                    type={item}
                                                                    key={index}
                                                                ></SauceIcon>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )}
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={2}
                                            sm={6}
                                            xs={3}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    taste["salty"]
                                                        ? "salty-checked"
                                                        : "salty"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label={"Salty"}
                                                    checked={taste["salty"]}
                                                    onChange={() => {
                                                        checkTaste("salty");
                                                    }}
                                                    style={{
                                                        marginRight: "9px",
                                                    }}
                                                />
                                                <SauceIcon
                                                    className="tasteIcon"
                                                    type={
                                                        taste["salty"]
                                                            ? "salty"
                                                            : "saltyL"
                                                    }
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={3}
                                            sm={6}
                                            xs={3}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    taste["hot"]
                                                        ? "hot-checked"
                                                        : "hot"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Hot"
                                                    style={{
                                                        marginRight: "20px",
                                                    }}
                                                    checked={taste["hot"]}
                                                    onChange={() => {
                                                        checkTaste("hot");
                                                    }}
                                                />
                                                <SauceIcon
                                                    type={
                                                        taste["hot"]
                                                            ? "hot"
                                                            : "hotL"
                                                    }
                                                    className="tasteIcon"
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={2}
                                            sm={6}
                                            xs={3}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    taste["sweet"]
                                                        ? "sweet-checked"
                                                        : "sweet"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Sweet"
                                                    checked={taste["sweet"]}
                                                    onChange={() => {
                                                        checkTaste("sweet");
                                                    }}
                                                    style={{
                                                        marginRight: "3px",
                                                    }}
                                                />
                                                <SauceIcon
                                                    className="tasteIcon"
                                                    type={
                                                        taste["sweet"]
                                                            ? "sweet"
                                                            : "sweetL"
                                                    }
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={2}
                                            sm={6}
                                            xs={3}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    taste["sour"]
                                                        ? "sour-checked"
                                                        : "sour"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Sour"
                                                    checked={taste["sour"]}
                                                    onChange={() => {
                                                        checkTaste("sour");
                                                    }}
                                                    style={{
                                                        marginRight: "11px",
                                                    }}
                                                />
                                                <SauceIcon
                                                    className="tasteIcon"
                                                    type={
                                                        taste["sour"]
                                                            ? "sour"
                                                            : "sourL"
                                                    }
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                    </Row>
                                </Container>
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group
                        as={Row}
                        className="mb-3 selector"
                        controlId="Title"
                    >
                        <Form.Label column md={1} className="category">
                            State
                        </Form.Label>
                        <Col md={11}>
                            <InputGroup>
                                <Container>
                                    <Row>
                                        <Col
                                            lg={3}
                                            sm={12}
                                            xs={12}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    state["all"]
                                                        ? "SAll-checked"
                                                        : "SAll"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="ALL"
                                                    style={{
                                                        marginRight: "19px",
                                                    }}
                                                    checked={state["all"]}
                                                    onChange={() => {
                                                        checkState("all");
                                                    }}
                                                />
                                                {stateList.map(
                                                    (item, index) => {
                                                        if (state[item]) {
                                                            return (
                                                                <SauceIcon
                                                                    type={item}
                                                                    key={index}
                                                                ></SauceIcon>
                                                            );
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                )}
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={3}
                                            sm={6}
                                            xs={6}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    state["solid"]
                                                        ? "solid-checked"
                                                        : "solid"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Solid"
                                                    style={{
                                                        marginRight: "11px",
                                                    }}
                                                    checked={state["solid"]}
                                                    onChange={() => {
                                                        checkState("solid");
                                                    }}
                                                />
                                                <SauceIcon
                                                    type={
                                                        state["solid"]
                                                            ? "solid"
                                                            : "solidL"
                                                    }
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                        <Col
                                            lg={2}
                                            sm={6}
                                            xs={6}
                                            className="selector"
                                        >
                                            <InputGroup.Text
                                                className={
                                                    state["liquid"]
                                                        ? "liquid-checked"
                                                        : "liquid"
                                                }
                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    label="Liquid"
                                                    style={{
                                                        marginRight: "2px",
                                                    }}
                                                    checked={state["liquid"]}
                                                    onChange={() => {
                                                        checkState("liquid");
                                                    }}
                                                />
                                                <SauceIcon
                                                    type={
                                                        state["liquid"]
                                                            ? "liquid"
                                                            : "liquidL"
                                                    }
                                                ></SauceIcon>
                                            </InputGroup.Text>
                                        </Col>
                                    </Row>
                                </Container>
                            </InputGroup>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
        </Container>
    );
};

export default Filter;
