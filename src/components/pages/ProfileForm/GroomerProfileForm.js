import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import produce from 'immer';

const GroomerProfileForm = ({ user }, props) => {
  const [groomerData, setGroomerData] = useState({});

  const handleChanges = e => {
    setGroomerData(
      produce(groomerData, draft => {
        Object.assign(draft, e);
      })
    );
  };
  //it seems like onFinish takes all the form data and submits it into a new object
  //so we might not even need the handleChanges and saving state for it tbh.
  const handleFinish = groomerData => {
    console.log(groomerData);
    // props.postGroomerProfile(groomerData)
  };

  return (
    <>
      <h3 className="container info">
        {user.name}, please register your Groomer Profile{' '}
      </h3>
      <div className="form-container">
        <Form
          layout="horizontal"
          className="forms"
          onValuesChange={handleChanges}
          onFinish={handleFinish}
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

export default GroomerProfileForm;
