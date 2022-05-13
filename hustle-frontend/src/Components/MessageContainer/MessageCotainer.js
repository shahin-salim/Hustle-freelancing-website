import React from 'react'
import "./MessageCotainer.css"
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'

const chatSpanStyle = {
    background: "blue",
    color: "white",
    padding: "10px",
    borderRadius: "32px",
}


const MessageCotainer = ({ styles, data }) => {
    const user = useSelector(state => state.userStatus)

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
                                data.sender != user &&
                                <div className='offer-buttons'>
                                    <div>
                                        <Button variant="outlined">Decline</Button>
                                        <Button variant="contained">Accept</Button>
                                    </div>
                                </div>
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