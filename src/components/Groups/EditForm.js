import React, {useEffect, useState} from 'react';
import {Button, Form, Input, InputNumber, Select, Typography} from "antd";
import Loading from "../Loading";
import CoverInput from "./CoverInput";
import axios from "../../config/axios";

const {Text} = Typography
const {TextArea} = Input
const {Option} = Select

const GroupForm = ({form, submitUpdate, onChange, loadingCreate}) => {
    const {
        category, name, renewalFrequency, description,
        totalPrice, vacancy, limitVacancy, acceptanceRequest,
        relationshipType, visibility, topic
    } = form

    const [loading, setLoading] = useState(false);
    const [topicsList, setTopics] = useState([]);

    const getTopics = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`/api/topics`);
            if (response.data.topics) {
                setTopics(response.data.topics)
            }
        } catch (e) {
            setTopics(null)
        }
        setLoading(false)
    }

    useEffect(() => {
        getTopics()
    }, []);

    const topicInput = () => {
        if (topicsList.length > 0) {
            return <>
                <div className="col-lg-6 col-md-6 col-xs-12">
                    <Text className="text-primary my-1">CATEGORIA DEL SERVICIO</Text>
                    <Form.Item
                        name="topic"
                        rules={[{
                            required: true,
                            message: 'Selecciona una categoria'
                        }]}>
                        <Select
                            size="large" name={"topic"}
                            value={topic} className="w-100"
                            onChange={(value) => onChange('topic', value)}>
                            {topicsList.map(topic => <Option key={topic._id} value={topic._id}>{topic.name}</Option>)}
                        </Select>
                    </Form.Item>
                </div>
            </>
        }
    }

    const nameInput = () => {
        if (category.name) {
            return <div className="col-lg-6 col-md-6 col-xs-12">
                <Text className="text-primary my-1">CATEGORIA</Text>
                <Form.Item
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Ingresa tu nombre'
                    }]}>
                    <Input readOnly={!!category.name} name="name" onChange={(e) => onChange('name', e.target.value)}
                           value={name}
                           size="large"
                           placeholder="CATEGORIA"/>
                </Form.Item>
            </div>
        } else {
            return <div className="col-lg-12 col-md-12 col-xs-12">
                <Text className="text-primary my-1">NOMBRE DEL SERVICIO</Text>
                <Form.Item
                    name="name"
                    rules={[{
                        required: true,
                        message: 'Ingresa el nombre del servicio'
                    }]}>
                    <Input name="name" onChange={(e) => onChange('name', e.target.value)} value={name} size="large"
                           placeholder="NOMBRE DEL SERVICIO"/>
                </Form.Item>
            </div>
        }
    }

    const renewalFrequencyInput = () => {
        return <div className="col-lg-6 col-md-6 col-xs-12">
            <Text className="text-primary my-1">FRECUENCIA DE RENOVACIÓN</Text>
            <Form.Item
                name="renewalFrequency"
                rules={[{
                    required: true,
                    message: 'Selecciona frecuencia de renovación del servicio'
                }]}>
                <Select disabled={!!category.renewalFrequency}
                        size="large" name={renewalFrequency}
                        value={renewalFrequency} className="w-100"
                        onChange={(value) => onChange('renewalFrequency', value)}>
                    <Option value="monthly">Mensual</Option>
                    <Option value="annual">Anual</Option>
                </Select>
            </Form.Item>
        </div>
    }

    const descriptionInput = () => {
        return <div className="col-lg-12 col-md-12 col-xs-12">
            <Text className="text-primary my-1">DESCRIPCIÓN</Text>
            <Form.Item
                name="description"
                rules={[{
                    required: true,
                    message: 'Ingrese una breve descripción'
                }]}>
                <TextArea
                    readOnly={!!category.description}
                    name="description" onChange={(e) => onChange('description', e.target.value)} value={description}
                    size="large"
                    placeholder="ESCRIBE UNA BREVE DESCRIPCIÓN"/>
            </Form.Item>
        </div>
    }

    const priceInput = () => {
        if (category.totalPrice) {
            return <div className="col-lg-6 col-md-6 col-xs-12">
                <Text className="text-primary my-1">PRECIO DEL SERVICIO</Text>
                <Form.Item
                    name="totalPrice">
                    <InputNumber readOnly={!!totalPrice}
                                 name="totalPrice" className="w-100"
                                 defaultValue={totalPrice} size="large" placeholder="PRECIO DEL SERVICIO"
                                 formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                 parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                 onChange={value => onChange('totalPrice', value)}/>

                </Form.Item>
            </div>
        } else {
            return <div className="col-lg-6 col-md-6 col-xs-12">
                <Text className="text-primary my-1">PRECIO DEL SERVICIO</Text>
                <Form.Item
                    name="totalPrice"
                    rules={[{
                        required: true,
                        message: 'Ingresa el precio del servicio'
                    }]}>
                    {/*<Input type="text"
                           name="totalPrice"
                           onChange={e => onChange('totalPrice', e.target.value)}
                           value={formatPrice(totalPrice)}
                           size="large"
                           placeholder="PRECIO DEL SERVICIO"/>*/}
                    <InputNumber
                        name="totalPrice" className="w-100"
                        defaultValue={totalPrice} size="large" placeholder="PRECIO DEL SERVICIO"
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        onChange={value => onChange('totalPrice', value)}/>

                </Form.Item>
            </div>
        }
    }

    const renderOptionsVacancy = (limitVacancy) => {
        let options = []
        for (let j = 1; j <= limitVacancy; j++) {
            options.push(j)
        }
        return options.map(option => <Option key={`option_${option}`} value={option}>{option}</Option>)
    }

    const vacancyInput = () => {
        return <div className="col-lg-6 col-md-6 col-xs-12">
            <Text className="text-primary my-1">PUESTOS LIBRES</Text>
            <Form.Item
                name="vacancy"
                rules={[{
                    required: true,
                    message: 'Ingresa número de puestos libres'
                }]}>
                <Select
                    size="large" name={'vacancy'}
                    value={vacancy} className="w-100"
                    onChange={(value) => onChange('vacancy', value)}>
                    {renderOptionsVacancy(limitVacancy)}
                </Select>
            </Form.Item>
        </div>
    }

    const acceptanceRequestInput = () => {
        return <div className="col-lg-6 col-md-6 col-xs-12">
            <Form.Item
                name="renewalFrequency"
                rules={[{
                    required: true,
                    message: 'Selecciona tipo de aceptación del servicio'
                }]}>
                <Text className="text-primary my-1">ACEPTACIÓN DE SOLICITUDES</Text>
                <Select disabled={!!category.acceptanceRequest}
                        size="large" name={acceptanceRequest}
                        value={acceptanceRequest} className="w-100"
                        onChange={(value) => onChange('acceptanceRequest', value)}>
                    <Option value="manual">Manual</Option>
                    <Option value="auto">Automático</Option>
                </Select>
            </Form.Item>
        </div>
    }

    const visibilityInput = () => {
        return <div className="col-lg-12 col-md-12 col-xs-12">
            <Text className="text-primary my-1">VISIBILIDAD DEL GRUPO</Text>
            <Form.Item
                name="visibility"
                rules={[{
                    required: true,
                    message: 'Selecciona visibilidad del grupo'
                }]}>
                <Select disabled={!!category.visibility}
                        size="large" name={visibility}
                        value={visibility} className="w-100"
                        onChange={(value) => onChange('visibility', value)}>
                    <Option value="public">Público</Option>
                    <Option value="private">Privado</Option>
                </Select>
            </Form.Item>
        </div>
    }

    const relationshipTypeInput = () => {
        return <div className="col-lg-6 col-md-6 col-xs-12">
            <Text className="text-primary my-1">TIPO DE RELACIÓN DEL GRUPO</Text>
            <Form.Item
                name="relationshipType"
                rules={[{
                    required: true,
                    message: 'Selecciona tipo de aceptación del servicio'
                }]}>
                <Select disabled={!!category.relationshipType}
                        size="large" name={relationshipType}
                        value={relationshipType} className="w-100"
                        onChange={(value) => onChange('relationshipType', value)}>
                    <Option value="domestic_core">Mismo nucleo familiar</Option>
                    <Option value="family">Familia</Option>
                    <Option value="friends">Amigos</Option>
                    <Option value="coworkers">Compañeros de trabajo</Option>
                </Select>
            </Form.Item>
        </div>
    }

    if (loading) return <Loading/>

    return (
        <div>
            <CoverInput onChangeImage={onChange}/>
            {form ? <Form
                    className="p-2 mt-2"
                    name="group"
                    initialValues={{
                        category, name, renewalFrequency, description,
                        totalPrice, vacancy, limitVacancy, acceptanceRequest,
                        relationshipType, visibility, topic
                    }}
                    onFinish={submitUpdate}
                    onFinishFailed={() => false}>

                    <div className="row">
                        {!category._id && topicInput()}
                        {renewalFrequencyInput()}
                        {nameInput()}
                        {descriptionInput()}
                        {priceInput()}
                        {vacancyInput()}
                        {acceptanceRequestInput()}
                        {relationshipTypeInput()}
                        {visibilityInput()}
                    </div>

                    <Form.Item className="w-75 mx-auto">
                        <Button loading={loadingCreate}
                                className="rounded-lg"
                                style={{height: '50px'}} block size="large" type="primary"
                                htmlType="submit">
                            GUARDAR
                        </Button>
                    </Form.Item>
                </Form> :
                <p>Algo salió mal intentalo de nuevo </p>
            }
        </div>
    );
};
export default GroupForm;