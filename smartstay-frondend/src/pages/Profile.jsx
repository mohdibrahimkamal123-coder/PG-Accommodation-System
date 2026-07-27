import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserById, updateUser } from "../services/userService";

const Profile = () => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: ""
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUserById(loggedUser.userId);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(loggedUser.userId, user);
      alert("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Unable to Update Profile");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-header">
            <h3>My Profile</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Gender</label>

                <select
                  className="form-select"
                  name="gender"
                  value={user.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

              </div>

              <button className="btn btn-primary">
                Update Profile
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;