import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Avatar, Spin, Tooltip} from "antd";
import {PlusCircleOutlined, CheckOutlined} from '@ant-design/icons';
import axios from "../../config/axios";
import {useDropzone} from "react-dropzone";
import {Auth} from "../../contexts/AuthContext";
import {openMessageInfo, openNotification} from "../../config/alerts";

const AvatarInput = () => {
    const {getProfile, profile} = useContext(Auth);

    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (!profile) {
            getProfile()
        } else {
            setAvatar(profile.avatar)
        }
        // eslint-disable-next-line
    }, [profile]);

    const [showDropzone, setShowDropzone] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDropRejected = () => {
        openMessageInfo("warning", "No es posible subir el archivo");
    }

    const onDropAccepted = useCallback(async acceptedFiles => {
        console.log(acceptedFiles)
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        submitUploadFile(formData);
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: 10000000
    });

    /*const files = acceptedFiles.map(file => (
        <div key={file.lastModified} className="bg-white flex-1 p-5 m-0 shadow-lg rounded-lg">
            <p className="font-bold text-xl text-center">{file.path}</p>
            <p className="text-sm text-gray-500 text-center">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </div>
    ))*/

    const submitUploadFile = async (formData) => {
        try {
            console.log(formData)
            setLoading(true)
            const response = await axios.put(`/api/users/avatar`, formData);
            if (response.data.user) {
                getProfile()
                setAvatar(response.data.user.avatar)
            }
            openNotification("Correcto", `Avatar subido correctamente`, "success")
            setLoading(false)
        } catch (e) {
            console.log(e)
            openNotification("Error", e.response.data.message, "error")
            setLoading(false)
        }
        setShowDropzone(false)
    }

    const uploaded = () => {
        if (avatar.includes("http")) {
            return <Avatar onClick={() => setShowDropzone(true)} shape="circle" style={{width: 100, height: 100}}
                           className="mx-auto text-center" src={avatar}/>
        }
        const publicRoute = process.env.REACT_APP_BACKEND_URL;
        const routeAvatar = publicRoute + '/users/avatar/' + avatar;
        return <Avatar onClick={() => setShowDropzone(true)} shape="circle" style={{width: 100, height: 100}}
                       className="mx-auto text-center"
                       src={routeAvatar}/>
    }

    return (
        <div className="w-100 p-0">
            {!showDropzone && avatar ?
                <div className="justify-content-center text-center">
                    <Tooltip title={`Cambiar Avatar`}>
                        {uploaded()}
                    </Tooltip>
                </div>
                :
                <>
                    <Spin tip={"Subiendo..."} spinning={loading}>
                        <div {...getRootProps({className: 'dropzone w-full py-32'})}>
                            <input className="h-100" {...getInputProps()}/>
                            <div className="text-center">
                                {isDragActive ?
                                    <p className="text-2xl text-center text-gray-600 px-4 py-10">
                                        <p className="ant-upload-drag-icon text-primary">
                                            <CheckOutlined style={{fontSize: 35}}/>
                                        </p>
                                        <p className="ant-upload-text text-primary">
                                            Sueltalo ahora
                                        </p>
                                    </p>
                                    : <p className="text-center text-gray-600 p-5 bg-light rounded-lg shadow"
                                         style={{borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc'}}>
                                        <p className="ant-upload-drag-icon text-primary">
                                            <PlusCircleOutlined style={{fontSize: 35}}/>
                                        </p>
                                        <p className="ant-upload-text text-primary">
                                            "Arrastra o click aquí para elegir un avatar"
                                        </p>
                                    </p>
                                }
                            </div>
                        </div>
                    </Spin>
                </>
            }

        </div>
    );
};
export default AvatarInput;