// import Badge from 'react-bootstrap/Badge';
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect } from "react";
import "./SauceItem.css";

const SauceItem = (props) => {
    const { sauce, editItem } = props;

    var sums = 1;
    useEffect(() => {
        if (sauce?.taste) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            sums = 0;
            for (const key in sauce.taste) {
                sums += sauce.taste[key];
            }
        }
    }, []);

    // const defaultUrl =
    //     "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/totoro.gif?alt=media&token=c8448550-2f03-4fd4-8559-c7cdff3fe05a";
    const defaultUrl2 =
        "https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sauce3.jpg?alt=media&token=a7dea25e-2ddb-4f93-8b37-76aff357ecae";

    return (
        <Card
            className="sauceItem"
            onClick={() => {
                editItem();
            }}
        >
            <Card.Img variant="top" src={sauce?.imageUrl || defaultUrl2} />
            <Card.Body>
                <ProgressBar className="card-progress">
                    <ProgressBar
                        label="salty"
                        animated
                        style={{ color: "#000000" }}
                        now={
                            (sauce?.taste &&
                                (sauce.taste?.salty / sums) * 100) ||
                            25
                        }
                        key={1}
                    />
                    <ProgressBar
                        label="hot"
                        animated
                        style={{ color: "#000000" }}
                        variant="danger"
                        now={
                            (sauce?.taste &&
                                (sauce.taste?.salty / sums) * 100) ||
                            25
                        }
                        key={2}
                    />
                    <ProgressBar
                        label="sweet"
                        animated
                        style={{ color: "#000000" }}
                        variant="warning"
                        now={
                            (sauce?.taste &&
                                (sauce.taste?.salty / sums) * 100) ||
                            25
                        }
                        key={3}
                    />
                    <ProgressBar
                        label="sour"
                        animated
                        style={{
                            backgroundColor: "#8bc34a",
                            color: "#000000",
                        }}
                        now={
                            (sauce?.taste &&
                                (sauce.taste?.salty / sums) * 100) ||
                            25
                        }
                        key={4}
                    />
                </ProgressBar>

                <Card.Title className="cardTitle">
                    {sauce?.isPublished && (
                        <p>{sauce?.title || "Sauce Title"}</p>
                    )}
                    {!sauce?.isPublished && (
                        <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip className="overlay">
                                    Will be published on 
                                    <strong>{sauce?.publishDate}</strong>
                                </Tooltip>
                            }
                        >
                            <p
                                className={
                                    sauce?.title
                                        ? "published"
                                        : "unpublished"
                                }
                            >
                                {sauce?.title || "Unpublished"}
                            </p>
                        </OverlayTrigger>
                    )}
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default SauceItem;
