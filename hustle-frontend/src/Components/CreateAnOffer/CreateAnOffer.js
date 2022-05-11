import React, { useEffect, useState } from 'react'
import './CreateAnOffer.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import useTheAxios from '../../Axios/useAxios'
import { GET_PACKAGES_OF_SERVICE_URL, SERVICES_OF_THE_USER_URL } from '../../Utils/Urls'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { sendMessages } from "../../Redux/Actions/socket.actions"


const Sample = ({ info }) =>
    <div>
        <h4>{info.type}</h4>
        <span>price : ${info.price} </span>
        <span>delivery time : ${info.price}</span>

    </div>



const CreateAnOffer = ({ open, setOpen }) => {
    // const onSubmit = data => console.log(data);

    const Socket = useSelector(state => state.Socket)

    const dispatch = useDispatch()
    const user = useSelector(state => state.userStatus)
    const listenTo = useSelector(state => state.userListenTo)

    const useAxios = useTheAxios()
    const [services, setServices] = useState([])
    const [packges, setPackages] = useState([])
    const [selectedService, setSelectedService] = useState("")
    const [currPlace, setCurrPlace] = useState("service")

    const [selectedPackage, setSelectedPackage] = useState({})

    const [price, setPrice] = useState(0)


    const [value, setValue] = React.useState('basic');

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    const handleServicePackages = async (id) => {
        try {
            const { data } = await useAxios.get(GET_PACKAGES_OF_SERVICE_URL + id)
            setPackages([...data])
            setSelectedPackage({ ...data[0] })
            setPrice(data[0].price)
            // console.log(data, "*********************");

        } catch (error) {
            console.log(error);
        }
        setCurrPlace("packages")
    }

    const fetchServices = async () => {
        try {

            const { data } = await useAxios.get(SERVICES_OF_THE_USER_URL)
            console.log("service");
            console.log(data);

            setServices(data)

        } catch (error) {
            console.log(error);
        }
    }

    // console.log(services);
    // console.log(packges);
    // console.log(selectedPackage, '--------');



    const handleCreateOffer = () => {

        // if (selectedPackage.price != parseInt(price)) {
        //     console.log("price changed", { ...selectedPackage, price: parseInt(price), sender: user, receiver: listenTo })
        // }

        dispatch(
            sendMessages(
                { ...selectedPackage, price: parseInt(price), sender: user, receiver: listenTo }
            )
        )


    }

    useEffect(() => {
        // console.log("use Effect changed");
        fetchServices()

    }, [])


    // console.log(price, "this is price");

    return (
        <div className='create-an-offer-main-div'>
            <div><h2 style={{ textAlign: "center", padding: "0px 190px 0px 190px" }}>Select Service</h2></div>
            {
                currPlace == "service" && <div className='all-services'>
                    {
                        services.map((data) =>
                            <div className='CreateAnoffer-services' key={data.id} onClick={() => handleServicePackages(data.id)}>
                                <div>
                                    <img style={{ width: "21%" }} src={data.image1} alt="image" />
                                    <h5 style={{ marginLeft: "5px" }}>{data.title}</h5>
                                </div>
                            </div>
                        )
                    }

                </div>
            }

            {
                currPlace == "packages" &&
                <div className='all-services'>

                    <div>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {
                                packges.map((data) =>
                                    <div key={data.id} className='packages-info' onChange={() => {
                                        setSelectedPackage(data)
                                        setPrice(data.price)
                                    }
                                    } >
                                        <FormControlLabel key={data.id} data={data} value={data.type} control={<Radio />} label={<Sample info={data} />} />
                                    </div>
                                )
                            }
                        </RadioGroup>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ padding: "23px 7px 0px 6px" }}>
                                <TextField
                                    id="outlined-required"
                                    label='Price'
                                    value={price}
                                    onChange={(e) => {
                                        if (e.target.value.match(/^\d+$/) || e.target.value == "") setPrice(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='package-submit-button'>
                                <Button onClick={handleCreateOffer} variant="contained">Send Offer</Button>
                            </div>

                        </div>
                    </div >

                </div>
            }
        </div>
    )
}

export default CreateAnOffer