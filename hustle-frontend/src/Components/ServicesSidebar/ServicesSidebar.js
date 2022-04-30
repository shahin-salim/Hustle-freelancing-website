import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "react-bootstrap/Button";
import "./ServicesSidebar.css"
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ServicesSidebar({ id }) {
    console.log(id);


    const [packageInfo, setPackageInfo] = useState([])
    const [value, setValue] = React.useState(0);



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchPackagesDetails = async () => {
        // try {
        //     const [{ data }, { data: packages }] = await Promise.all([
        //         axios.get(`/services/service/${id}/`),
        //         axios.get(`/services/scope_and_price/?service_id=${id}`)
        //     ])
        //     console.log(data);
        //     setService(data)

        //     console.log(packages);
        //     setPackageInfo(packages);
        // } catch (err) {
        //     console.log(err.response.data)
        // }
        try {
            const { data } = await axios.get(`/services/scope_and_price/?service_id=${id}`)
            setPackageInfo(data)
        } catch (err) {
            console.log(err.response.data)
        }
    }


    console.log(packageInfo);

    useEffect(() => {

        fetchPackagesDetails()

    }, [])


    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className='modify-tabs' value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Basic" {...a11yProps(0)} />
                    <Tab label="Standard" {...a11yProps(1)} />
                    <Tab label="Premium" {...a11yProps(2)} />
                </Tabs>
            </Box>


            {
                packageInfo.map((data, index) =>
                    <TabPanel value={value} index={index}>
                        <div className='align-items-sidebar price-and-package-name' >
                            <span>{data.type}</span>
                            <h4 style={{ fontWeight: "bold" }}>₹{data.price}</h4>
                        </div>
                        <div className='align-items-sidebar'>
                            <p>{data.desciption_about_offer}</p>
                        </div>
                        <div className='align-items-sidebar' style={{ fontWeight: "bold" }}>
                            <span>{data.delivery_time} days delivery </span>
                            <span className='ms-3' >1 revision</span>
                        </div>
                    </TabPanel>
                )
            }


            <div className='become-a-seller-button'>
                <Button variant="dark">Contact seller</Button>
            </div>
        </Box>
    );
}