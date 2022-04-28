import React from 'react'
import Carosal from '../Components/Carosal'
import Header from "../Components/Header/Header"
import Container from 'react-bootstrap/Container';
import Rating from "../Components/Rating"

const ProductDetail = () => {
    return (
        <div>
            <Header />
            <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div style={{ width: "900px" }}>
                        <div style={{ maxWidth: "715px" }}>
                            <h3>
                                I will fix shopify bugs, theme customization, awesome store design
                            </h3>
                            <Rating />
                            <h1>sdf</h1>
                        </div>
                        <Carosal />
                    </div>
                    <div style={{ backgroundColor: "blue", width: "600px" }}><h1>hello world</h1></div>
                </div>
                <div style={{ backgroundColor: "green" }}><h1>hello world</h1></div>
            </Container>
        </div>
    )
}

export default ProductDetail