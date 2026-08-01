import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link import kiya
import { ownerLogin } from "../../services/ownerService";

const OwnerLogin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const response = await ownerLogin(formData);

            localStorage.setItem(
                "owner",
                JSON.stringify(response.data)
            );

            navigate("/owner/dashboard");

        } catch (err) {

            setError(
                err.response?.data || "Invalid Email or Password"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background: "#f5f5f5"
            }}
        >

            <div
                className="card p-4 shadow"
                style={{
                    width: "400px",
                    borderRadius: "10px"
                }}
            >

                <h3 className="text-center mb-4">
                    Owner Login
                </h3>

                {
                    error &&
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Email</label>

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

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Logging..."
                                : "Login"
                        }

                    </button>

                </form>

                {/* ===== Register Link Section ===== */}
                <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/owner/register" className="text-decoration-none fw-bold">
                        Register
                    </Link>
                </div>

            </div>

        </div>

    );

};

export default OwnerLogin;