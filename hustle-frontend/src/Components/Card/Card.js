import { fontSize } from '@mui/system'
import React from 'react'
import "./Card.css"

const Card = () => {
    return (
        <div className='border-color ' style={{ marginBottom: "15px" }}>
            <img style={{ width: "100%" }} src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/114643305/original/4308b3c70509aa57163a4584bad647114cbc88a9.jpg" alt="" />
            <div>
                <div style={{ padding: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img style={{ borderRadius: "50%", width: "25px" }} src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9c0640c1abd0e3705ebc562b9495f4d9-1532250166462/7d93e6f2-f1cc-4a31-9960-25d817ecbe87.png" alt="" />
                        <span style={{ marginLeft: "15px" }}>
                            Shahin salim
                        </span>
                    </div>
                    <div style={{ marginTop: "9px" }}>
                        <span className='title'>
                            I will make special cartoon mascot character
                        </span>
                    </div>
                </div>
                <div className='common-color card-bottum'>
                    <div>
                        <svg fill='#74767e' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z"></path></svg>
                    </div>
                    <div >
                        <div className='starting-at'>STARTING AT</div>
                        <div className='price' >$2000</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card