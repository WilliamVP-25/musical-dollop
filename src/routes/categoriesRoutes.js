import React from 'react';
import AuthRoute from "./AuthRoute";
import Create from "../components/Groups/Create";
import Details from "../components/Groups/Details";

const GroupsRoutes = () => {
    return (
        <>
            <AuthRoute exact path="/create" component={Create}/>
            <AuthRoute exact path="/groups/:groupCode" component={Details}/>
        </>
    );
};
export default GroupsRoutes;