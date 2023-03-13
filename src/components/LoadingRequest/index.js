import React from 'react';
import { BarLoader } from 'react-spinners';

const LoadingRequest = ({ isShow }) => {
  return isShow ? (
    <div style={{ top: 0, zIndex: '9999', height : '100%' }} className="position-fixed w-100">
      <BarLoader color="red" width={100} widthUnit={'%'} height={3} />
    </div>
  ) : null;
};

export default LoadingRequest;
