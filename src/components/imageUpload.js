import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { v4 as uuidv4 } from "uuid";
import StorageService from "../firebase/StorageService";
import "./imageUpload.css";

const ImageUpload = (props) => {
    const { imageUrl, setImageUrl, setErrorMsg, hasAccess, isPublished } = props;
    const [progress, setProgress] = useState(-1);

    const imageRef = useRef();

    useEffect(() => {
        if (!imageUrl) {
            setProgress(-1);
            imageRef.current.value = null;
        }
    }, [imageUrl]);

    const uploadHandler = async (event) => {
        const files = event.target.files;
        const file = files[0];

        if (!file) {
            setErrorMsg("File select failed, please try again!");
            return;
        }

        try {
            const generatedId = uuidv4();
            const downloadUrl = await StorageService.uploadFile(
                file,
                `userSauce/${generatedId}`,
                setProgress
            );
            setImageUrl(downloadUrl);
        } catch (error) {
            setProgress(-1);
            imageRef.current.value = null;
            console.log(error.message)
            setErrorMsg("Something wrong when uploading image, please try again!");
        }
    };

    const cancelHandler = () => {
        StorageService.deleteFile(imageUrl);
        imageRef.current.value = null;
        setImageUrl("");
        setProgress(-1);
    };

    return (
        <Card className="text-center">
            <Card.Img
                variant="top"
                src={
                    imageUrl ||
                    "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkD.svg?alt=media&token=6d49ab4f-c294-4ccf-9586-b9d3425b4384"
                }
            />
            <Card.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                        type="file"
                        onChange={uploadHandler}
                        ref={imageRef}
                        hidden={!hasAccess || progress > -1 || imageUrl}
                    />
                </Form.Group>

                {hasAccess && !imageUrl && progress > -1 && (
                    <div>
                        <label htmlFor="file">Progress:</label>
                        <ProgressBar
                            variant="warning"
                            animated
                            now={progress}
                            label={`${progress}%`}
                        />
                    </div>
                )}
                {hasAccess && imageUrl && (
                    <Button variant="secondary" onClick={cancelHandler}>
                        Cancel
                    </Button>
                )}
                {!hasAccess && (
                    <Button
                        variant={isPublished ? "warning" : "danger"}
                        // disabled="true"
                    >
                        {isPublished ? "Published" : "Unpublished"}
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default ImageUpload;
