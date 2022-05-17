import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import useTheAxios from '../Axios/useAxios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Container from 'react-bootstrap/Container';
import DataTableMaterial from '../Components/DataTableMaterial';


const Orders = () => {

    const useAxios = useTheAxios()

    const [orders, setOrders] = useState([])
    const [backupOrders, setBackupOrders] = useState([])


    const fetchOrderDetials = async () => {

        try {
            // user may have 2 roles buyer and seller.
            // if buyer order data is need pass buyer as after 'order/' url
            const { data } = await useAxios.get("/order/buyer")
            console.log(data);
            setOrders(data)
            setBackupOrders(data)

        } catch (error) {
            console.log(error);
        }

    }

    const ShowOrderDetails = (data) => {
        const handleFilter = () => {
            console.log("============= filtering ============");
        }
        return (
            <>
                <TableCell align="center" component="th" scope="data">
                    {data.data.package_id.service_id.user.username}
                </TableCell>
                <TableCell align="center">{data.data.payment_id.amount}</TableCell>
                <TableCell align="center">{data.data.package_id.delivery_time}</TableCell>
                <TableCell align="center">{data.data.date}</TableCell>
                <TableCell align="center">
                    <Button variant="outlined" onClick={() => handleFilter("username")}>
                        {!data.data.buyer_status ? "not completed" : "true"}
                    </Button>
                </TableCell>
            </>
        )
    }




    useEffect(() => {
        fetchOrderDetials()
    }, [])

    return (
        <>
            <Header />
            <Container style={{ maxWidth: "1500px", padding: "2rem 0rem 1.5rem 0rem" }}>
                <DataTableMaterial
                    tableHeading={
                        ["Seller", "Amount", "Delivery time", "date",  "Mark as completed"]
                    }
                    title={"Orders"}
                    datas={orders}
                    RowComponent={ShowOrderDetails}
                    selectTagFileringItems={
                        ["Seller", "Amount"]
                    }
                    filterFunc={(type, value) => {

                        if (type == "Seller") setOrders(backupOrders.filter(data => data.package_id.service_id.user.username.startsWith(value)));

                        if (type == "Amount") setOrders(backupOrders.filter(data => data.data.package_id.price.startsWith(value)));

                    }
                    }

                />
            </ Container>
            <Footer />

        </>
    )
}

export default Orders