import { ICategoryParams, TableCateoryType, categoryGet } from '@/api/course';
import ImgUpload from '@/components/ImgUpload';
import { Button, Cascader, Form, Input, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import React, { useEffect, useState } from 'react'

type Props = {}

const ArticlePublic = (props: Props) => {
  const [cateList, setCateList] = useState<ICategoryParams[]>([]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  useEffect(() => {

    const getCateList = () => {
      categoryGet({}).then((res) => {
        const { results } = res.data
        let arr = results.filter(
          (item: ICategoryParams) => item.fatherId === "0-0"
        );
        // 将符条件的子项复制到父数组中
        arr.forEach((item: TableCateoryType) => {
          item.children = results.filter((Item: ICategoryParams) => {
            return Item.fatherId === item.objectId
          })
        })
        setCateList(arr)
      })
    }
      getCateList()
    },[])

  return (
    <Form
    {...layout}
    name="control-hooks"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
  >
    <Form.Item name="name" label="课程名称" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="info" label="课程简介" rules={[{ required: true }]}>
      <TextArea />
    </Form.Item>
    <Form.Item name="category" label="归属分类" rules={[{ required: true }]}>
    <Cascader
    options={cateList}
    fieldNames={{ label: "cateName", value: "objectId" }}
    placeholder="请选择归属分类"/>
    </Form.Item>
    <Form.Item name="isvip" label="是否收费" valuePropName="checked" rules={[{ required: true }]}>
      <Switch/>
    </Form.Item>
    <Form.Item name="poster" label="课程封面" rules={[{ required: true }]}>
    <ImgUpload></ImgUpload>
    </Form.Item>
    <Form.Item name="desc" label="课程详情" rules={[{ required: true }]}>
      <div>富文本编辑器</div>
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        提交
      </Button>
      <Button htmlType="button" >
        重置
      </Button>
    </Form.Item>
  </Form>
);
  
}

export default ArticlePublic