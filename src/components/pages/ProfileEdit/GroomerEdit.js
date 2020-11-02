import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import produce from 'immer';

const GroomerEdit = ({ user, setProfileEdit, profileEdit }) => {
  const [groomerData, setGroomerData] = useState({});

  console.log('in edit', user);

  //onFinish is a Antd Form's function that comes integrated that takes all the data on the form
  //and passes it as key value pairs nested inside an object, so just using the event that's returned
  //will be enough to sent the data to redux. no need to even keep track of state "manually".
  const handleFinish = e => {
    setProfileEdit(false);
    profileEdit(e, 'editing');
    console.log(e);
    // props.postGroomerProfile(groomerData)
  };

  //in case we want to use each individual piece of input from the form we can use handleChanges,
  //and keep track of state, but onFinish from Antd Form component takes care of submiting the data on the form.
  const handleChanges = e => {
    console.log('bb');
    setGroomerData(
      produce(groomerData, draft => {
        Object.assign(draft, e);
      })
    );
  };

  return (
    <>
      BBBBBBBBBBB
      <h3 className="container name">{user.name}, change your profile </h3>
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
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="preferred_username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="family_name" label="Other Info">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 50 }}
            >
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default GroomerEdit;
