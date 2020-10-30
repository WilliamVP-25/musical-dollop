import React, {useEffect, useState} from 'react';
import {Typography} from "antd";
import Layout from "../Layout/Layout";
import {useParams} from "react-router-dom";
import axios from "../../config/axios";
import Loading from "../Loading";
import CardGroup from "../Groups/CardGroup";

const {Title, Paragraph} = Typography

const Category = () => {
    const params = useParams()

    const [groups, setGroups] = useState([]);
    const [category, setCategory] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState(false);

    const getCategory = async slug => {
        setLoadingCategory(true)
        try {
            const response = await axios.get(`/api/categories/${slug}`);
            if (response.data.category) {
                const category = response.data.category
                setCategory(category)
            }
        } catch (e) {
            setCategory(null)
        }
        setLoadingCategory(false)
    }

    const getGroupsCategory = async slug => {
        setLoadingCategory(true)
        try {
            const response = await axios.post(`/api/categories/${slug}/groups`);
            if (response.data.groups) {
                const groups = response.data.groups
                setGroups(groups)
            }
        } catch (e) {
            setGroups(null)
        }
        setLoadingCategory(false)
    }

    useEffect(() => {
        if (params) {
            getCategory(params.category)
            getGroupsCategory(params.category)
        }
        // eslint-disable-next-line
    }, []);

    if (category === null) return "error"
    if (loadingCategory) return <Loading/>

    return (
        <Layout>
            <div
                className="w-100 justify-content-center site-card-border-less-wrapper">
                {category &&
                <div className="row mx-auto col-lg-10 col-md-10 col-xs-12 justify-content-center align-self-center">
                    <Title level={3}>{category.name}</Title>
                    <Paragraph>{category.description}</Paragraph>
                    {groups && <div className="container row pb-5 px-auto justify-content-center mt-5 mx-auto">
                        {groups.map(group => <div key={group._id} className="col-lg-3 col-md-4 col-xs-6">
                            <CardGroup group={group}/>
                        </div>)}
                    </div>}
                </div>
                }
            </div>
        </Layout>
    );
};
export default Category;