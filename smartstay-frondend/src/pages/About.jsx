import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-body">

            <h2>About SmartStay</h2>

            <hr />

            <p>
              SmartStay is a PG Accommodation System developed to simplify
              the process of searching, booking and managing Paying Guest
              accommodations.
            </p>

            <p>
              Users can search PGs, view details, make bookings, manage
              their profile, add reviews and maintain a wishlist.
            </p>

            <p>
              Owners can manage PGs and rooms while administrators can
              monitor the complete platform.
            </p>

            <h5>Technology Stack</h5>

            <ul>
              <li>React.js</li>
              <li>Spring Boot</li>
              <li>Spring Data JPA</li>
              <li>Hibernate</li>
              <li>MySQL</li>
              <li>Bootstrap</li>
            </ul>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default About;