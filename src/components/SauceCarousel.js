import Carousel from "react-bootstrap/Carousel";
import "./SauceCarousel.css";

function SauceCarousel() {
    return (
        <div className="CarouselFrame">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sauce1.jpg?alt=media&token=0c986436-ac2e-4857-999e-40627ee8a74e"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Collect Ingredient</h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sauce2.jpg?alt=media&token=2b3bd59b-486b-4e22-84f5-ab15458fdaa0"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Cook</h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://firebasestorage.googleapis.com/v0/b/recipe-40071.appspot.com/o/sauce3.jpg?alt=media&token=a7dea25e-2ddb-4f93-8b37-76aff357ecae"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Enjoy ~</h3>
                        <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default SauceCarousel;
