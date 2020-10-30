import React, {useEffect, useState} from 'react';
import {Typography} from "antd";
import Layout from "../Layout/Layout";
import axios from "../../config/axios";
import Loading from "../Loading";
import CardGroup from "../Groups/CardGroup";

const {Title, Paragraph} = Typography

const Joined = () => {

    const [groups, setGroups] = useState([]);
    const [loadingGroups, setLoadingGroups] = useState(false);

    const getGroupsJoined = async () => {
        setLoadingGroups(true)
        try {
            const response = await axios.post(`/api/groups/joined`);
            if (response.data.groups) {
                const groups = response.data.groups
                setGroups(groups)
            }
        } catch (e) {
            setGroups(null)
        }
        setLoadingGroups(false)
    }

    useEffect(() => {
        getGroupsJoined()
        // eslint-disable-next-line
    }, []);

    if (loadingGroups) return <Loading/>

    return (
        <Layout>
            <div
                className="w-100 justify-content-center site-card-border-less-wrapper">
                <Title level={3}>GRUPOS CREADOS POR MÍ</Title>
                {groups &&
                <div className="row mx-auto col-lg-10 col-md-10 col-xs-12 justify-content-center align-self-center">
                    {groups.length > 0 ?
                        <div className="container row pb-5 px-auto justify-content-center mt-5 mx-auto">
                            {groups.map(group => <div key={group._id} className="col-lg-3 col-md-4 col-xs-6">
                                <CardGroup group={group}/>
                            </div>)}
                        </div> :
                        <p>No te has unido a ningún grupo aún</p>}
                </div>}
            </div>
        </Layout>
    );
};
export default Joined;