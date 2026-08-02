import axios from "axios";

const API = "http://localhost:8080/api/admin";

export const getAdminProfile = async () => {

    const token = localStorage.getItem("token");

    return axios.get(
        `${API}/profile`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};