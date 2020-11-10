import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Button, Row, Typography } from 'antd';
import { useOktaAuth } from '@okta/okta-react';

import {
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  SettingFilled,
} from '@ant-design/icons';

function GroomerNav(props) {
  const { Title } = Typography;

  const { authService } = useOktaAuth();

  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={'lg'}
      collapsedWidth={0}
      height={'200vh'}
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: '100vh',
      }}
    >
      <Menu
        theme="dark"
        onClick={props.handleClick}
        mode="inline"
        inlineCollapsed={props.collapsed}
        defaultSelectedKeys={[`${props.highlight}`]}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/" className="nav-text">
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <NavLink to="/profile-page" className="nav-text">
            Profile
          </NavLink>
        </Menu.Item>

        <Menu.Item key="6" icon={<ClockCircleOutlined />} title="Appointments">
          <NavLink to="/appointments" className="nav-text">
            Appointments
          </NavLink>
        </Menu.Item>
        <Menu.Item key="9" icon={<SettingFilled />}>
          <NavLink to="/settings" className="nav-text">
            Settings
          </NavLink>
        </Menu.Item>

        <Row
          justify="center"
          style={{ marginTop: '20px', marginBottom: '20px' }}
        >
          <Button
            ghost
            onClick={() => authService.logout()}
            style={{ fontWeight: '400' }}
            className="logout-button"
          >
            Logout
          </Button>
        </Row>
      </Menu>
    </Layout.Sider>
  );
}

export default GroomerNav;
