import "./SauceIcon.css";

const SauceIcon = (props) => {
    const { type, size, className, ...rest } = props;

    let iconUrl;
    switch (type) {
        case "fork":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkL.svg?alt=media&token=98309be4-14de-4a14-8059-6c10d3115312";
            break;
        case "logoL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/logoL.svg?alt=media&token=b8f85113-b9be-4c5a-8db3-0b16ad073c66";
            break;
        case "logoD":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/logoD.svg?alt=media&token=cac87a54-66f8-4199-b16c-494a4546dd96";
            break;
        case "hotL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/hotD.svg?alt=media&token=c0a50a4a-7a10-4d52-8168-b9be1a1b7a8c";
            break;
        case "hot":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/hotL.svg?alt=media&token=08604f8a-6dd3-4a9d-9cfd-68d757ebdf28";
            break;
        case "saltyL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/saltD.svg?alt=media&token=3307a192-3fd9-40dc-b6d8-121012bf19e8";
            break;
        case "salty":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/saltL.svg?alt=media&token=72d0b0e1-d3f2-4d33-8e88-7839a9288d94";
            break;
        case "sweetL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sweetD.svg?alt=media&token=5927d41c-fa45-4ed0-80e6-306367e696f7";
            break;
        case "sweet":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sweetL.svg?alt=media&token=40fbfd9a-8559-4f80-a140-0589311ef094";
            break;
        case "sourL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sourD.svg?alt=media&token=a35e1648-f68b-496b-9657-d0ac64512d7a";
            break;
        case "sour":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sourL.svg?alt=media&token=60793384-dec2-4864-9298-069f704bbb5a";
            break;
        case "liquid":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/liquid.svg?alt=media&token=6b0744f3-4d44-48ba-94ed-013fe85fd9da";
            break;
        case "liquidL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/liquidL.svg?alt=media&token=1d11b81b-ed32-4b70-b440-a693e64dfc09";
            break;
        case "solid":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/solid.svg?alt=media&token=edc03acd-10b4-4481-bfe8-eb20a0898c27";
            break;
        case "solidL":
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/solidL.svg?alt=media&token=5664801f-026e-4398-a603-f0170a5d4f1e";
            break;
        default:
            iconUrl =
                "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/forkL.svg?alt=media&token=98309be4-14de-4a14-8059-6c10d3115312";
            break;
    }
    return (
        <img
            src={iconUrl}
            alt="icon-template"
            className={className ? className : "normal"}
            style={{
                ...rest,
                width: size ? size : "25px",
                height: size ? size : "25px",
            }}
        />
    );
};

export default SauceIcon;
