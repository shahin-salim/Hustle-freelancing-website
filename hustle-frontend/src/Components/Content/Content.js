import React from 'react'
import Card from '../Card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const contentTitleStyle = {
    color: "#62646a",
    fontSize: "24px",
    lineHeight: "130%",
    fontWeight: 700,
    paddingBottom: "32px",
    marginLeft: "10px"
}



const HomeBody = () => {
    return (
        <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
            <div>
                <h4 style={contentTitleStyle}>Most popular Gigs in Cartoons & Comics </h4>


                <Row>
                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>
                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>
                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>

                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>
                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>
                    <Col sm={12} md={2} xl={2}>
                        <Card />
                    </Col>
                </Row>

            </div>
        </Container>
    )
}

export default HomeBody