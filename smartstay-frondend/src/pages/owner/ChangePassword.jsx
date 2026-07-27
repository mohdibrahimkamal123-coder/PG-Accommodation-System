import React, { useState } from "react";
import { changePassword } from "../../services/ownerService";

const ChangePassword = () => {

    const owner = JSON.parse(localStorage.getItem("owner"));

    const [formData, setFormData] = useState({

        oldPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {

            alert("New Password and Confirm Password do not match");

            return;

        }

        try {

            setLoading(true);

            const response = await changePassword(
                owner.ownerId,
                formData
            );

            alert(response.data);

            setFormData({

                oldPassword: "",
                newPassword: "",
                confirmPassword: ""

            });

        } catch (error) {

            alert(error.response?.data || "Something went wrong");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container mt-4">

            <div
                className="card mx-auto"
                style={{
                    maxWidth: "500px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >

                <div className="card-body">

                    <h3 className="text-center mb-4">

                        Change Password

                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Old Password

                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                New Password

                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Confirm Password

                            </label>

                            <input
                                type="password"
                                className="form-control"
                                name="confirmPassword"
                                value={formData.confirmPassword}
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

                                    ? "Updating..."

                                    : "Change Password"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default ChangePassword;