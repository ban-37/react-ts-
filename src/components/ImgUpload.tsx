import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';
import Cloud from "leancloud-storage";


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
type Props = {
    onChange?: (url: string) => void;
    value?: string;
}
const ImgUpload = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleUpload = (info: any) => {
        setLoading(true)
        getBase64(info.file, (base64) => {
            const cloudFile = new Cloud.File("fx.png", { base64 }); //构建LeanCloud资源对象
            cloudFile.save().then((res: any) => {
                //上传图片
                console.log(res);
                let { url } = res.attributes;
                setImageUrl(url);
                setLoading(false)
                props.onChange!(url);
            });
        })
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                name="avatar"
                listType="picture"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={handleUpload}
            >
                {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                    uploadButton
                )}
                <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
        </>
    )
}

export default ImgUpload
