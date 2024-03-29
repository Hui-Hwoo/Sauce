import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SauceIcon from "./SauceIcon";
import ProgressBar from "react-bootstrap/ProgressBar";
import Modal from "react-bootstrap/Modal";
import ImageUpload from "./imageUpload";
import { useEffect, useState } from "react";
import RestService from "../firebase/RestService";
import "./SauceForm.css";

const SauceForm = (props) => {
    const {
        user,
        show,
        setShow,
        currentSauce,
        setCurrentSauce,
        setErrorMsg,
        setSuccessMsg,
        setUpdateList,
        hasAccess,
    } = props;

    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState("");
    const [taste, setTaste] = useState({
        salty: 0,
        hot: 0,
        sweet: 0,
        sour: 0,
    });
    const [sums, setSums] = useState(0);
    const [publishDate, setPublishDate] = useState(
        "" // new Date().toISOString().split("T")[0]
    );

    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (currentSauce) {
            setImageUrl(currentSauce.imageUrl);
            setTitle(currentSauce.title);
            setDescription(currentSauce.description);
            setState(currentSauce.state);
            setTaste({
                salty: currentSauce.salty,
                hot: currentSauce.hot,
                sweet: currentSauce.sweet,
                sour: currentSauce.sour,
            });
            setPublishDate(formatDate(currentSauce.publishDate));
        } else {
            emptyForm();
        }
    }, [currentSauce]);

    const emptyForm = () => {
        setImageUrl("");
        setTitle("");
        setDescription("");
        setState("");
        setTaste({
            salty: 0,
            hot: 0,
            sweet: 0,
            sour: 0,
        });
        setPublishDate("");
    };

    useEffect(() => {
        var temp = 0;
        for (const key in taste) {
            temp = temp + taste[key];
        }
        setSums(temp.valueOf());
    }, [taste]);

    const formatDate = (date) => {
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        const dateString = `${year}-${month}-${day}`;
        return dateString;
    };

    const addSauce = async (newSauce) => {
        try {
            // const response = await FirestoreService.createDocument(
            //     "recipes",
            //     newRecipe
            // );
            await RestService.createDocument("sauce", newSauce);
            setShow(false);
            emptyForm();
            setUpdateList(true);
            setSuccessMsg("successfully create a new sauce!");
        } catch (error) {
            console.log(error.message);
            setErrorMsg("Something wrong, please try again!");
        }
    };

    const updateSauce = async (newSauce, sauceId) => {
        try {
            // await FirestoreService.updateDocument(
            //     "recipes",
            //     recipeId,
            //     newRecipe
            // );
            await RestService.updateDocument("sauce", sauceId, newSauce);
            setShow(false);
            setCurrentSauce(null);
            setUpdateList(true);
            setSuccessMsg("successfully updated sauce");
        } catch (error) {
            console.log(error.message);
            setErrorMsg("Something wrong, please try again!");
        }
    };

    const cancelEdit = () => {
        setShow(false);
        setCurrentSauce(null);
    };

    const deleteSauce = async (sauceId) => {
        try {
            // await FirestoreService.deleteDocument("recipes", recipeId);
            await RestService.deleteDocument("sauce", sauceId);
            window.scrollTo(0, 0);
            setShow(false);
            setCurrentSauce(null);
            setUpdateList(true);
            setSuccessMsg("Successfully deleted the sauce");
        } catch (error) {
            console.log(error.message);
            setErrorMsg("Something wrong, please try again!");
        }
    };

    const submitSauceFormHandler = (event) => {
        event.preventDefault();

        if (!imageUrl) {
            setErrorMsg("Missing sauce image!");
            return;
        }

        const isPublished = new Date(publishDate) <= new Date() ? true : false;
        const newSauce = {
            title,
            description,
            state,
            salty: taste["salty"],
            hot: taste["hot"],
            sweet: taste["sweet"],
            sour: taste["sour"],
            publishDate: new Date(publishDate).getTime() / 1000,
            isPublished,
            imageUrl,
        };

        if (currentSauce) {
            updateSauce(newSauce, currentSauce.id);
        } else {
            addSauce(newSauce);
        }
    };

    return (
        <>
            <Modal
                id="sauceform"
                size="lg"
                centered
                backdrop="static"
                show={show}
                fullscreen="md-down"
                onHide={cancelEdit}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkD.svg?alt=media&token=6d49ab4f-c294-4ccf-9586-b9d3425b4384"
                            alt="loginIcon"
                            className="loginIcon"
                        ></img>
                        {!user || !currentSauce ? "Add" : "Edit"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col
                                xs={{ span: 10, offset: 1 }}
                                sm={{ span: 8, offset: 2 }}
                                lg={{ span: 5, offset: 0 }}
                                id="imagecard"
                            >
                                <ImageUpload
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    hasAccess={hasAccess}
                                    isPublished={currentSauce?.isPublished}
                                    setErrorMsg={setErrorMsg}
                                ></ImageUpload>
                            </Col>
                            <Col sm={12} xs={12} lg={7}>
                                <Form>
                                    {/* Title Part */}
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="Title"
                                    >
                                        <Form.Label column sm={2}>
                                            Title
                                        </Form.Label>
                                        <Col sm={10}>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Sauce name"
                                                    value={title?title:"Secret Sauce"}
                                                    aria-label="Title"
                                                    aria-describedby="title-content"
                                                    onChange={(e) => {
                                                        setTitle(
                                                            e.target.value
                                                        );
                                                    }}
                                                    disabled={
                                                        hasAccess ? false : true
                                                    }
                                                />
                                                <InputGroup.Text
                                                    id="basic-addon2"
                                                    className={
                                                        title
                                                            ? "inputMarked"
                                                            : "inputMark"
                                                    }
                                                >
                                                    <SauceIcon></SauceIcon>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    {/* Description Part */}
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalEmail"
                                    >
                                        <Form.Label column sm={2}>
                                            Desc
                                        </Form.Label>
                                        <Col sm={10}>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Description of the sauce"
                                                    as="textarea"
                                                    aria-label="With textarea"
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(
                                                            e.target.value
                                                        );
                                                    }}
                                                    disabled={
                                                        hasAccess ? false : true
                                                    }
                                                />
                                                <InputGroup.Text
                                                    id="basic-addon2"
                                                    className={
                                                        description
                                                            ? "inputMarked"
                                                            : "inputMark"
                                                    }
                                                >
                                                    <SauceIcon></SauceIcon>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    {/* State Part */}
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalEmail"
                                    >
                                        <Form.Label column sm={2}>
                                            State
                                        </Form.Label>
                                        <Col sm={10}>
                                            <InputGroup className="mb-3">
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    value={state}
                                                    onChange={(e) => {
                                                        setState(
                                                            e.target.value
                                                        );
                                                    }}
                                                    disabled={
                                                        hasAccess ? false : true
                                                    }
                                                >
                                                    <option value="">
                                                        Select the state
                                                    </option>
                                                    <option value="liquid">
                                                        Liquid
                                                    </option>
                                                    <option value="solid">
                                                        Solid
                                                    </option>
                                                </Form.Select>
                                                <InputGroup.Text
                                                    id="basic-addon2"
                                                    className={
                                                        state
                                                            ? "inputMarked"
                                                            : "inputMark"
                                                    }
                                                >
                                                    <SauceIcon></SauceIcon>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    {/* Taste Part */}
                                    <fieldset>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label
                                                as="legend"
                                                column
                                                sm={2}
                                            >
                                                Taste
                                            </Form.Label>
                                            <Col sm={10}>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text
                                                        style={{
                                                            width: "1%",
                                                            flex: "1 1 auto",
                                                            backgroundColor:
                                                                "#fff",
                                                            display:
                                                                "inline-table",
                                                        }}
                                                    >
                                                        <div>
                                                            <label
                                                                htmlFor="salty"
                                                                style={{
                                                                    marginRight:
                                                                        "5px",
                                                                }}
                                                            >
                                                                Salty:
                                                            </label>
                                                            <input
                                                                id="salty"
                                                                type="range"
                                                                style={{
                                                                    width: "82%",
                                                                }}
                                                                value={
                                                                    taste[
                                                                        "salty"
                                                                    ]
                                                                }
                                                                max="100"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTaste({
                                                                        ...taste,
                                                                        salty: +e
                                                                            .target
                                                                            .value,
                                                                    });
                                                                }}
                                                                disabled={
                                                                    hasAccess
                                                                        ? false
                                                                        : true
                                                                }
                                                            ></input>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="hot"
                                                                style={{
                                                                    marginRight:
                                                                        "16px",
                                                                }}
                                                            >
                                                                Hot:
                                                            </label>
                                                            <input
                                                                id="hot"
                                                                type="range"
                                                                style={{
                                                                    width: "82%",
                                                                }}
                                                                value={
                                                                    taste["hot"]
                                                                }
                                                                max="100"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTaste({
                                                                        ...taste,
                                                                        hot: +e
                                                                            .target
                                                                            .value,
                                                                    });
                                                                }}
                                                                disabled={
                                                                    hasAccess
                                                                        ? false
                                                                        : true
                                                                }
                                                            ></input>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="sweet"
                                                                style={{
                                                                    marginRight:
                                                                        "3px",
                                                                }}
                                                            >
                                                                Sweet:
                                                            </label>
                                                            <input
                                                                id="sweet"
                                                                type="range"
                                                                style={{
                                                                    width: "80%",
                                                                }}
                                                                value={
                                                                    taste[
                                                                        "sweet"
                                                                    ] || 0
                                                                }
                                                                max="100"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTaste({
                                                                        ...taste,
                                                                        sweet: +e
                                                                            .target
                                                                            .value,
                                                                    });
                                                                }}
                                                                disabled={
                                                                    hasAccess
                                                                        ? false
                                                                        : true
                                                                }
                                                            ></input>
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="sour"
                                                                style={{
                                                                    marginRight:
                                                                        "8px",
                                                                }}
                                                            >
                                                                Sour:
                                                            </label>
                                                            <input
                                                                id="sour"
                                                                type="range"
                                                                style={{
                                                                    width: "82%",
                                                                }}
                                                                value={
                                                                    taste[
                                                                        "sour"
                                                                    ] || 0
                                                                }
                                                                max="100"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setTaste({
                                                                        ...taste,
                                                                        sour: +e
                                                                            .target
                                                                            .value,
                                                                    });
                                                                }}
                                                                disabled={
                                                                    hasAccess
                                                                        ? false
                                                                        : true
                                                                }
                                                            ></input>
                                                        </div>
                                                        <ProgressBar className="edit-progress">
                                                            <ProgressBar
                                                                label="salty"
                                                                animated
                                                                style={{
                                                                    color: "#000000",
                                                                }}
                                                                // style={{"backgroundColor":"#2196f3", "color": "#f44336"}} // #4caf50
                                                                now={
                                                                    sums > 0
                                                                        ? (taste[
                                                                              "salty"
                                                                          ] /
                                                                              sums) *
                                                                          100
                                                                        : 0
                                                                }
                                                                key={1}
                                                            />
                                                            <ProgressBar
                                                                label="hot"
                                                                animated
                                                                variant="danger"
                                                                style={{
                                                                    color: "#000000",
                                                                }}
                                                                now={
                                                                    sums > 0
                                                                        ? (taste[
                                                                              "hot"
                                                                          ] /
                                                                              sums) *
                                                                          100
                                                                        : 0
                                                                }
                                                                key={2}
                                                            />
                                                            <ProgressBar
                                                                label="sweet"
                                                                striped
                                                                style={{
                                                                    color: "#000000",
                                                                }}
                                                                variant="warning"
                                                                now={
                                                                    sums > 0
                                                                        ? (taste[
                                                                              "sweet"
                                                                          ] /
                                                                              sums) *
                                                                          100
                                                                        : 0
                                                                }
                                                                key={3}
                                                            />
                                                            <ProgressBar
                                                                label="sour"
                                                                striped
                                                                style={{
                                                                    backgroundColor:
                                                                        "#8bc34a",
                                                                    color: "#000000",
                                                                }}
                                                                now={
                                                                    sums > 0
                                                                        ? (taste[
                                                                              "sour"
                                                                          ] /
                                                                              sums) *
                                                                          100
                                                                        : 0
                                                                }
                                                                key={4}
                                                            />
                                                        </ProgressBar>
                                                    </InputGroup.Text>
                                                    <InputGroup.Text
                                                        id="basic-addon2"
                                                        className={
                                                            sums > 0
                                                                ? "inputMarked"
                                                                : "inputMark"
                                                        }
                                                        style={{
                                                            textAlign: "center",
                                                            top: "50%",
                                                        }}
                                                    >
                                                        <SauceIcon></SauceIcon>
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </fieldset>

                                    {/* Publish Date Part */}
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formHorizontalEmail"
                                    >
                                        <Form.Label column sm={2}>
                                            Publish Date
                                        </Form.Label>
                                        <Col sm={10}>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    as="input"
                                                    type="date"
                                                    aria-label="With textarea"
                                                    value={publishDate}
                                                    min={
                                                        new Date()
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                    onChange={(e) =>
                                                        setPublishDate(
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        hasAccess ? false : true
                                                    }
                                                />
                                                <InputGroup.Text
                                                    id="basic-addon2"
                                                    className={
                                                        publishDate
                                                            ? "inputMarked"
                                                            : "inputMark"
                                                    }
                                                >
                                                    <SauceIcon></SauceIcon>
                                                </InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>

                                    {/* Button Part
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" style={{ margin: "0px 20%" }}>
                                Edit
                            </Button>
                            <Button type="submit">Delete</Button>
                        </Col>
                    </Form.Group> */}
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            cancelEdit();
                        }}
                    >
                        Close
                    </Button>
                    {hasAccess && user && (
                        <Button onClick={submitSauceFormHandler}>
                            {currentSauce ? "Update" : "Add"}
                        </Button>
                    )}
                    {hasAccess && user && currentSauce && (
                        <Button
                            variant="danger"
                            onClick={() => {
                                setShow(false);
                                setConfirm(true);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
            <Modal
                centered
                backdrop="static"
                show={confirm}
                onHide={() => {
                    setConfirm(false);
                    setShow(true);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="dangerTitle">Dangerous</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this sauce?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setConfirm(false);
                            setShow(true);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => {
                            setConfirm(false);
                            deleteSauce(currentSauce.id);
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SauceForm;
