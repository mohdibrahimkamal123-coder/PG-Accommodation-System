import React, { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

const ChangePassword = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.put(`/users/change-password/${user.userId}`, {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      alert("Password Changed Successfully");

      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      alert("Unable to Change Password");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-header">
                <h3>Change Password</h3>
              </div>

              <div className="card-body">

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="oldPassword"
                      value={passwords.oldPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button className="btn btn-primary w-100">
                    Change Password
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ChangePassword;