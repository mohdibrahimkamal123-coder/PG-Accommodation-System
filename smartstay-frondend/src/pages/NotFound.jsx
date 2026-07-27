import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="container text-center mt-5">

        <h1 className="display-1 text-danger">404</h1>

        <h3>Page Not Found</h3>

        <p>
          The page you are looking for doesn't exist.
        </p>

        <Link to="/" className="btn btn-primary">
          Go To Home
        </Link>

      </div>
    </>
  );
};

export default NotFound;