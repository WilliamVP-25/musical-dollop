import React, {createContext, useEffect, useState} from "react";
import {app} from "../config/firebaseConfig";
import Loading from '../components/Loading'
import axios from "../config/axios";
import tokenAuth from "../config/tokenAuth";

export const Auth = createContext();

export const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({});
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setLoadingAuth(true)
        const getUser = async () => {
            await app.auth().onAuthStateChanged(async user => {
                if (user) {
                    setUser(user);
                    await app.auth().currentUser.getIdToken(true).then(idToken => {
                        localStorage.setItem('authToken', idToken)
                        getProfile()
                    }).catch(function (error) {
                        localStorage.removeItem('authToken')
                    });
                    setShowChild(true);
                    setLoadingAuth(false)
                } else {
                    setLoadingAuth(false)
                    localStorage.removeItem('authToken')
                }
            });
        }
        getUser()
        // eslint-disable-next-line
    }, []);

    const LogOut = async () => {
        localStorage.removeItem('authToken')
        await app.auth().signOut();
    }

    const getProfile = async () => {
        setLoadingAuth(false)
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                tokenAuth(token)
            }
            const response = await axios.post(`/api/users/getUserAuth`);
            if (response.data.user) {
                setProfile(response.data.user)
            }
        } catch (e) {
            setProfile(null)
        }
        setLoadingAuth(false)
    }

    if (!showChild) {
        return <Loading/>;
    } else {
        return (<Auth.Provider value={{
            user, loadingAuth, profile,
            LogOut, getProfile
        }}>
            {children}
        </Auth.Provider>);
    }
};