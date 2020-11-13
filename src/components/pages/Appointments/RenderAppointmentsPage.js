import React from 'react';
import { useSelector } from 'react-redux';

import GroomerMap from '../../mapbox/GroomerMap';
import { log } from '../../../utils/log';

function RenderAppointmentsPage() {
  const userData = useSelector(state => state.postProfileReducer.userData);

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

  return (
    <>
      <div className="container page appointments">
        <h1 className="title">Book an Appointment</h1>
        <div className="groomer-map">
          <GroomerMap groomers={groomers} onGroomerSelect={data => log(data)} />
        </div>
      </div>
    </>
  );
}

export default RenderAppointmentsPage;
