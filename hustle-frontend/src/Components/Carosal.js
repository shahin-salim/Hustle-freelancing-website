import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'



const Carosal = () => {


    return (

        <Carousel style={{ maxWidth: "750px" }}>
            <Carousel.Item interval={3}>
                <img
                    className="d-block w-100"
                    src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Blogimage.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Blogimage.png"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Blogimage.png"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>









    )
}

export default Carosal