import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const Page505 = () => {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Disculpa, algo salió mal."
            extra={<Link to={'/'}><Button type="primary">Volver al Inicio</Button></Link>}
        />
    );
};
export default Page505;