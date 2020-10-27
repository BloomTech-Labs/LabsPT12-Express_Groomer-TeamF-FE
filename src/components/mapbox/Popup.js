import React from 'react';

const Popup = ({ feature }) => {
  const { id, businessName } = feature.properties;

  return (
    <div id={`popup-${id}`}>
      <h3>Groomer</h3>
      <h4>{businessName}</h4>
    </div>
  );
};

export default Popup;
