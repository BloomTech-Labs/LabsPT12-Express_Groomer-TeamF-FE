import React from 'react';

const Popup = ({ feature }) => {
  const { id, businessName } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <p>Groomer</p>
      <h4>{businessName}</h4>
    </div>
  );
};

export default Popup;
