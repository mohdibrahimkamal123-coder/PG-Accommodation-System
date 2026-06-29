
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function UserDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="card shadow border-0">
          <div className="card-body p-5">

            <h2 className="text-primary">
              Welcome, {user.fullName} 👋
            </h2>

            <p className="text-muted mt-2">
              Manage your SmartStay account from here.
            </p>

            <hr />

            <div className="row mt-4">

              <div className="col-md-4 mb-3">
                <Link
                  to="/profile"
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 shadow-sm border-0 dashboard-card">
                    <div className="card-body text-center">
                      <i className="bi bi-person-circle display-5 text-primary"></i>

                      <h5 className="mt-3">
                        My Profile
                      </h5>

                      <p className="text-muted">
                        View and update your profile.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4 mb-3">
                <Link
                  to="/bookings"
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 shadow-sm border-0 dashboard-card">
                    <div className="card-body text-center">
                      <i className="bi bi-house-door display-5 text-success"></i>

                      <h5 className="mt-3">
                        My Bookings
                      </h5>

                      <p className="text-muted">
                        View all your bookings.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-4 mb-3">
                <Link
                  to="/wishlist"
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100 shadow-sm border-0 dashboard-card">
                    <div className="card-body text-center">
                      <i className="bi bi-heart-fill display-5 text-danger"></i>

                      <h5 className="mt-3">
                        Wishlist
                      </h5>

                      <p className="text-muted">
                        View your saved PGs.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

