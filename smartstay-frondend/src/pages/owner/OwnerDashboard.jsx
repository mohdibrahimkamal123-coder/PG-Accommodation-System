import React, { useEffect, useState } from "react";
import { getDashboard } from "../../services/ownerService";
import OwnerSidebar from "../../components/owner/OwnerSidebar";

const OwnerDashboard = () => {
  const owner = JSON.parse(localStorage.getItem("owner"));

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard(owner.ownerId);
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <OwnerSidebar />
        <div
          style={{
            marginLeft: "260px",
            padding: "30px",
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          <div className="spinner-border text-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <OwnerSidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "25px",
          background: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <h2 className="mb-4">
          Welcome, {dashboard.fullName || owner.fullName}
        </h2>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center">
                <h6>Total PGs</h6>
                <h2>{dashboard.totalPGs || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center">
                <h6>Total Rooms</h6>
                <h2>{dashboard.totalRooms || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center">
                <h6>Pending Bookings</h6>
                <h2>{dashboard.pendingBookings || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "12px" }}
            >
              <div className="card-body text-center">
                <h6>Total Bookings</h6>
                <h2>{dashboard.totalBookings || 0}</h2>
              </div>
            </div>
          </div>

        </div>

        <div className="row">

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5>Room Status</h5>
                <hr />

                <p>
                  Occupied Rooms
                  <span className="float-end fw-bold">
                    {dashboard.occupiedRooms || 0}
                  </span>
                </p>

                <p>
                  Available Rooms
                  <span className="float-end fw-bold">
                    {dashboard.availableRooms || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5>Booking Status</h5>
                <hr />

                <p>
                  Approved
                  <span className="float-end fw-bold">
                    {dashboard.approvedBookings || 0}
                  </span>
                </p>

                <p>
                  Pending
                  <span className="float-end fw-bold">
                    {dashboard.pendingBookings || 0}
                  </span>
                </p>

                <p>
                  Rejected
                  <span className="float-end fw-bold">
                    {dashboard.rejectedBookings || 0}
                  </span>
                </p>

                <p>
                  Completed
                  <span className="float-end fw-bold">
                    {dashboard.completedBookings || 0}
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default OwnerDashboard;