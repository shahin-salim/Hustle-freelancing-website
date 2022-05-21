import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Content from '../Components/Content/Content'
import { fetchServices } from '../Redux/Actions/fetch.services'

const Home = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        // Fetch all the services on load using redux
        dispatch(fetchServices())
    }, [])

    return (
        <>
            <Header />
            <Content />
            <Footer />
        </>
    )
}

export default Home