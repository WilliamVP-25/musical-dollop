import React, {useContext, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Select, Typography} from "antd";
import {Auth} from "../../contexts/AuthContext";
import {User} from "../../contexts/UserContext";
import Loading from "../Loading";

const {Text} = Typography
const {Option} = Select

const PrivacityForm = () => {
    const {getProfile, profile, loadingAuth} = useContext(Auth);
    const {userData, updateUser} = useContext(User);

    const [form, setForm] = useState({
        showProfileTo: '',
        password: '',
        provider: '',
    });

    useEffect(() => {
        if (!profile) getProfile()
        const data = {
            showProfileTo: profile.showProfileTo,
            provider: profile.provider,
        }
        setForm(data)
        // eslint-disable-next-line
    }, [profile]);

    const submitUpdate = async (e) => updateUser(form)

    if (loadingAuth) return <Loading/>

    const {showProfileTo, password} = form

    const onChange = (e) => {
        if (e.name) {
            if (e.name === 'showProfileTo') {
                setForm({
                    ...form, showProfileTo: e.value
                })
                return
            }
        }
        const field = e.target.name
        const value = e.target.value
        setForm({
            ...form, [field]: value
        })
    }

    return (
        <div>
            {profile ? <Form
                    className="p-2 bg-white"
                    name="basic"
                    initialValues={{showProfileTo}}
                    onFinish={submitUpdate}
                    onFinishFailed={() => false}>

                    <Text className="text-primary my-1">MUESTRA TU PERFIL A</Text>
                    <Select size="large" value={showProfileTo} className="w-100 mb-5"
                            onChange={(value) => onChange({name: 'showProfileTo', value})}>
                        <Option value="only_me">Solo yo</Option>
                        <Option value="all">Todos</Option>
                        <Option value="friends">Amigos</Option>
                    </Select>

                    <Form.Item className="w-75 mx-auto">
                        <Button
                            className="rounded-lg"
                            style={{height: '50px'}} block size="large" type="default"
                            htmlType="button">
                            CAMBIAR CONTRASEÑA
                        </Button>
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
export default PrivacityForm;