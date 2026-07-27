import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting SmartStay.");

    setContact({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-8">

            <div className="card shadow">

              <div className="card-header">
                <h3>Contact Us</h3>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={contact.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={contact.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      value={contact.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Message</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="message"
                      value={contact.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button className="btn btn-primary">
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Contact;