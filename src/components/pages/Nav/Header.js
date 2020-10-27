import React from 'react';
import { Layout, Menu, Avatar, Badge } from 'antd';
import './Header.scss';
import './Navbar.css';

function Header() {
  const { Header } = Layout;

  return (
    <Header className="header">
      <Menu theme="dark" mode="horizontal">
        <span className="avatar-item">
          <Badge
            size="default"
            count={2}
            style={{ backgroundColor: '#a8d5f0' }}
          >
            <Avatar
              className="avatar"
              size={{ xs: 24, sm: 36, md: 48, lg: 48, xl: 48, xxl: 48 }}
              src="http://pngimg.com/uploads/dog/dog_PNG50375.png"
            />
          </Badge>
        </span>
      </Menu>
    </Header>
  );
}

export default Header;
