import { useState } from "react";
import { items } from "./items.json";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Bootstrap.module.css";

export default function BootstrapCarousel() {
    const { bootstrap } = items;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
                    <img src={item.imageUrl} alt="slides" />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
