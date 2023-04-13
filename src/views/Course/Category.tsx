import { useEffect, useState } from 'react'
import { Row, Space, Table, Col, Button, Modal, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CategoryFrom from './components/CategoryFrom';
import { ICategoryParams, TableCateoryType, categoryGet, categoryPut } from '@/api/course';



/*
*/
const Category = () => {



  const columns: ColumnsType<ICategoryParams> = [
    {
      title: "父级ID",
      dataIndex: "fatherId",
      key: "fatherId",
    },
    {
      title: "分类名称",
      dataIndex: "cateName",
      key: "cateName",
    },
    {
      title: "上架状态",
      dataIndex: "status",
      key: "status",
      render: (bool, record, index) => {
        return (
          <Switch
            checked={bool}
            onChange={() => { handlerSwitch(bool, record, index) }}
          />
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cateList, setCateList] = useState<TableCateoryType[]>([])

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


  const handlerSwitch = (bool: boolean, record: ICategoryParams, index: number) => {
    categoryPut(record.objectId as string, bool).then((res) => {
      const { fatherId } = record
      if (fatherId === "0-0") {
        cateList[index].status = !bool;
      } else {
        let fidx: number = cateList.findIndex(
          (item) => item.objectId === fatherId
        );
        cateList[fidx].children[index].status = !bool;
      }
      setCateList([...cateList]);
    })
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>Category
      <Row justify="end">
        <Col>
          <Button type='primary' onClick={() => showModal()}>添加</Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={cateList} rowKey="objectId" />
      <Modal title="课程添加" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CategoryFrom setIsModalOpen={setIsModalOpen}></CategoryFrom>
      </Modal>
    </div>
  )
}

export default Category
