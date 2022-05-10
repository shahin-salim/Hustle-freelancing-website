import React, { useEffect } from 'react'
import './Contacts.css'
import ProfilePicture from '../ProfilePicture'
import { useSelector, useDispatch } from 'react-redux'
import { contacts, listenForMessege } from '../../Redux/Actions/socket.actions'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from '../../Utils/FindScreenWidth'

const Contacts = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const screenSize = useWindowSize() // find screen width

    const userContacts = useSelector(state => state.userContacts)

    useEffect(() => {
        dispatch(contacts())
    }, [])

    const handleListenAndNaviage = (id) => {
        dispatch(listenForMessege(id))
        screenSize < 700 && navigate("/messages")
    }

    return (
        <div className='contacts-style' >
            {
                userContacts.map((data) =>  
                    <div className='each-profile' key={data.id} onClick={() => handleListenAndNaviage(data.id)}>
                        <ProfilePicture profile={data.image} />
                        <h6 style={{ marginLeft: "10px", marginBottom: "0" }}>{data.username}</h6>
                    </div>)
            }
        </div>
    )
}

export default Contacts