import React from 'react';

import './order-details-row.css';

const OrderDetailsRow = ({ fieldName, fieldValue }) => {
  return (
    <div className="order-details-row">
      <div className="order-details-row__field-value">{fieldValue}</div>
      <div className="order-details-row__field-name">{fieldName}</div>
    </div>
  );
};

export default OrderDetailsRow;