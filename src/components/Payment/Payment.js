import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox, Divider, Typography, Radio, Avatar, Card} from "antd";
import {Link, useParams} from "react-router-dom";
import {Auth} from "../../contexts/AuthContext";
import axios from "../../config/axios";
import Loading from "../Loading";
import Layout from "../Layout/Layout";
import {formatDateMonth, formatPrice, getRouteAvatar} from "../../config/format";
import {CalendarOutlined, ClockCircleOutlined} from '@ant-design/icons'

const {Title, Text, Paragraph} = Typography
const {Meta} = Card

const Checkout = () => {
    const params = useParams()

    const {user} = useContext(Auth);
    const [group, setGroup] = useState([]);
    const [loadingGroup, setLoadingGroup] = useState(false);

    const getGroup = async code => {
        setLoadingGroup(true)
        try {
            const response = await axios.get(`/api/groups/${code}`);
            if (response.data.group) {
                const group = response.data.group
                setGroup(group)
            }
        } catch (e) {
            setGroup(null)
        }
        setLoadingGroup(false)
    }

    useEffect(() => {
        if (params) {
            getGroup(params.groupCode)
        }
        // eslint-disable-next-line
    }, []);

    const [form, setForm] = useState({
        relationshipType: '',
        acceptanceRules: false,
    });
    const {acceptanceRules, relationshipType} = form

    const onChange = (e) => {
        const field = e.target.name
        let value

        if (field === 'relationshipType') {
            value = e.target.value
            setForm({
                ...form, [field]: value
            })
            return;
        }

        value = e.target.checked
        setForm({
            ...form, [field]: value
        })
    }

    if (!group || !user) return "error"
    if (loadingGroup) return <Loading/>

    return (
        <Layout>
            <div className="w-100 justify-content-center site-card-border-less-wrapper-light">
                <div className="row mx-auto col-lg-11 col-md-12 col-xs-12 justify-content-center align-self-center">
                    <div className="container row pb-5 px-auto justify-content-around mt-3 mx-auto">
                        <div className="col-lg-5 col-md-5 col-xs-12 text-left">
                            <Title level={3} className="text-center">ENTRAR EN EL GRUPO</Title>
                            <Divider/>
                            <Paragraph>
                                Declara la relación que tienes con el admin para participar al grupo compartido
                            </Paragraph>

                            <div className="row mb-3">
                                <div className="col-8">
                                    <Text>Amigos</Text>
                                </div>
                                <div className="col-4 text-right">
                                    <Radio.Group name="relationshipType" onChange={onChange} value={relationshipType}>
                                        <Radio
                                            disabled={group.relationshipType !== 'friends'}
                                            value={'friends'}/>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-8">
                                    <Text>Familia</Text>
                                </div>
                                <div className="col-4 text-right">
                                    <Radio.Group name="relationshipType" onChange={onChange} value={relationshipType}>
                                        <Radio
                                            disabled={group.relationshipType !== 'family'}
                                            value={'family'}/>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-8">
                                    <Text>Mismo núcleo doméstico</Text>
                                </div>
                                <div className="col-4 text-right">
                                    <Radio.Group name="relationshipType" onChange={onChange} value={relationshipType}>
                                        <Radio
                                            disabled={group.relationshipType !== 'domestic_core'}
                                            value={'domestic_core'}/>
                                    </Radio.Group>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-8">
                                    <Text>Compañero de trabajo</Text>
                                </div>
                                <div className="col-4 text-right">
                                    <Radio.Group name="relationshipType" onChange={onChange} value={relationshipType}>
                                        <Radio
                                            disabled={group.relationshipType !== 'coworkers'}
                                            value={'coworkers'}/>
                                    </Radio.Group>
                                </div>
                            </div>

                            <Divider/>
                            <div className="row mb-3">
                                <div className="col-8">
                                    <Text>Confirmo de haber leído y de respetar las reglas de Netflix Premium</Text>
                                </div>
                                <div className="col-4 text-right">
                                    <Checkbox
                                        value={false}
                                        className="w-100"
                                        name="acceptanceRules"
                                        onChange={onChange}/>
                                </div>
                            </div>


                            <Link to={`/checkout/${group.code}`}>
                                <Button
                                    disabled={group.relationshipType !== relationshipType || !acceptanceRules}
                                    className="rounded-lg mt-2"
                                    style={{height: '50px'}} block size="large" type="primary"
                                    htmlType="button">
                                    ENVIAR SOLICITUD
                                </Button>
                            </Link>
                        </div>

                        <div className="col-lg-5 col-md-5 col-xs-12">
                            {group.user && <Card
                                bordered={true}
                                className="w-100 shadow-sm rounded-lg mb-4">
                                <Title level={3}>{group.name ? group.name : group.category.name}</Title>
                                <Meta
                                    avatar={<Avatar size="large"
                                                    src={getRouteAvatar(group.user ? group.user.avatar : '')}/>}
                                    title={<>
                                        <Text strong className="text-uppercase"
                                              style={{fontSize: 14}}>{group.user.name} {group.user.lastName}</Text>
                                        <Paragraph
                                            style={{fontSize: 12}}
                                            className="font-weight-lighter text-muted mb-0">{`Fiabilidad: ${group.user.trust}%`}
                                        </Paragraph>
                                    </>}/>
                                <Divider/>
                                <Paragraph>
                                    <Text><CalendarOutlined style={{fontSize: 20}}/> {formatDateMonth()}</Text>
                                </Paragraph>
                                <Text>
                                    <ClockCircleOutlined
                                        style={{fontSize: 20}}/> Renovación {group.renewalFrequency === 'monthly' ? 'mensual' : 'anual'}
                                </Text>
                                <Divider/>
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <Text>Contribución de gastos</Text>
                                    </div>
                                    <div className="col-4 text-right">
                                        {formatPrice(group.totalPrice)} COP
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <Text>Gasto de gestión</Text>
                                    </div>
                                    <div className="col-4 text-right">
                                        {formatPrice(3000)} COP
                                    </div>
                                </div>
                                <Divider/>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <Title level={3}>Total</Title>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Title level={3} className="text-primary" strong>{formatPrice(3000)} COP</Title>
                                    </div>
                                </div>
                            </Card>}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Checkout;