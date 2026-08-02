import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ownerRegister } from "../services/ownerService"; 

const OwnerRegister = () => {
    const navigate = useNavigate();

    // Backend DTO (OwnerRegisterRequest) key names se match kar diya gaya hai
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend Password validation (min 6 chars required by backend)
        if (formData.password.length < 6) {
            setError("Password must contain at least 6 characters!");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await ownerRegister(formData);
            setSuccess("Registration successful! Redirecting to login...");
            
            setTimeout(() => {
                navigate("/owner/login");
            }, 2000);

        } catch (err) {
            // Spring Boot validation errors array handle karne ke liye
            if (err.response?.data?.errors) {
                setError(Object.values(err.response.data.errors).join(", "));
            } else if (typeof err.response?.data === 'string') {
                setError(err.response.data);
            } else {
                setError(err.response?.data?.message || "Registration failed! Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#f5f5f5" }}
        >
            <div
                className="card p-4 shadow"
                style={{ width: "400px", borderRadius: "10px" }}
            >
                <h3 className="text-center mb-4">Owner Register</h3>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-control"
                            placeholder="Enter Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Phone</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password (Min 6 characters)"
                            value={formData.password}
                            onChange={handleChange}
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-2"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/owner/login" className="text-decoration-none fw-bold">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OwnerRegister;