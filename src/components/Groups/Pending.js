import React, {useEffect, useState} from 'react';
import {Result, Typography} from "antd";
import Layout from "../Layout/Layout";
import axios from "../../config/axios";
import Loading from "../Loading";
import CardGroup from "../Groups/CardGroup";
import {show_page_error} from "../../config/errors";

const {Title} = Typography

const Created = () => {

    const [groups, setGroups] = useState([]);
    const [loadingGroups, setLoadingGroups] = useState(false);

    const getGroupsCreated = async () => {
        setLoadingGroups(true)
        try {
            const response = await axios.post(`/api/groups/created`);
            if (response.data.groups) {
                const groups = response.data.groups
                setGroups(groups)
            }
        } catch (e) {
            setError({
                status: e.response.status,
                msg: e.response.data.msg
            })
            setGroups(null)
        }
        setLoadingGroups(false)
    }

    useEffect(() => {
        getGroupsCreated()
        // eslint-disable-next-line
    }, []);

    const [error, setError] = useState({
        status: 0,
        msg: ''
    });
    if (error.status) return show_page_error(error)

    if (loadingGroups) return <Loading/>

    return (
        <Layout>
            <div
                className="w-100 justify-content-center site-card-border-less-wrapper">
                <Title level={3} className="text-center">GRUPOS CREADOS POR MÍ</Title>
                {groups &&
                <div className="row mx-auto col-lg-10 col-md-10 col-xs-12 justify-content-center align-self-center">
                    {groups.length > 0 ?
                        <div className="container row pb-5 px-auto justify-content-center mt-5 mx-auto">
                            {groups.map(group => <div key={group._id} className="col-lg-3 col-md-4 col-xs-6">
                                <CardGroup group={group}/>
                            </div>)}
                        </div> :
                        <Result
                            status="info"
                            title="No hay grupos"
                            subTitle="No has creado ningún grupo aún"
                        />}
                </div>}
            </div>
        </Layout>
    );
};
export default Created;