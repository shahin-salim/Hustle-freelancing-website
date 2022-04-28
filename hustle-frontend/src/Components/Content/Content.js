import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux'

const contentTitleStyle = {
    color: "#62646a",
    fontSize: "24px",
    lineHeight: "130%",
    fontWeight: 700,
    paddingBottom: "32px",
    marginLeft: "10px"
}



const HomeBody = () => {

    const services = useSelector(state => state.services)

    return (
        <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
            <div>
                <h4 style={contentTitleStyle}>Most popular Gigs in Cartoons & Comics </h4>

                <Row>
                    {
                        services && services.map(({ discription, id, image1, image2, seller_id, starting_at, sub_category_id, title, user }, index) =>
                            <Col key={index} sm={12} md={2} xl={2}>
                                <Card
                                    user={user}
                                    title={title}
                                    starting_at={starting_at}
                                    image1={image1}
                                    id={id}
                                    image2={image2}
                                    seller_id={seller_id}
                                    sub_category_id={sub_category_id}
                                    discription={discription}
                                />
                            </Col>
                        )
                    }

                </Row>

            </div>
        </Container>
    )
}

export default HomeBody