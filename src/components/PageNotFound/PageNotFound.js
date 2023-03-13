import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <h2>404 - Page Not Found</h2>
            <Link to="/">Back to Home</Link>
        </>
    );
};

export default PageNotFound;
