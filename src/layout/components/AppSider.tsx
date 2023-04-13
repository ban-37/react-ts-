import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import  { useEffect, useState } from 'react'
import { mainRoutes } from '@/router';
import { useNavigate ,useLocation } from 'react-router-dom';
import { IMenuType } from '@/router/type';







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
const handleMenuData = (routes:IMenuType[])=>{
    return routes.filter((item:IMenuType)=>{
        if(item.children){
            item.children = handleMenuData(item.children)
        }
        return !item.hidden
    })
}
    return (
    <div>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
    <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
    <Menu 
    theme="dark" 
    selectedKeys={[selectedKey]}
    mode="inline" 
    items={handleMenuData(mainRoutes)} 
    onClick={handlerMenu}
    openKeys={openKey}
    onOpenChange = {handOpenKey}/>
</Sider>
</div>
  )
}

export default AppSider