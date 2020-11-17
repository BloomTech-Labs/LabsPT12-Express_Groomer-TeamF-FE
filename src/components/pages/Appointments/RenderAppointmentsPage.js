import React, { useEffect, useRef } from 'react';
import { Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import flatpickr from 'flatpickr';

import GroomerMap from '../../mapbox/GroomerMap';
import { log } from '../../../utils/log';

const { Option } = Select;

function RenderAppointmentsPage() {
  const $datePicker = useRef(null);
  const groomers = [
    {
      id: '1',
      groomerId: 'ce68mjqz2by3t2peo6i4',
      businessName: 'Furry Friends Grooming & Care',
      address: '2081 Robin Stravenue Apt. 490',
      email: 'Lelia77@gmail.com',
      phoneNumber: '876-403-2046',
      lat: -77.034084142948,
      lng: 38.909671288923,
    },
    {
      id: '2',
      groomerId: 'bftqzfqkq3xzj953q64r',
      businessName: "Gillian's Fine Pet Grooming",
      address: '7857 Runte Court Suite 257',
      email: 'Adele77@hotmail.com',
      phoneNumber: '725-266-0638',
      lat: -77.049766,
      lng: 38.900772,
    },
  ];

  // Init flatpickr
  useEffect(() => {
    // Render calendar
    // grey out invalid dates
    const calendar = flatpickr($datePicker.current, {
      disable: [
        // Return true to disable
        date => {
          // Is date in the past - only show future dates
          const isBeforeToday =
            new Date(date.toDateString()) < new Date(new Date().toDateString());
          return isBeforeToday;
        },
      ],
      locale: {
        firstDayOfWeek: 1, // Start week on Monday
      },
    });
  }, []);

  return (
    <>
      <div className="groomer-map form-item">
        <GroomerMap groomers={groomers} onGroomerSelect={data => log(data)} />
      </div>
      <div className="select-pet form-item input">
        <Form.Item name="pet" rules={[{ required: true }]}>
          <Select placeholder="Select Pet" onChange={log} allowClear>
            <Option value="">loading</Option>
            <Option value="Example Pet 1">Example Pet 1</Option>
            <Option value="Example Pet 2">Example Pet 2</Option>
          </Select>

          <Select placeholder="Select Service" onChange={log} allowClear>
            <Option value="">loading</Option>
            <Option value="Example Service 1">Example Service 1</Option>
            <Option value="Example Service 2">Example Service 2</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="form-item input">
        <input
          ref={$datePicker}
          onChange={date => log(date)}
          className="ant-input"
          type="text"
          placeholder="Select Date.."
        />
      </div>
    </>
  );
}

export default RenderAppointmentsPage;
