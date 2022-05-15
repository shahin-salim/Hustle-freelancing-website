import axios from 'axios'
import './CreateAnOffer.css'
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import useTheAxios from '../../Axios/useAxios'
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react'
import RadioGroup from '@mui/material/RadioGroup';
import { useSelector, useDispatch } from 'react-redux'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import { sendMessages } from "../../Redux/Actions/socket.actions"
import { GET_PACKAGES_OF_SERVICE_URL, SERVICES_OF_THE_USER_URL } from '../../Utils/Urls'


const Sample = ({ info }) =>
    <div>
        <h4>{info.type}</h4>
        <span>price : ${info.price} </span>
        <span>delivery time : ${info.price}</span>

    </div>



const CreateAnOffer = ({ open, setOpen }) => {


    const dispatch = useDispatch()
    const useAxios = useTheAxios()

    const Socket = useSelector(state => state.Socket)
    const user = useSelector(state => state.userStatus)
    const userListenTo = useSelector(state => state.userListenTo)

    const [price, setPrice] = useState(0)
    const [packges, setPackages] = useState([])
    const [services, setServices] = useState([])
    const [value, setValue] = React.useState('basic');
    const [currPlace, setCurrPlace] = useState("service")
    const [selectedService, setSelectedService] = useState("")
    const [selectedPackage, setSelectedPackage] = useState({})
    const [offerDiscription, setOfferDiscription] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [serviceModalTitle, setServiceModalTitle] = useState("Select Service")

    console.log(selectedPackage);

    // handle change in the input field for the negotiation price
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // feach all services of the user
    const fetchServices = async () => {
        try {
            setServiceModalTitle("Select Service")
            const { data } = await useAxios.get(SERVICES_OF_THE_USER_URL)
            console.log("-----------------------------------------------");
            setServices(data)
        } catch (error) {
            // console.log(error);
            setServiceModalTitle("you are not a seller")
        }
    }

    // get packages details of the selected service
    const handleServicePackages = async (id) => {
        try {
            const { data } = await useAxios.get(GET_PACKAGES_OF_SERVICE_URL + id)
            setPackages([...data])
            setSelectedPackage({ ...data[0] })
            setPrice(data[0].price)
        } catch (error) {
            console.log(error);
        }
        setCurrPlace("packages")
    }

    // create offer will send an negotaited for the user in the other end
    const handleCreateOffer = () => {
        console.log(price, '   ', offerDiscription, price);
        if (price && offerDiscription.trim()) {
            dispatch(sendMessages({
                ...selectedPackage,
                price: parseInt(price),
                sender: user,
                conversation_id: userListenTo.conversation_id,
                receiver: userListenTo.user.id,
                discription: offerDiscription
            }))
            setOpen({ bool: false })
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])





    return (
        <div className='create-an-offer-main-div'>
            <div>
                <h2 style={{ textAlign: "center", padding: "0px 190px 0px 190px" }}>{serviceModalTitle}</h2>
            </div>
            {
                currPlace == "service" && <div className='all-services'>

                    {/* list all the services */}
                    {services.map((data) =>
                        <div className='CreateAnoffer-services' key={data.id} onClick={() => handleServicePackages(data.id)}>
                            <div>
                                <img style={{ width: "21%" }} src={data.image1} alt="image" />
                                <h5 style={{ marginLeft: "5px" }}>{data.title}</h5>
                            </div>
                        </div>
                    )}

                </div>
            }

            {currPlace == "packages" &&
                <div className='all-services'>
                    <div>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >

                            {/* set packges information */}
                            {packges.map((data) =>
                                <div
                                    key={data.id} className='packages-info'
                                    onChange={() => {
                                        setSelectedPackage(data)
                                        setPrice(data.price)
                                    }} >
                                    <FormControlLabel
                                        key={data.id}
                                        data={data}
                                        value={data.type}
                                        control={<Radio />}
                                        label={<Sample info={data} />}
                                    />
                                </div>
                            )}

                        </RadioGroup>


                        <div style={{ padding: "0 5px 0 5px", marginTop: "6px" }}>

                            <TextareaAutosize
                                minRows={3}
                                defaultValue={offerDiscription}
                                style={{ width: "100%" }}
                                aria-label="minimum height"
                                placeholder="Discription about the offer"
                                onChange={e => setOfferDiscription(e.target.value)}
                            />

                        </div>


                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div className='negotiation-price-field'>
                                <TextField
                                    label='Price'
                                    value={price}
                                    id="outlined-required"
                                    onChange={e => {
                                        if (e.target.value.match(/^\d+$/) || e.target.value == "") {
                                            setPrice(e.target.value)
                                            setValidationErrors({ ...validationErrors, price: "" })
                                        } else {
                                            setValidationErrors({ ...validationErrors, price: "corrupt this field" })
                                        }
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