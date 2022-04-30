import React, { useState, useEffect } from 'react'
import Carosal from '../Carosal'
import Container from 'react-bootstrap/Container';
import Rating from "../Rating"
import "./ServiceDetailsBody.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfilePicture from '../ProfilePicture';
import ServicesSidebar from '../ServicesSidebar/ServicesSidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceDetailsBody = () => {
    const [service, setService] = useState({})
    const [user, setUser] = useState({})

    const { id } = useParams()

    const fetchService = async () => {
        try {

            const { data } = await axios.get(`/services/service/${id}/`)
            setService(data)
            setUser(data.user)

        } catch (err) {

            console.log(err.response.data)

        }

    }
    console.log(user);

    useEffect(() => {
        // try {
        //     const [{ data }, { data: packages }] = await Promise.all([
        //         axios.get(`/services/service/${id}/`),
        //         axios.get(`/services/scope_and_price/?service_id=${id}`)
        //     ])
        //     console.log(data);
        //     setService(data)

        //     console.log(packages);
        //     setPackageInfo(packages);
        // } catch (err) {
        //     console.log(err.response.data)
        // }
        fetchService()
    }, [])



    return (
        <Container style={{ maxWidth: "1500px", padding: "1rem 0rem 1rem 0rem" }}>
            <Snackbar />
            <div className='service-detail-body'>
                <div className='carosal-and-sidebar'>
                    <div style={{ width: "900px" }}>
                        <div style={{ maxWidth: "715px" }}>

                            {/* title */}
                            <h3>
                                {service.title}
                            </h3>

                            {/* profile picture rating and the username */}
                            <div className='rating-and-pic-holder'>
                                <ProfilePicture profile={user.profile_image} />
                                <h6>{user.username}</h6>
                                <Rating />
                            </div>

                        </div>
                        <Carosal image1={service.image1} image2={service.image2} />
                    </div>
                    <div className='package-sidebar-div'>
                        <ServicesSidebar id={id} />
                    </div>
                </div>

                <div style={{ maxWidth: "750px", marginTop: "15px" }}>
                    <h2>About This Gig</h2>
                    <p>
                        {
                            service.discription
                        }
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default ServiceDetailsBody