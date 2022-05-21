import { useDispatch, useSelector } from 'react-redux'
import './Header.css'
import Modal from "../Modal"
import * as React from 'react'
import Avathar from '../Avathar'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import { useNavigate } from "react-router-dom"
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandLess from '@mui/icons-material/ExpandLess'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import ListItemButton from '@mui/material/ListItemButton'
import { logoutTheUser } from '../../Redux/Actions/token.action'
import { openModal } from '../../Redux/Actions/SetupModal'



const ariaLabel = { 'aria-label': 'description' };

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const openAnchorEl = Boolean(anchorEl);
    const [open, setOpen] = React.useState(false)
    const userStatus = useSelector(state => state.userStatus)
    const [state, setState] = React.useState({ left: false, });
    const [openForm, setOpenForm] = React.useState({ open: true })


    const handleCloseAnchorEl = () => {
        setAnchorEl(null);
    }

    const handleClickAnchorEl = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const logoutUser = () => {
        dispatch(logoutTheUser())
    }

    const handleClick = () => {
        setOpen(!open);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                    </ListItemButton>
                </List>
            </Collapse>
        </Box>
    );


    return (
        <div>

            {/* ========================================== Modal ======================================== */}
            {openForm.bool && <Modal open={openForm} setOpen={setOpenForm} />}
            {/* ========================================== Modal ======================================== */}

            <Container style={{ maxWidth: "1544px", height: "5rem", width: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", height: "100%" }}>
                    <div className='replace-prev-nav'>
                        <div className='replaced-nav-setup'>
                            <React.Fragment key={'left'}>
                                <span onClick={toggleDrawer('left', true)}>
                                    <MenuIcon />
                                </span>
                                <Drawer
                                    anchor={'left'}
                                    open={state['left']}
                                    onClose={toggleDrawer('left', false)}
                                >
                                    {list('left')}
                                </Drawer>
                            </React.Fragment>
                            <div >
                                <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
                            </div>
                            <div>
                                <h1></h1>
                            </div>
                        </div>
                    </div>
                    <div className='hide-old-search'>
                        <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
                        <input placeholder='Search' className='item-after-search' style={{ marginLeft: "50px" }} />
                    </div>
                    <div className='item-after-search'>
                        {
                            userStatus &&
                            <>
                                <span className='navabr-font-color' onClick={() => navigate("/chat")}>Messages</span>
                                <span className='navabr-font-color' onClick={() => navigate("/orders")}>Orders</span>

                                <span className='navabr-font-color'
                                    onClick={
                                        () => userStatus.sellerId ?
                                            navigate("/seller")
                                            :
                                            setOpenForm({ bool: true, type: "become_a_seller" })
                                    }
                                >
                                    {userStatus.sellerId ? "Switch to selling" : "Become a seller"}
                                </span>
                            </>
                        }
                        {
                            userStatus ? <Avathar /> : !userStatus &&
                                <>
                                    <span
                                        className='navabr-font-color'
                                        onClick={() => setOpenForm({ bool: true, type: "signup" })}
                                    >
                                        Signup
                                    </span>

                                    <span
                                        className='navabr-font-color'
                                        onClick={() => setOpenForm({ bool: true, type: "login" })}
                                    >
                                        Login
                                    </span>
                                </>
                        }
                    </div>
                </div>
            </Container>

            <div className='sub-nav-border item-after-search'>
                <Container style={{ display: "flex", maxWidth: "1562px" }} className="sub-navbar">
                    <div className='category-list-in-header'>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>twilio</span>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>twilio</span>
                        <span className='navabr-font-color'>Smartphone</span>
                        <span className='navabr-font-color'>Graphcs</span>
                        <span className='navabr-font-color'>Webdevelopment</span>
                        <span className='navabr-font-color'>Smartphone</span>
                    </div>
                </Container>
            </div>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Container>
                    <input placeholder='Find services' className='hide-serach' style={{ width: "100%" }} />
                </Container>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Header