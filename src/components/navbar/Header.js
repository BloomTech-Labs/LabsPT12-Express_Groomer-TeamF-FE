import React from 'react';
import { Layout, Menu, Avatar, Badge } from 'antd';

function Header() {
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="header-container">
        <div className="title">
          <h2>Express Groomers</h2>
        </div>
        <div className="header-right">
          <Menu theme="dark" mode="horizontal">
            <span className="avatar-item">
              <Badge count={2} style={{ backgroundColor: '#a8d5f0' }}>
                <Avatar
                  className="avatar"
                  size={38}
                  src="http://pngimg.com/uploads/dog/dog_PNG50375.png"
                />
              </Badge>
            </span>
          </Menu>
        </div>
      </div>
    </Header>
  );
}

export default Header;
