import React, {useContext, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Typography} from "antd";
import {Auth} from "../../contexts/AuthContext";
import {User} from "../../contexts/UserContext";
import Loading from "../Loading";

const {Text} = Typography

const GeneralForm = () => {
    const {getProfile, profile, loadingAuth} = useContext(Auth);
    const {userData, updateUser} = useContext(User);

    const [form, setForm] = useState({
        address: '',
        cityResidence: '',
        countryBirth: '',
        countryResidence: '',
    });

    useEffect(() => {
        if (!profile) getProfile()
        const data = {
            address: profile.address,
            cityResidence: profile.cityResidence,
            countryBirth: profile.countryBirth,
            countryResidence: profile.countryResidence,
        }
        setForm(data)
        // eslint-disable-next-line
    }, [profile]);

    const submitUpdate = async (e) => updateUser(form)

    if (loadingAuth) return <Loading/>

    const {address, cityResidence, countryBirth, countryResidence} = form

    const onChange = (e) => {
        const field = e.target.name
        const value = e.target.value
        setForm({
            ...form, [field]: value
        })
    }

    const onChangeDate = (date, dateString) => {
        console.log(date);
        setForm({
            ...form, birthday: date
        })
    }

    const onChangePhoneNumber = (value) => {
        console.log(value);
        setForm({
            ...form, phoneNumber: value
        })
    }

    return (
        <div>
            {profile ? <Form
                    className="p-2 bg-white"
                    name="basic"
                    initialValues={{address, cityResidence, countryBirth, countryResidence}}
                    onFinish={submitUpdate}
                    onFinishFailed={() => false}>

                    <Form.Item name="name">
                        <Text className="text-primary my-1">PAÍS DE NACIMIENTO</Text>
                        <Input name="countryBirth" onChange={onChange} value={countryBirth} size="large"
                               placeholder="País de nacimiento"/>
                    </Form.Item>

                    <Form.Item
                        className="mb-4"
                        name="address"
                        rules={[{
                            message: 'Domicilio'
                        }]}>
                        <Text className="text-primary my-1">DOMICILIO</Text>
                        <Input name="address" onChange={onChange} value={address} size="large"
                               placeholder="Domicilio"/>
                    </Form.Item>

                    <Form.Item
                        className="mb-4"
                        name="countryBirth"
                        rules={[{
                            message: 'País de residencia'
                        }]}>
                        <Text className="text-primary my-1">PAÍS DE RESIDENCIA</Text>
                        <Input name="countryBirth" onChange={onChange} value={countryBirth} size="large"
                               placeholder="País de residencia"/>
                    </Form.Item>

                    <Form.Item
                        className="mb-4"
                        name="cityResidence"
                        rules={[{
                            message: 'Ciudad de residencia'
                        }]}>
                        <Text className="text-primary my-1">CIUDAD DE RESIDENCIA</Text>
                        <Input name="cityResidence" onChange={onChange} value={cityResidence} size="large"
                               placeholder="Ciudad de residencia"/>
                    </Form.Item>

                    <Form.Item className="w-75 mx-auto">
                        <Button
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
export default GeneralForm;