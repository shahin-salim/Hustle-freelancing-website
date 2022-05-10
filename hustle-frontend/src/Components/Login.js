import axios from 'axios';
import * as Yup from "yup";
import useAxios from '../Axios/useAxios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import React, { Fragment, useEffect } from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Paper, Box, Grid, Typography } from "@mui/material";
import { setUserStatus } from '../Redux/Actions/token.action';
import DialogContentText from '@mui/material/DialogContentText';
import { Link } from "react-router-dom"
import { LOGIN_URL } from '../Utils/Urls';




const Signup = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const [loginError, setLoginError] = React.useState("")

    var validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("username is required")
            .matches(/^\S*$/, "This field should not be blank"),
        password: Yup.string()
            .required("password is required")
            .min(4, "password must be at least 6 characters")
            .max(40, "password must not exceed 40 characters")
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
            const response = await axios.post(LOGIN_URL, data)
            localStorage.setItem("refreshToken", response.data.refresh)
            localStorage.setItem("accessToken", response.data.access)
            setOpen({ bool: false, type: "" })
            dispatch(setUserStatus(true))

        } catch (error) {
            setLoginError(error.response.data.detail);
        }
    };


    return (
        <>
            <Typography variant='h3' align='center' p={2}>Login</Typography>
            <Fragment>
                <Paper>
                    <Box px={3} py={2} sx={{ borderColor: "primary.main" }} >
                        <Typography variant="h6" align="center" color="red" margin="dense" gutterBottom={true}>
                            {loginError}
                        </Typography>

                        <Grid container spacing={1}>
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
                                <Grid item xs={12} >
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
                            </>
                        </Grid>
                        <Box mt={3} textAlign='center'>
                            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                                Register
                            </Button>
                        </Box>

                        <Typography color='primary' align='center' mt={2} onClick={() => setOpen({ bool: true, type: "signup" })}>Don't have an account</Typography>

                    </Box>
                </Paper>
            </Fragment>
        </>
    )
}

export default Signup