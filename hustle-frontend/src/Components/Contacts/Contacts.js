import React from 'react'
import './Contacts.css'
import ProfilePicture from '../ProfilePicture'

const Contacts = () => {
    return (
        <div className='contacts-style' >

            <div className='each-profile'>
                <ProfilePicture />
                <h6 style={{ marginLeft: "10px", marginBottom: "0" }}>shahin salim</h6>
            </div>

        </div>
    )
}

export default Contacts