

import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, } from '@ant-design/pro-components';
import { Button, Tag, Image } from 'antd';
import { ICourseType, courseGet } from '@/api/course';
import {  useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {}


const columns: ProColumns<ICourseType>[] = [
    {
        dataIndex: "objectId",
        title: "课程ID",
    },
    {
        dataIndex: "name",
        title: "课程名称",
        copyable: true,
        ellipsis: true,
    },
    {
        dataIndex: "info",
        title: "课程简介",
        copyable: true,
        ellipsis: true,
    },
    {
        dataIndex: "isvip",
        title: "是否VIP",
        valueType: "select",
        valueEnum: {
            2: {
                text: "所有课程",
            },
            1: {
                text: "VIP课程",
            },
            0: {
                text: "免费课程",
            },
        },
        render: (bool, record) => {
            let color = record.isvip ? "blue" : "grey";
            return <Tag color={color}>{record.isvip ? "VIP课程" : "免费课程"}</Tag>;
        },
    },
    {
        dataIndex: "poster",
        title: "课程封面",
        hideInSearch: true,
        render: (poster) => {
            return <Image src={poster as string} height={50} />;
        },
    },
    {
        title: "操作",
        valueType: "option",
        key: "option",
        render: (text, record, _, action) => [
            <span key="editable">编辑</span>,
            <span rel="noopener noreferrer" key="view">
                查看
            </span>
        ],
    },
];

const ArticleList = (props: Props) => {
    const navigator = useNavigate()
    const ref = useRef<ActionType>();
    useEffect(() => {
        if (ref.current) {
            console.log(ref.current);
        }
    }, []);
    return (
        <ProTable<ICourseType>
            columns={columns}
            actionRef={ref}
            request={async (params, sorter, filter) => {
                // 表单搜索项会从 params 传入，传递给后端接口。
                let res = await courseGet(params);
                console.log(params, sorter, filter);
                return {
                    data: res.data.results,
                };
            }}
            rowKey="objectId"
            pagination={{
                showQuickJumper: true,
            }}
            search={{
                labelWidth: "auto",
            }}
            dateFormatter="string"
            toolbar={{
                title: '高级表格',
                tooltip: '这是一个标题提示',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            toolBarRender={() => [
                <Button onClick={()=>{
                    navigator("/course/artpub")
                }} type="primary" key="primary">
                    新增课程
                </Button>
            ]}
        />
    )
}

export default ArticleList