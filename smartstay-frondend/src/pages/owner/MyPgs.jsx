import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
    getMyPgs,
    addPg,
    updatePg,
    deletePg
} from "../../services/ownerService";

const MyPgs = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState("");

    // Image file & preview state
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [formData, setFormData] = useState({
        ownerId: owner?.ownerId || "",
        pgName: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        rentStarting: "",
        foodAvailable: false,
        wifiAvailable: false,
        laundryAvailable: false,
        imageUrl: "" // Existing image URL agar server se aa raha ho
    });

    useEffect(() => {
        loadPgs();
    }, []);

    const loadPgs = async () => {
        try {
            const response = await getMyPgs(owner?.ownerId);
            setPgs(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    // Image selection handler
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // Local preview ke liye
        }
    };

    const resetForm = () => {
        setFormData({
            ownerId: owner?.ownerId || "",
            pgName: "",
            description: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            rentStarting: "",
            foodAvailable: false,
            wifiAvailable: false,
            laundryAvailable: false,
            imageUrl: ""
        });
        setImageFile(null);
        setImagePreview("");
        setEditId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Debug
        console.log("Form Data:", formData);
        console.log("Image File:", imageFile);
        if (editId) {
            // Update PG
            await updatePg(editId, formData);
            alert("PG Updated Successfully");} 
        else {
            // Add PG
            await addPg(formData, imageFile);
            alert("PG Added Successfully");
}
        resetForm();
        loadPgs();} 
        catch (error) {
        console.error(error);

        if (error.response) {
            alert(error.response.data);
        } else {
            alert("Something went wrong");
        }
    }
};

    const handleEdit = (pg) => {
        setEditId(pg.pgId);
        setFormData({
            ownerId: pg.ownerId,
            pgName: pg.pgName,
            description: pg.description,
            address: pg.address,
            city: pg.city,
            state: pg.state,
            pincode: pg.pincode,
            rentStarting: pg.rentStarting,
            foodAvailable: pg.foodAvailable,
            wifiAvailable: pg.wifiAvailable,
            laundryAvailable: pg.laundryAvailable,
            imageUrl: pg.imageUrl || ""
        });
        
        // Agar pehle se koi image link hai to preview dikhana
        setImagePreview(pg.imageUrl || "");
        setImageFile(null);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this PG ?");
        if (!confirmDelete) return;
        try {
            await deletePg(id);
            alert("PG Deleted Successfully");
            loadPgs();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredPgs = pgs.filter((pg) =>
        pg.pgName.toLowerCase().includes(search.toLowerCase()) ||
        pg.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <OwnerSidebar />
            <div
                style={{
                    marginLeft: "260px",
                    padding: "25px",
                    background: "#f8f9fa",
                    minHeight: "100vh"
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>My PGs</h2>
                        <p className="text-muted mb-0">
                            Manage all your PGs
                        </p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                    >
                        + Add PG
                    </button>
                </div>

                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by PG Name or City"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className="card shadow border-0 mb-4">
                        <div className="card-body">
                            <h4 className="mb-4">
                                {editId ? "Update PG" : "Add New PG"}
                            </h4>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">PG Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pgName"
                                            value={formData.pgName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Pincode</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Starting Rent (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="rentStarting"
                                            value={formData.rentStarting}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Image Input Section */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Upload Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    {/* Image Preview Box */}
                                    <div className="col-md-6 mb-3">
                                        {imagePreview && (
                                            <div>
                                                <label className="form-label d-block">Preview</label>
                                                <img
                                                    src={imagePreview}
                                                    alt="PG Preview"
                                                    style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="form-check mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="foodAvailable"
                                                name="foodAvailable"
                                                checked={formData.foodAvailable}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="foodAvailable"
                                            >
                                                Food Available
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="form-check mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="wifiAvailable"
                                                name="wifiAvailable"
                                                checked={formData.wifiAvailable}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="wifiAvailable"
                                            >
                                                WiFi Available
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div className="form-check mt-4">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="laundryAvailable"
                                                name="laundryAvailable"
                                                checked={formData.laundryAvailable}
                                                onChange={handleChange}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="laundryAvailable"
                                            >
                                                Laundry Available
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-12 text-end mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-2"
                                            onClick={resetForm}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            {editId ? "Update PG" : "Add PG"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h4 className="mb-3">PG List</h4>
                        {loading ? (
                            <div className="text-center">
                                <div className="spinner-border text-primary"></div>
                            </div>
                        ) : filteredPgs.length === 0 ? (
                            <div className="alert alert-warning text-center">
                                No PG Found
                            </div>
                        ) : (
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>PG Name</th>
                                        <th>City</th>
                                        <th>Rent</th>
                                        <th>Food</th>
                                        <th>WiFi</th>
                                        <th>Laundry</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPgs.map((pg) => (
                                        <tr key={pg.pgId}>
                                            <td>{pg.pgId}</td>
                                            <td>
                                                <img
                                                    src={pg.imageUrl || "https://via.placeholder.com/60"}
                                                    alt={pg.pgName}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                                                />
                                            </td>
                                            <td>{pg.pgName}</td>
                                            <td>{pg.city}</td>
                                            <td>₹ {pg.rentStarting}</td>
                                            <td>
                                                {pg.foodAvailable ? (
                                                    <span className="badge bg-success">Yes</span>
                                                ) : (
                                                    <span className="badge bg-danger">No</span>
                                                )}
                                            </td>
                                            <td>
                                                {pg.wifiAvailable ? (
                                                    <span className="badge bg-success">Yes</span>
                                                ) : (
                                                    <span className="badge bg-danger">No</span>
                                                )}
                                            </td>
                                            <td>
                                                {pg.laundryAvailable ? (
                                                    <span className="badge bg-success">Yes</span>
                                                ) : (
                                                    <span className="badge bg-danger">No</span>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    onClick={() => handleEdit(pg)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(pg.pgId)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPgs;