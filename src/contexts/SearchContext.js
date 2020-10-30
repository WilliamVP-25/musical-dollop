import React, {createContext, useEffect, useState} from "react";
import axios from "../config/axios";
import {openMessageInfo, openNotification} from "../config/alerts";

export const User = createContext();

export const UserContext = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        if (loadingUser) {
            openMessageInfo("loading", "Espere un momento por favor");
        }
    }, [loadingUser]);

    const updateUser = async (data) => {
        setLoadingUser(true)
        try {
            const response = await axios.put(`/api/users`, data);
            if (response.data.user) {
                setUserData(response.data.user)
                openNotification("Correcto", "Datos actualizados", "success")
            }
        } catch (e) {
            openNotification("Error", e.response.message, "success")
        }
        setLoadingUser(false)
    }

    return (<User.Provider
        value={{
            userData, loadingUser, setLoadingUser,
            updateUser
        }}>{children}
    </User.Provider>);
};