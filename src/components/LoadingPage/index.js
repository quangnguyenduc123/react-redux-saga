import React from 'react';
import { HashLoader } from 'react-spinners';


const LoadingPage = ({isShow}) => {

  const style = {top: 0, zIndex: '9999', backgroundColor: ''};

  return isShow ? (
    <div style={ style }
         className="position-fixed w-100 h-100 text-center d-flex justify-content-center align-items-center bg-cyan">
      <HashLoader color="#fff"/>
    </div>
  ): null;
};

export default LoadingPage;
