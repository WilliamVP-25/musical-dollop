import React from 'react';
import {Button, Checkbox, Divider, Radio, Typography} from "antd";
import {Link} from "react-router-dom";

const {Title, Paragraph, Text} = Typography

const Request = ({group, onChange, form, setStep}) => {
    const {relationshipType, acceptanceRules} = form
    return (
        <>
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

            <Button
                onClick={() => setStep(2)}
                disabled={group.relationshipType !== relationshipType || !acceptanceRules}
                className="rounded-lg mt-2"
                style={{height: '50px'}} block size="large" type="primary"
                htmlType="button">
                ENVIAR SOLICITUD
            </Button>
        </>
    );
};
export default Request;