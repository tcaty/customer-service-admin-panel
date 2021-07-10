import React, { useState } from 'react';

const withValue = (Wrapped) => {
  
  return (props) => {
    
    const [value, setValue] = useState('');

    const handleChange = ({ target: { value } }) => {
      setValue(value);
      props.onChange(value);
    };

    return <Wrapped {...props} handleChange={handleChange} value={value}/>;
  }
}

export default withValue;