import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useState } from 'react'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
type Props = {}

function AppSider({}: Props) {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
</Sider>
</div>
  )
}

export default AppSider