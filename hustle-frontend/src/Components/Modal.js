import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


import Login from './Login'
import Signup from './Signup';
import ContactSeller from './ContactSeller';
import SellerCreation from './SellerCreation'
import { useSelector, useDispatch } from 'react-redux';
import CreateAnOffer from './CreateAnOffer/CreateAnOffer';
import { openModal, closeModal } from "../Redux/Actions/SetupModal"

const Modal = ({ open, setOpen }) => {

    // const handleClickOpen = () => {
    //     // setOpen({...open, bool: false});
    // };

    // const dispatch = useDispatch()
    // const modalConf = useSelector(state => state.modalConf)


    const handleClose = () => {
        setOpen({ ...open, bool: false });
    };




    return (
        <div>
            <Dialog open={open.bool} onClose={handleClose}>
                {open.type == "signup" && <Signup open={open} setOpen={setOpen} />}
                {open.type == "login" && <Login open={open} setOpen={setOpen} />}
                {open.type == "contactSeller" && <ContactSeller open={open} setOpen={setOpen} />}
                {open.type == "createAnOffer" && <CreateAnOffer open={open} setOpen={setOpen} />}
                {open.type == "become_a_seller" && <SellerCreation open={open} setOpen={setOpen} />}
            </Dialog>
        </div>
    )

}

export default Modal