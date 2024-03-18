import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={'https://res.cloudinary.com/dafnboluf/image/upload/v1710787159/5203299_nw0mxc.jpg'} alt="Error" className="w-[400px] mb-4" />
      <h1 className="text-4xl font-bold text-richblack-5 mb-2">Error 404</h1>
      <p className="text-lg text-richblack-200 mb-4">Page not found</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
