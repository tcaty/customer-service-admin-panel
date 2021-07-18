import React from 'react';

import { DDPlanetServiceConsumer } from '../ddplanet-service-context';

const withDDPlanetService = (Wrapped) => {

  return (props) => {
    
    return (
      <DDPlanetServiceConsumer>
        {
          value => <Wrapped ddPlanetService={value} {...props}/>
        }
      </DDPlanetServiceConsumer>
    )
  };
};

export default withDDPlanetService;