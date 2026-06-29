import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getUserById, updateUser } from "../services/authService";

function Profile() {
  const { user, login } = useAuth();

  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    gender: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserById(user.userId);
      setProfile(res.data);
      setFormData({
        fullName: res.data.fullName,
        phone: res.data.phone,
        gender: res.data.gender
      });
    } catch {
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!formData.fullName.trim()) {
      setError("Full Name is required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      setSaving(true);

      const res = await updateUser(user.userId, formData);

      setProfile(res.data);
      login({
        userId: res.data.userId,
        fullName: res.data.fullName,
        email: res.data.email,
        role: res.data.role
      });

      setEditMode(false);
      setSuccess("Profile updated successfully.");
    } catch {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="card shadow border-0">
          <div className="card-body p-4">

            <h2 className="text-primary mb-4">My Profile</h2>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name</label>
                <input
                  className="form-control"
                  name="fullName"
                  value={editMode ? formData.fullName : profile.fullName}
                  disabled={!editMode}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={profile.email}
                  disabled
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={editMode ? formData.phone : profile.phone}
                  disabled={!editMode}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Gender</label>

                {editMode ? (
                  <select
                    className="form-select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <input
                    className="form-control"
                    value={profile.gender}
                    disabled
                  />
                )}
              </div>

              <div className="col-md-6 mb-4">
                <label className="form-label">Role</label>
                <input
                  className="form-control"
                  value={profile.role}
                  disabled
                />
              </div>

            </div>

            {!editMode ? (
              <button
                className="btn btn-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success me-2"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      fullName: profile.fullName,
                      phone: profile.phone,
                      gender: profile.gender
                    });
                  }}
                >
                  Cancel
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
