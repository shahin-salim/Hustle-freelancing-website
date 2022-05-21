import * as Qs from 'qs'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import * as Yup from "yup";
import useAxios from '../Axios/useAxios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Paper, Box, Grid, Typography } from "@mui/material";
import { logoutTheUser, setUserStatus } from '../Redux/Actions/token.action';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import useTheAxios from '../Axios/useAxios';
import { useSelector } from 'react-redux';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { CRUD_SELLER_URL, REFRESH_TOKEN_URL } from '../Utils/Urls';


const SellerCreationForm = ({ open, setOpen }) => {
    const useAxios = useTheAxios()
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileError, setSelectedFileError] = useState();

    const [selectedCountry, setSelectedCountry] = useState()
    const userStatus = useSelector(state => state.userStatus)

    const dispatch = useDispatch()


    var validationSchema = Yup.object().shape({
        description: Yup.string()
            .required("description is required")
            .min(20, "description must be at least 20 characters"),
        skills: Yup.string()
            .required("this field  is required"),
        languages: Yup.string()
            .required("this field  is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    // const refreshPermissions = async () => {
    //     try {
    //         console.log("-----------------------------------------------------------------------");
    //         const { data } = await axios.post(REFRESH_TOKEN_URL , { refresh: localStorage.getItem("refreshToken") })
    //         // localStorage.setItem("accessToken", data.access)
    //         // localStorage.setItem("refreshToken", data.refresh)
    //         dispatch(setUserStatus(data.refresh, data.access))

    //     } catch (err) {
    //         localStorage.removeItem("accessToken")
    //         localStorage.removeItem("refreshToken")
    //         dispatch(setUserStatus(false))
    //     }
    // }

    const onSubmit = async (datas) => {

        if (!selectedFile) return setSelectedFileError("image is required")

        const formData = new FormData();


        formData.append("user_id", userStatus.userId);
        formData.append("image", selectedFile, "image.png");
        formData.append("description", String(datas.description).split(","));
        formData.append("skills", String(datas.skills).split(","));
        formData.append("languages", String(datas.languages).split(","));

        try {
            // CRUD_SELLER_URL
            const { data } = await useAxios.post("/seller/", formData, {
                headers: { 'content-type': 'multipart/form-data' },
            })
            console.log(data);
            setOpen({ bool: false })
            dispatch(logoutTheUser())



        } catch (error) {
            console.log(error.response);
        }
    };

    const handleInputFile = (event) => {
        setSelectedFile(event.target.files[0]);
    }


    return (
        <div>
            <Container>

                <Fragment>
                    <Typography variant="h5" align="center" style={{ marginTop: "5px" }}>BECOME A SELLER</Typography>
                    {/* <Paper> */}

                    <Box px={3} py={2} sx={{ borderColor: "primary.main" }} >
                        {/* <Typography variant="h6" align="center" color="red" margin="dense" gutterBottom={true}>
                            {loginError}
                        </Typography> */}

                        <Grid item xs={12} sm={12}     >
                            <div>
                                {selectedFile && <img style={{ paddingBottom: '10px', width: "8rem" }} src={URL.createObjectURL(selectedFile)} alt="" />}
                                <input
                                    style={{ width: "100%", paddingBottom: '10px' }}
                                    type="file"
                                    name="file"
                                    onChange={handleInputFile}
                                    accept="image/png, image/gif, image/jpeg"
                                />
                            </div>
                            <Typography variant="inherit" color="textSecondary">
                                {selectedFileError}
                            </Typography>
                        </Grid>



                        <Grid container spacing={1}>





                            <Grid item xs={12}      >
                                <TextareaAutosize
                                    name='description'
                                    maxRows={4}
                                    aria-label="maximum height"
                                    placeholder="description"
                                    style={{ width: "100%", marginTop: "9px" }}
                                    {...register("description")}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.description?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}      >
                                <TextField
                                    required
                                    id="skills"
                                    name="skills"
                                    label="skills"
                                    type="skills"
                                    fullWidth
                                    margin="dense"
                                    placeholder='Ex: webdevelopent, designing'
                                    {...register("skills")}
                                    error={errors.skills ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.skills?.message}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}      >
                                <TextField
                                    required
                                    id="languages"
                                    name="languages"
                                    label="languages"
                                    type="languages"
                                    fullWidth
                                    margin="dense"
                                    placeholder='Ex: webdevelopent, designing'
                                    {...register("languages")}
                                    error={errors.languages ? true : false}
                                />
                                <Typography variant="inherit" color="textSecondary">
                                    {errors.languages?.message}
                                </Typography>
                            </Grid>

                        </Grid>

                        <Box mt={3} textAlign='center'>
                            <Button variant="contained"
                                color="primary"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit
                            </Button>
                        </Box>


                    </Box>
                    {/* </Paper> */}
                </Fragment>

            </Container>
        </div>
    )
}

export default SellerCreationForm