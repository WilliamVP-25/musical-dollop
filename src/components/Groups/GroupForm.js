import React, {useContext, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Typography} from "antd";
import {Auth} from "../../contexts/AuthContext";
import {User} from "../../contexts/UserContext";
import Loading from "../Loading";
import PhoneInput from 'react-phone-number-input'
import {formatDate} from "../../config/format";
import locale from 'antd/es/date-picker/locale/es_ES';

const {Text} = Typography

const ProfileForm = () => {
    const {getProfile, profile, loadingAuth} = useContext(Auth);
    const {userData, updateUser} = useContext(User);

    const [form, setForm] = useState({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        birthday: ''
    });

    useEffect(() => {
        if (!profile) {
            getProfile()
        }
        const data = {
            name: profile.name,
            lastName: profile.lastName,
            email: profile.email,
            phoneNumber: profile.phoneNumber.toString(),
            birthday: formatDate(profile.birthday),
        }
        setForm(data)
        // eslint-disable-next-line
    }, [profile]);

    const submitUpdate = async (e) => {
        updateUser(form)
    };

    if (loadingAuth) return <Loading/>

    const {email, lastName, phoneNumber, birthday, name} = form

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
            {email ? <Form
                    className="p-2 bg-white"
                    name="basic"
                    initialValues={{name, lastName, email, phoneNumber}}
                    onFinish={submitUpdate}
                    onFinishFailed={() => false}>

                    <Form.Item
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Ingresa tu nombre'
                        }]}>
                        <Text className="text-primary my-1">NOMBRE</Text>
                        <Input name="name" onChange={onChange} value={name} size="large"
                               placeholder="Nombre"/>
                    </Form.Item>

                    <Text className="text-primary my-1">APELLIDO</Text>
                    <Form.Item
                        name="lastName"
                        rules={[{
                            required: true,
                            message: 'Ingresa tu apellido'
                        }]}>
                        <Input name="lastName" onChange={onChange} value={lastName} size="large"
                               placeholder="Apellido"/>
                    </Form.Item>

                    <Form.Item
                        className="mb-4"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Ingresa un correo válido',
                            pattern: !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        }]}>
                        <Text className="text-primary my-1 input-material">DIRECCIÓN DE CORREO ELECTRÓNICO</Text>
                        <Input name="email" onChange={onChange} value={email} size="large"
                               placeholder="Correo electrónico"/>
                    </Form.Item>

                    <Form.Item
                        className="mb-4"
                        name="phoneNumber"
                        rules={[{
                            message: 'Ingresa un número de Teléfono'
                        }]}>
                        <Text className="text-primary my-1">NÚMERO DE TELÉFONO</Text>
                        {/*<Input className="border-dark border-0 border-bottom" name="phoneNumber" onChange={onChange}
                               value={phoneNumber}
                               size="large"
                               placeholder="Número de teléfono"/>*/}
                        <PhoneInput
                            className="border-dark border-0 border-bottom"
                            placeholder="Número de teléfono"
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={onChangePhoneNumber}/>
                    </Form.Item>

                    <Form.Item
                        className="mb-5"
                        name="birthday">
                        <Text className="text-primary my-1">FECHA DE NACIMIENTO</Text><br/>
                        <DatePicker
                            locale={locale}
                            value={birthday}
                            showToday={false}
                            className="w-100"
                            size="large"
                            placeholder="Fecha de nacimiento"
                            name="birthday"
                            onChange={onChangeDate}/>
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
export default ProfileForm;