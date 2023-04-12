import { ICategoryParams, categoryGet, categoryPost } from '@/api/course';
import { Button, Form, Input, Select } from 'antd';

import React, { useEffect, useState } from 'react'

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};



const CategoryFrom = () => {
    const [form] = Form.useForm();
    const [cateList, setCateList] = useState<ICategoryParams[]>([])

    useEffect(() => {
        categoryGet().then((res) => {
            const results = res.data.results
            setCateList(results)
            console.log(results)
        })
    }, [])


    const onFinish = (values: any) => {
        //新增分类
        categoryPost({...values,status: true }).then((res) => {
            console.log(res)
        })
    };

    const onReset = () => {
        form.resetFields();
    };



    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item name="cateName" label="分类名称" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="归属分类" rules={[{ required: true }]}>
                <Select
                    placeholder="请选择归属分类"
                    allowClear
                >
                    <Option value="0-0">顶级类目</Option>
                    {cateList.map((item,index) => {
                        return (<Option  key={index}
                        value={item.objectId}>
                            {item.cateName}
                        </Option>)
                    })}

                </Select>
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
            >
                {({ getFieldValue }) =>
                    getFieldValue('gender') === 'other' ? (
                        <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    ) : null
                }
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    重置
                </Button>

            </Form.Item>
        </Form>
    )
}

export default CategoryFrom