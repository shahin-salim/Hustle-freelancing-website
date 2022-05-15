import React from 'react'
import "./MessageCotainer.css"
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { makePayment } from '../../Utils/Payment';
import useTheAxios from '../../Axios/useAxios';

const chatSpanStyle = {
    background: "blue",
    color: "white",
    padding: "10px",
    borderRadius: "32px",
}




const MessageCotainer = ({ styles, data }) => {


    const user = useSelector(state => state.userStatus)
    const Socket = useSelector(state => state.Socket)


    const useAxios = useTheAxios()


    // decline the offer seller made
    const handleDeclineOffer = async (data) => {
        // decline offer
        Socket.emit('offer_status', {
            conversation_id: data.conversation_id,
            status: "declined",
            id: data._id,
            sender: data.sender,
            currUser: user
        });

    }

    const handlePayment = async (packageData) => {
        try {
            const { data } = await useAxios.post("/order/razorpay", packageData, user,)
            makePayment(
                data,
                packageData,
                user,
                () => {
                    Socket.emit('offer_status', {
                        conversation_id: packageData.conversation_id,
                        status: "accepted",
                        id: packageData._id,
                        sender: packageData.sender,
                        currUser: user
                    });
                }
            )
        } catch (error) {

        }
    }

    return (
        <div style={styles} key={data.id}   >
            {!data.price &&

                <span key={data.id} style={chatSpanStyle}>
                    {data.message}
                </span>

            }
            {data.price &&

                <div className='offer-styling'>

                    <div key={data.id} >
                        <div style={{ borderBottom: "1px solid #e4e5e7" }}>
                            <div className='offer-header'>
                                <h5>I will web development using the most famous language python</h5>
                                <h4>${data.price}</h4>
                            </div>
                        </div>
                        <div className='offer-content-part'>
                            <div className='border-bottum-color'>
                                <p>{data.message}</p>
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <h6>you offer include</h6>
                                <span>1 revisoin</span>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <span>1 deliery</span>
                            </div>
                            {
                                data.status == "pending" && data.sender != user &&
                                <div className='offer-buttons'>
                                    <div>
                                        <Button variant="outlined" onClick={_ => handleDeclineOffer(data)}>Decline</Button>
                                        <Button variant="contained" onClick={_ => handlePayment(data)}>Accept</Button>
                                    </div>
                                </div>
 
 


                            }


                            {
                                (data.status == "pending" && data.sender == user) &&
                                <div className='offer-buttons'>
                                    <h4 style={{ color: "#4a148c" }}>Offer {data.status}</h4>
                                </div>
                            }

                            {
                                (data.status == "declined") && <h4 className='offer-buttons' style={{ color: "#b71c1c" }}>Offer {data.status}</h4>
                            }

                            {
                                (data.status == "accepted") && <h4 className='offer-buttons' style={{ color: "#4caf50" }}>Offer {data.status}</h4>
                            }




                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
// styles={{ marginTop: "30px" }}

export default MessageCotainer