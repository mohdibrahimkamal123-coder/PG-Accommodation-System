import React, { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile
} from "../../services/ownerService";

const Profile = () => {

    const owner = JSON.parse(localStorage.getItem("owner"));

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await getProfile(owner.ownerId);

            setFormData(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await updateProfile(
                owner.ownerId,
                formData
            );

            alert(response.data);

            localStorage.setItem(
                "owner",
                JSON.stringify({
                    ...owner,
                    fullName: formData.fullName,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber
                })
            );

        } catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );

    }

    return (

        <div className="container mt-4">

            <div
                className="card mx-auto"
                style={{
                    maxWidth: "600px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >

                <div className="card-body">

                    <h3 className="mb-4 text-center">

                        My Profile

                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label className="form-label">

                                Full Name

                            </label>

                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Mobile Number

                            </label>

                            <input
                                type="text"
                                name="mobileNumber"
                                className="form-control"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-primary w-100"
                        >

                            Update Profile

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default Profile;