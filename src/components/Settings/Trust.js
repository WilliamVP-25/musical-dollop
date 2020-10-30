import React, {useContext} from 'react';
import {Result} from "antd";
import Layout from "../Layout/Layout";
import Loading from "../Loading";
import CardGroup from "../Groups/CardGroup";
import {Search} from "../../contexts/SearchContext";

const SearchPage = () => {
    const {searchData, loadingSearch} = useContext(Search);
    if (loadingSearch) return <Loading/>
    return (
        <Layout>
            <div
                className="w-100 justify-content-center site-card-border-less-wrapper">
                {searchData &&
                <div className="row mx-auto col-lg-10 col-md-10 col-xs-12 justify-content-center align-self-center">
                    {searchData.length > 0 ?
                        <div className="container row pb-5 px-auto justify-content-center mt-5 mx-auto">
                            {searchData.map(group => <div key={group._id} className="col-lg-3 col-md-4 col-xs-6">
                                <CardGroup group={group}/>
                            </div>)}
                        </div> :
                        <Result
                            status="info"
                            title="No hay grupos"
                            subTitle="No hay resultados para tu busqueda"
                        />}
                </div>}
            </div>
        </Layout>
    );
};
export default SearchPage;