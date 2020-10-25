import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import produce from 'immer';

const ClientProfileForm = ({ user }) => {
  const [groomerData, setGroomerData] = useState({});

  const handleChanges = e => {
    setGroomerData(
      produce(groomerData, draft => {
        Object.assign(draft, e);
      })
    );
  };

  return (
    <>
      <div style={{ margin: '0 auto' }}>CLIENT</div>
      <div className="form-container">
        <Form
          layout="horizontal"
          className="forms"
          onValuesChange={handleChanges}
          style={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Form.Item name="name" label="Name" initialValue={user.name}>
            <Input />
          </Form.Item>
          <Form.Item name="last name" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="pic" label="Profile Pic">
            <Input />
          </Form.Item>
          <Form.Item label="Field">
            <Form.Item name="field" noStyle>
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 50 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ClientProfileForm;
