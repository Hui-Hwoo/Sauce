import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import StorageService from "../firebase/StorageService";

const ImageUpload = (props) => {
    const { basePath, URL, uploadImage, cancelImage } = props;
    const [imageUrl, setImageUrl] = useState("");
    const [progress, setProgress] = useState(-1);

    const imageRef = useRef();

    useEffect(() => {
        if (URL) {
            setImageUrl(URL);
        } else {
            setProgress(-1);
            setImageUrl("");
            imageRef.current.value = null;
        }
    }, [URL]);

    const uploadHandler = async (event) => {
        const files = event.target.files;
        const file = files[0];

        if (!file) {
            alert("File select failed, please try again!");
            return;
        }

        try {
            const generatedId = uuidv4();
            const downloadUrl = await StorageService.uploadFile(
                file,
                `${basePath}/${generatedId}`,
                setProgress
            );
            setImageUrl(downloadUrl);
            uploadImage(downloadUrl);
        } catch (error) {
            setProgress(-1);
            imageRef.current.value = null;
            alert(error.message);
            throw error;
        }
    };

    const cancelHandler = () => {
        StorageService.deleteFile(imageUrl);
        imageRef.current.value = null;
        setImageUrl("");
        setProgress(-1);
        cancelImage();
    };

    return (
        <div className="image-upload-preview-container">
            <input
                type="file"
                accept="image/*"
                onChange={uploadHandler}
                ref={imageRef}
                hidden={progress > -1 || imageUrl}
            ></input>
            {!imageUrl && progress > -1 && (
                <div>
                    <label htmlFor="file">Upload Progress:</label>
                    <progress id="file" value={progress} max="100">
                        {progress}%
                    </progress>
                    <span>{progress}%</span>
                </div>
            )}
            {imageUrl && (
                <div className="image-preview">
                    {" "}
                    <img src={imageUrl} alt={imageUrl} className="image"></img>
                    <button type="submit" onClick={cancelHandler} className="primary-button">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
