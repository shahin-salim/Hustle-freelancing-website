import axios from "axios";
import { FETCH_SERVICES_URL } from "../../Utils/Urls";
import { SET_SERVICES } from "../Constants/Services.constants"


// Fetch the services showing in home page
export const fetchServices = () =>
    async (dispatch, getState) => {
        try {
            const response = await axios.get(FETCH_SERVICES_URL)
            dispatch({
                type: SET_SERVICES,
                payload: response.data
            })
        } catch (error) {
            console.log(error.response.data)
        }
    }