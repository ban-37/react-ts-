import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import  { useEffect, useState } from 'react'
import { mainRoutes } from '@/router';
import { useNavigate ,useLocation } from 'react-router-dom';


type MenuItem = Required<MenuProps>['items'][number];


const items: MenuItem[] =mainRoutes


function AppSider() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState<string>("dashboard")
    const [openKey, setOpenKey] = useState<Array<string>>([]);
    const handOpenKey = (arr:Array<string>) =>{
    console.log(arr)
    setOpenKey(arr)
    }
    const handlerMenu = ({key}:{key:string}) => {
        navigate(key)
        setSelectedKey(key)
    }
    useEffect(()=>{
        setSelectedKey(location.pathname)
        let open = location.pathname.split("/")[1]
        setOpenKey([`/${open}`])
    },[location])

    return (
    <div>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
    <Menu 
    theme="dark" 
    selectedKeys={[selectedKey]}
    mode="inline" 
    items={items} onClick={handlerMenu}
    openKeys={openKey}
    onOpenChange = {handOpenKey}/>
</Sider>
</div>
  )
}

export default AppSider