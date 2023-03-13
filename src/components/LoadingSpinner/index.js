import React from 'react';
import { PulseLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="animated w-100 h-100 fadeIn text-center d-flex justify-content-center">
      <PulseLoader color="#29ABE2" />
    </div>
  );
};

export default LoadingSpinner;
