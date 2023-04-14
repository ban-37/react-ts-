
import { loginFail } from '@/store/modules/user';
import { UserOutlined } from '@ant-design/icons';
import { Col, Dropdown, MenuProps, Row,  theme } from 'antd';
import { Header } from 'antd/es/layout/layout'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('click left button', e);
};



const items: MenuProps['items'] = [
  {
    label: '个人中心',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '退出登录',
    key: '2',
    icon: <UserOutlined />,
  }
];

const AppHeader = () => {
  const navigator = useNavigate()
  const dispatch = useDispatch()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick: MenuProps['onClick'] = (e) => {

    let {key} = e
    switch(key){
      case "2":{
        console.log("我退出登录了")
        navigator("/login")
        dispatch(loginFail())
      }
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div>
      <Header style={{ padding: 0, background: colorBgContainer }} />
    <Row justify="end" align="middle" style={{ height: "100%" }}>
      <Col>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
      更多
    </Dropdown.Button>
    </Col>
    </Row>
      </div>
  )
}

export default AppHeader