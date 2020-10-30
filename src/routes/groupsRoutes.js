import React from 'react';
import Account from "../components/Settings/Account";
import AuthRoute from "./AuthRoute";

const UserRoutes = () => {
    return (
        <AuthRoute path="/user/:user" component={Account}/>
    );
};
export default UserRoutes;