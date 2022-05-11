import React, { Fragment, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Paper, Box, Grid, Typography } from "@mui/material";

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken, setUserStatus } from '../Redux/Actions/token.action';

import useAxios from '../Axios/useAxios';
import { SIGNUP_URL } from '../Utils/Urls';


const Signup = ({ setOpen }) => {
    const myAxios = useAxios()               //   custom hook for using axios interceptor
    const dispatch = useDispatch()
    const data = useSelector(state => state)

    var validationSchema = Yup.object().shape({

        first_name: Yup.string().required("First_name is required").matches(/^\S*$/, "This field should not be blank"),
        last_name: Yup.string().required("Last_name is required").matches(/^\S*$/, "This field should not be blank"),
        username: Yup.string().required("username is required").matches(/^\S*$/, "This field should not be blank"),
        phone_number: Yup.number()
            .required("phone number is required")
            .positive()
            .min(10, "phone number must be at least 10 characters"),
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid")
            .matches(/^\S*$/, "This field should not be blank"),
        password: Yup.string()
            .required("password is required")
            .min(6, "password must be at least 6 characters")
            .max(40, "password must not exceed 40 characters")
            .matches(/^\S*$/, "This field should not be blank"),
        password2: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("password"), null], "Confirm password does not match")
            .matches(/^\S*$/, "This field should not be blank"),
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (data) => {

        try {

            // post signup form data to database if the request is success 
            // set access token and refresh token in the local storage
            // and set the userStatus state in redux set as True it will indiacate is online
            
            const response = await axios.post(SIGNUP_URL, data)
            localStorage.setItem("refreshToken", response.data.refresh)
            localStorage.setItem("accessToken", response.data.access)
            setOpen({ bool: false, type: "" })
            dispatch(setUserStatus(true))

        } catch (error) {

            // set the backend validation error to  hook form 
            const data = error.response.data;
            if (data.password) setError("username", { type: "server", message: error.response.data.username[0] });
            if (data.phone_number) setError("phone_number", { type: "server", message: error.response.data.phone_number[0] });
            if (data.email) setError("email", { type: "server", message: error.response.data.email[0] })
            if (data.password) setError("password", { type: "server", message: error.response.data.password[0] });
        }
    };

    return (
        <>
            <Typography variant='h3' align='center' p={2}>SignUp</Typography>
            <Fragment>
                <Paper>
                    <Box px={3} py={2} sx={{ borderColor: "primary.main" }} >


                        <Grid container spacing={1}>

                            <Grid item xs={12} >
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.first_name?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="first_name"
                                    name="first_name"
                                    label="First Name"
                                    fullWidth
                                    margin="dense"
                                    {...register("first_name")}
                                    error={errors.first_name ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.first_name?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="last_name"
                                    name="last_name"
                                    label="Last Name"
                                    // value={last_name}
                                    fullWidth
                                    margin="dense"
                                    {...register("last_name")}
                                    error={errors.last_name ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.last_name?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="phone_number"
                                    name="phone_number"
                                    label="phone_number"
                                    type="number"
                                    // value={username}
                                    fullWidth
                                    margin="dense"
                                    {...register("phone_number")}
                                    error={errors.phone_number ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.phone_number?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    fullWidth
                                    // value={email}
                                    margin="dense"
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.email?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="username"
                                    name="username"
                                    label="username"
                                    fullWidth
                                    // value={username}
                                    margin="dense"
                                    {...register("username")}
                                    error={errors.username ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.username?.message}
                                </Typography>
                            </Grid>

                            <>
                                {" "}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        margin="dense"
                                        {...register("password")}
                                        error={errors.password ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.password?.message}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="password2"
                                        name="password2"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        margin="dense"
                                        {...register("password2")}
                                        error={errors.password2 ? true : false}
                                    />
                                    <Typography variant="inherit" color="textSecondary">
                                        {errors.password2?.message}
                                    </Typography>
                                </Grid>{" "}
                            </>

                        </Grid>
                        <Box mt={3} textAlign='center'>
                            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                                Register
                            </Button>
                        </Box>
                        <Typography color='primary' align='center' mt={2} onClick={() => setOpen({ bool: true, type: "login" })}>Already have an account</Typography>
                    </Box>
                </Paper>
            </Fragment>
        </>
    )
}

export default Signup