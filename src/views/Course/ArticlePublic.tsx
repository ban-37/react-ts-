import { ICategoryParams, TableCateoryType, categoryGet, coursePost } from '@/api/course';
import ImgUpload from '@/components/ImgUpload';
import { Button, Cascader, Form, Input, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
// 引入编辑器组件
// eslint-disable-next-line
import BraftEditor from 'braft-editor'
// 引入编辑器样式
// eslint-disable-next-line
import 'braft-editor/dist/index.css'
import { useEffect, useState } from 'react'

type Props = {}

const ArticlePublic = (props: Props) => {
  const [form] = Form.useForm();
  const [cateList, setCateList] = useState<ICategoryParams[]>([]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  const onFinish = (values: any) => {
    console.log(values);
    values.catelv1 = values.category[0];
    values.catelv2 = values.category[1];
    coursePost(values);
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
    // eslint-disable-next-line
    const handleEditor = (editorState:any) =>{
      console.log(editorState.toHTML())
      form.setFieldsValue({
        desc: editorState.toHTML(),
      })
    }
  return (
    <Form
    {...layout}
    name="control-hooks"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    form={form}
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
    {/* <Form.Item name="desc" label="课程详情" rules={[{ required: true }]}>
    <BraftEditor
      style={{ border: "1px solid #d8d8d8" }}
      onChange={ handleEditor}
      />
    </Form.Item> */}

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