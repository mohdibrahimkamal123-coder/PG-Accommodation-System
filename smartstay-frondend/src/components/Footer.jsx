import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-3">
      <div className="container text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} SmartStay. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;