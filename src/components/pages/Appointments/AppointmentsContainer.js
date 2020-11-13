import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppointmentsHomePage from './RenderAppointmentsPage';

function AppointmentsContainer() {
  return (
    <>
      <AppointmentsHomePage />
    </>
  );
}

export default AppointmentsContainer;
