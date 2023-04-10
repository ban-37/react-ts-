import { Layout, theme } from "antd"
import AppSider from "./components/AppSider"
import { Content, Footer } from "antd/es/layout/layout"
import AppHeader from "./components/AppHeader"
import AppBreadcrumb from "./components/AppBreadcrumb"
import { Outlet } from "react-router-dom"




type Props = {}
const MainLayout = (props: Props) => {
const {
    token: { colorBgContainer },
} = theme.useToken();

 return ( 
    <Layout style={{ minHeight: '100vh' }}>
        <AppSider></AppSider>
        <Layout className="site-layout">
            <AppHeader></AppHeader>
            <Content style={{ margin: '0 16px' }}>
                <AppBreadcrumb></AppBreadcrumb>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                <Outlet></Outlet>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    </Layout>
)
}
export default MainLayout