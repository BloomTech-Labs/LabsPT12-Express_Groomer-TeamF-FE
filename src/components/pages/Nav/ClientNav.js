import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Button, Row, Typography } from 'antd';
import { useOktaAuth } from '@okta/okta-react';

import './Navbar.css';

import {
  UserOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  SettingFilled,
  SearchOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

function ClientNav(props) {
  const { Title } = Typography;

  const { authService } = useOktaAuth();

  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={'lg'}
      collapsedWidth={0}
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
      <div className="logo">
        <Title className="welcome" level={4}>
          Express Groomers
        </Title>
      </div>
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
        <Menu.Item key="2" icon={<SearchOutlined />}>
          <NavLink to="/search" className="nav-text">
            Search for Groomers
          </NavLink>
        </Menu.Item>

        <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
          <Menu.Item key="3">
            <NavLink to="/profile" className="nav-text">
              Profile
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/pets" className="nav-text">
              Pets
            </NavLink>
          </Menu.Item>
          <Menu.Item key="5">
            <NavLink to="/savedgroomers" className="nav-text">
              Saved Groomers
            </NavLink>
          </Menu.Item>
        </SubMenu>
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
          >
            Logout
          </Button>
        </Row>
      </Menu>
    </Layout.Sider>
  );
}

export default ClientNav;
