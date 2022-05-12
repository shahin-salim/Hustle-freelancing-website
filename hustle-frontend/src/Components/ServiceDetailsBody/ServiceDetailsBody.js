import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from "../Rating"
import Carosal from '../Carosal'
import "./ServiceDetailsBody.css"
import { useParams } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import Container from 'react-bootstrap/Container';
import { GET_SERVICE_URL } from '../../Utils/Urls';
import ServicesSidebar from '../ServicesSidebar/ServicesSidebar';
import { useDispatch } from 'react-redux';
import { servicesUser } from '../../Redux/Actions/socket.actions';

const ServiceDetailsBody = () => {
    const [service, setService] = useState({})

    const [user, setUser] = useState({})

    const { id } = useParams()

    const dispatch = useDispatch()

    // Get service details
    const fetchService = async () => {
        try {
            const { data } = await axios.get(`${GET_SERVICE_URL + id}/`)
            setService(data)
            setUser(data.user)
            dispatch(servicesUser(data.user))

        } catch (err) {
            console.log(err.response)
        }
    }

    useEffect(() => {
        fetchService()
    }, [])

    return (
        <Container style={{ maxWidth: "1500px", padding: "1rem 0rem 1rem 0rem" }}>
            <div className='service-detail-body'>

                <div className='carosal-and-sidebar'>

                    <div style={{ width: "900px" }}>

                        <div style={{ maxWidth: "715px" }}>
                            {/* title */}
                            <h3>{service.title}</h3>

                            {/* profile picture rating and the username */}
                            <div className='rating-and-pic-holder'>
                                <ProfilePicture profile={user.profile_image} />
                                <h6>{user.username}</h6>
                                <Rating />
                            </div>
                        </div>

                        {/* pass the two images to Casoral component */}
                        <Carosal image1={service.image1} image2={service.image2} />

                    </div>

                    <div className='package-sidebar-div'>
                        {/* display the package details in the side bar */}
                        <ServicesSidebar id={id} service={service} />
                    </div>

                </div>

                <div style={{ maxWidth: "750px", marginTop: "15px" }}>
                    <h2>About This Gig</h2>
                    <p>{service.discription}</p>
                </div>

            </div>
        </Container>
    )
}

export default ServiceDetailsBody