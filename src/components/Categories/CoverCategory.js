import React, {useCallback, useState} from 'react';
import {Image, Spin, Tooltip} from "antd";
import {PlusCircleOutlined, CheckOutlined} from '@ant-design/icons';
import {useDropzone} from "react-dropzone";
import {openMessageInfo} from "../../config/alerts";
import {getRouteImage} from "../../config/format";

const CoverInput = ({onChangeImage, src, category}) => {
    const [prev, setPrev] = useState('');
    const cover = src

    const [showDropzone, setShowDropzone] = useState(false);
    const [loading] = useState(false);

    const onDropRejected = () => {
        openMessageInfo("warning", "No es posible subir el archivo");
    }

    const onDropAccepted = useCallback(async acceptedFiles => {
        console.log(acceptedFiles)
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        onChangeImage('image', acceptedFiles[0]);

        let f = acceptedFiles[0]
        const reader = new FileReader();
        reader.onload = (function (file) {
            return function (e) {
                setPrev(e.target.result)
            };
        })(f);
        reader.readAsDataURL(f);
        setShowDropzone(false)
        // eslint-disable-next-line
    }, []);

    // eslint-disable-next-line
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxSize: 10000000
    });

    const uploaded = () => {
        if (prev) {
            return <Image width={300} onClick={() => setShowDropzone(true)} shape="circle"
                          className="mx-auto text-center rounded-sm" src={prev}/>
        } else {
            const route = cover && cover === category ? getRouteImage(cover, 'categories', 'cover') : getRouteImage(cover, 'groups', 'cover')
            return <Image width={300} onClick={() => setShowDropzone(true)} shape="circle"
                          className="mx-auto text-center rounded-sm" src={route}/>
        }
    }

    return (
        <div className="w-100 p-0 mb-3">
            {!showDropzone && (prev || src) ?
                <div className="justify-content-center text-center">
                    <Tooltip title={`Cambiar Imagen`}>
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
                                    :
                                    <p className="text-center text-gray-600 p-5 site-card-border-less-wrapper-light rounded-lg shadow"
                                       style={{borderStyle: 'dashed', borderWidth: 1, borderColor: '#ccc'}}>
                                        <p className="ant-upload-drag-icon text-primary">
                                            <PlusCircleOutlined style={{fontSize: 35}}/>
                                        </p>
                                        <p className="ant-upload-text text-primary">
                                            Arrastra o click aquí para elegir una imagen de grupo
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
export default CoverInput;