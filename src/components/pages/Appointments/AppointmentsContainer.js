import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppointmentsHomePage from './RenderAppointmentsPage';

function AppointmentsContainer() {
  return (
    <>
      <div className="container page appointments">
        <h1 className="title">Book an Appointment</h1>
        <AppointmentsHomePage />
      </div>
    </>
  );
}

export default AppointmentsContainer;
