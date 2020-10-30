import React, {useEffect, useState} from 'react';
import Layout from "../Layout/Layout";
import SelectCategory from "./SelectCategory";
import GroupForm from "./GroupForm";
import {Button, Tooltip, Typography} from "antd";
import {LeftOutlined} from '@ant-design/icons'
import axios from "../../config/axios";
import {openMessageInfo, openNotification} from "../../config/alerts";
import {useHistory} from 'react-router-dom'

const {Paragraph, Text, Title} = Typography

const Create = () => {
    const history = useHistory()

    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        category: '',
        image: null
    });
    const {category, image} = form;

    const selectCategory = (category) => setForm({
        ...form, category
    })

    useEffect(() => {
        if (category && step === 1) {
            setStep(2)
            if (category !== 'personalize' && category._id) {
                setForm({
                    category: category,
                    name: category.name,
                    renewalFrequency: category.renewalFrequency,
                    description: category.description,
                    totalPrice: category.totalPrice,
                    vacancy: null,
                    limitVacancy: category.vacancy ? category.vacancy : 10,
                    acceptanceRequest: category.acceptanceRequest,
                    relationshipType: category.relationshipType,
                    visibility: category.visibility,
                    topic: '',
                })
            } else {
                setForm({
                    category: 'personalize',
                    name: '',
                    renewalFrequency: '',
                    description: '',
                    totalPrice: '',
                    vacancy: '',
                    limitVacancy: 10,
                    acceptanceRequest: '',
                    relationshipType: '',
                    visibility: '',
                    topic: '',
                })
            }
        }
        // eslint-disable-next-line
    }, [category]);

    const submitUpdate = async (e) => {
        const dataGroup = form;
        delete dataGroup.image
        dataGroup.category = dataGroup.category !== 'personalize' ? dataGroup.category._id : 'personalize'
        if (dataGroup.category === 'personalize') {
            if (!image) {
                openMessageInfo("error", "Debes adjuntar una imagen para el grupo personalizado");
            }
        }

        openMessageInfo("loading", "Espere un momento por favor");
        try {
            const response = await axios.post(`/api/groups/`, dataGroup);
            if (response.data.group) {
                const group = response.data.group
                if (image) {
                    const formData = new FormData();
                    formData.append('file', image);
                    const responseCover = await axios.put(`/api/groups/${group._id}/cover`, formData);
                    if (responseCover.data.group) {
                        openNotification("Correcto", `Grupo creado`, "success")
                        console.log(group.code)
                        history.push(`/groups/${group.code}`)
                    }
                }
                console.log(group.code)
                openNotification("Correcto", `Grupo creado`, "success")
                history.push(`/groups/${group.code}`)
            }
        } catch (e) {
            openNotification("Error", e.message, "error")
        }
    };

    const onChange = (name, value) => {
        setForm({
            ...form, [name]: value
        })
    }

    const backToStepOne = () => {
        if (step === 2) {
            return <Tooltip title={"Volver a seleccionar categoria"}>
                <Button type="text" onClick={() => setStep(1)}>
                    <LeftOutlined style={{fontSize: 25}}/>
                </Button>
            </Tooltip>
        }
    }

    return (
        <Layout>
            <div
                className="col-xl-12 col-lg-12 col-md-12 col-xs-12 px-xl-4 px-sm-1 px-md-3 site-card-border-less-wrapper-light">
                <div className="row justify-content-center">
                    <Paragraph className="text-center">
                        <Title className="text-center my-3" level={1}>
                            {backToStepOne()}
                            Crea un nuevo grupo
                        </Title>
                        <Text>Selecciona el servicio deseado de la lista a continuación. Si no lo encuentras, selecciona
                            'Personalizar'</Text>
                    </Paragraph>

                    {step === 1 &&
                    <div className="col-lg-10 col-md-12 col-xs-12 mx-auto pt-4 mb-5 pt-3">
                        <SelectCategory selectCategory={selectCategory}/>
                    </div>}
                    {step === 2 &&
                    <div className="col-lg-8 col-md-12 col-xs-12 mx-auto pt-4 mb-5 pt-3">
                        <GroupForm
                            form={form} onChange={onChange}
                            submitUpdate={submitUpdate}/>
                    </div>}
                </div>
            </div>
        </Layout>
    );
};
export default Create;