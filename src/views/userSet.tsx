
import { userUpdate } from '@/api/user';
import ImgUpload from '@/components/ImgUpload';
import { RootState } from '@/store';
import { loginUpdate } from '@/store/modules/user';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
type Props = {}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const UserSet = (props: Props) => {
    const [form] = Form.useForm();
    const {userInfo} = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const onFinish = (values: any) => {
        console.log('Success:', values);
        let userId = userInfo?.objectId
        userUpdate(userId as string,values).then((res)=>{
            console.log(res)
            // dispatch(loginUpdate({...values}))
        })
    };
    useEffect(() => {
        form.setFieldsValue(userInfo);
    }, [userInfo,form])

    
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            style={{ maxWidth: 600 }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input readOnly/>
            </Form.Item>
            <Form.Item name="avatar" label="用户头像" rules={[{ required: true }]}>
                <ImgUpload />
            </Form.Item>
            <Form.Item  {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    修改
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserSet

