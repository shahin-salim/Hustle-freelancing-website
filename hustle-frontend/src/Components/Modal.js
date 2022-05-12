import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import * as Yup from "yup";
import { Paper, Box, Grid, Typography } from "@mui/material";
import axios from 'axios';
import Signup from './Signup';
import Login from './Login'
import CreateAnOffer from './CreateAnOffer/CreateAnOffer';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ContactSeller from './ContactSeller';

const Modal = ({ open, setOpen }) => {

    // const handleClickOpen = () => {
    //     // setOpen({...open, bool: false});
    // };

    const handleClose = () => {
        setOpen({ ...open, bool: false });
    };




    return (
        <div>
            <Dialog open={open.bool} onClose={handleClose}>
                {open.type == "signup" && <Signup open={open} setOpen={setOpen} />}
                {open.type == "login" && <Login open={open} setOpen={setOpen} />}
                {open.type == "createAnOffer" && <CreateAnOffer open={open} setOpen={setOpen} />}
                {open.type == "contactSeller" && <ContactSeller open={open} setOpen={setOpen} />}

            </Dialog>
        </div>
    )

}

export default Modal