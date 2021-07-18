import React, { useState, useCallback } from 'react';

const withModalDeleteWindow = (Wrapped) => {

  return (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = useCallback(() => setIsModalVisible(true), []);

    const hideModal = useCallback(() => setIsModalVisible(false), []);

    return (
      <Wrapped 
        isModalVisible={isModalVisible}
        showModal={showModal}
        hideModal={hideModal}
        {...props}/>
    );
  }
};

export default withModalDeleteWindow;