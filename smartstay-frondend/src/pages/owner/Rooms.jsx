import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
    getMyPgs,
    getRooms,
    addRoom,
    updateRoom,
    deleteRoom
} from "../../services/ownerService";

const Rooms = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [pgs, setPgs] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedPg, setSelectedPg] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        pgId: "",
        roomType: "",
        capacity: "",
        availableBeds: "",
        rent: ""
    });

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadPgs();
    }, []);

    const loadPgs = async () => {
        try {
            const response = await getMyPgs(owner.ownerId);
            setPgs(response.data);
            if (response.data.length > 0) {
                setSelectedPg(response.data[0].pgId);
                loadRooms(response.data[0].pgId);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const loadRooms = async (pgId) => {
        if (!pgId) return;
        setLoading(true);
        try {
            const response = await getRooms(pgId);
            setRooms(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "pgId") {
            setSelectedPg(value);
            loadRooms(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateRoom(editId, formData);
                alert("Room Updated Successfully");
            } else {
                await addRoom(formData);
                alert("Room Added Successfully");
            }
            resetForm();
            loadRooms(formData.pgId || selectedPg);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    const handleEdit = (room) => {
        setEditId(room.roomId);
        setFormData({
            pgId: room.pgId,
            roomType: room.roomType,
            capacity: room.capacity,
            availableBeds: room.availableBeds,
            rent: room.rent
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this room?")) {
            try {
                await deleteRoom(id);
                alert("Room Deleted Successfully");
                loadRooms(formData.pgId || selectedPg);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            pgId: formData.pgId || selectedPg,
            roomType: "",
            capacity: "",
            availableBeds: "",
            rent: ""
        });
        setEditId(null);
    };

    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .rooms-wrapper {
            display: flex;
            min-height: 100vh;
            background: #eef2f6;
        }

        .rooms-main {
            flex: 1;
            margin-left: 240px;
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
        }

        /* Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #0f172a;
            margin: 0;
            line-height: 1.15;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .page-title-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #d9f99d;
            border-radius: 50%;
            margin: 0 6px;
            vertical-align: middle;
        }

        .page-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Stats Cards */
        .stats-mini-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
            .stats-mini-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
            .stats-mini-grid {
                grid-template-columns: 1fr;
            }
        }

        .stat-mini-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.2s ease;
        }

        .stat-mini-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
        }

        .stat-mini-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }

        .stat-mini-icon.blue { background: #dbeafe; }
        .stat-mini-icon.green { background: #dcfce7; }
        .stat-mini-icon.purple { background: #eef2ff; }
        .stat-mini-icon.orange { background: #fef3c7; }

        .stat-mini-info {
            flex: 1;
        }

        .stat-mini-label {
            font-size: 0.8rem;
            color: #64748b;
            font-weight: 600;
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .stat-mini-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            line-height: 1.2;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Form Card */
        .form-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
            padding: 24px;
            margin-bottom: 24px;
        }

        .form-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f1f5f9;
        }

        .form-card-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            gap: 16px;
            align-items: end;
        }

        @media (max-width: 1024px) {
            .form-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (max-width: 640px) {
            .form-grid {
                grid-template-columns: 1fr;
            }
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .form-group label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.02em;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            text-transform: uppercase;
        }

        .form-group input,
        .form-group select {
            padding: 10px 14px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            background: #f8fafc;
            color: #0f172a;
            width: 100%;
        }

        .form-group input:focus,
        .form-group select:focus {
            outline: none;
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .form-group input::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }

        .btn-primary-premium {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.88rem;
            padding: 10px 24px;
            border-radius: 30px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
            border: none;
            cursor: pointer;
            white-space: nowrap;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            width: 100%;
            min-height: 44px;
        }

        .btn-primary-premium:hover {
            background: #1e293b;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
        }

        .btn-primary-premium.edit-mode {
            background: #4f46e5;
        }

        .btn-primary-premium.edit-mode:hover {
            background: #4338ca;
        }

        /* Table Card */
        .table-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
            overflow: hidden;
        }

        .table-card-header {
            padding: 20px 24px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-card-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-card-badge {
            background: #eef2ff;
            color: #4f46e5;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 12px;
            border-radius: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-wrap {
            overflow-x: auto;
            padding: 0 24px 24px;
        }

        .premium-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table thead th {
            padding: 16px 12px;
            font-size: 0.7rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #f1f5f9;
            text-align: left;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody td {
            padding: 16px 12px;
            color: #334155;
            font-weight: 600;
            border-bottom: 1px solid #f8fafc;
            vertical-align: middle;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody tr:hover {
            background: #f8fafc;
        }

        .premium-table tbody tr:last-child td {
            border-bottom: none;
        }

        .room-id-cell {
            font-weight: 700;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .room-type-cell {
            font-weight: 600;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .room-rent-cell {
            font-weight: 700;
            color: #4f46e5;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .room-capacity-cell,
        .room-available-cell {
            font-weight: 600;
            color: #475569;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-action {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-action.edit {
            background: #eef2ff;
            color: #4f46e5;
        }

        .btn-action.edit:hover {
            background: #c7d2fe;
            transform: scale(1.05);
        }

        .btn-action.delete {
            background: #fee2e2;
            color: #dc2626;
        }

        .btn-action.delete:hover {
            background: #fecaca;
            transform: scale(1.05);
        }

        .action-buttons {
            display: flex;
            gap: 8px;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        .empty-state-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .empty-state-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Loading */
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* PG Selector Badge */
        .pg-selector-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #eef2ff;
            color: #4f46e5;
            padding: 4px 14px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .pg-selector-badge span {
            color: #0f172a;
        }

        @media (max-width: 768px) {
            .rooms-main {
                margin-left: 0;
                padding: 16px;
            }

            .form-grid {
                grid-template-columns: 1fr;
            }

            .page-title {
                font-size: 1.5rem;
            }

            .stats-mini-grid {
                grid-template-columns: 1fr 1fr;
            }

            .table-card-header {
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }

            .action-buttons {
                flex-direction: column;
                gap: 6px;
            }

            .btn-action {
                justify-content: center;
            }

            .form-card-header {
                flex-direction: column;
                gap: 10px;
                align-items: flex-start;
            }
        }

        @media (max-width: 480px) {
            .stats-mini-grid {
                grid-template-columns: 1fr;
            }
        }
    `;

    // Calculate stats
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((acc, r) => acc + parseInt(r.capacity || 0), 0);
    const totalAvailable = rooms.reduce((acc, r) => acc + parseInt(r.availableBeds || 0), 0);
    const avgRent = totalRooms > 0 ? Math.round(rooms.reduce((acc, r) => acc + parseInt(r.rent || 0), 0) / totalRooms) : 0;

    // Get selected PG name
    const selectedPgName = pgs.find(p => p.pgId === parseInt(selectedPg))?.pgName || "";

    return (
        <div className="rooms-wrapper">
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <OwnerSidebar />

            <div className="rooms-main">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <h1 className="page-title">
                            Rooms
                            <span className="page-title-pill">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            Management
                        </h1>
                        <p className="page-subtitle">
                            Manage rooms for your PG properties
                            {selectedPgName && (
                                <span className="pg-selector-badge" style={{ marginLeft: "12px" }}>
                                    📍 <span>{selectedPgName}</span>
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-mini-grid">
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon blue">🛏️</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Total Rooms</p>
                            <p className="stat-mini-value">{totalRooms}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon green">👥</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Total Capacity</p>
                            <p className="stat-mini-value">{totalCapacity}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon purple">✅</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Available Beds</p>
                            <p className="stat-mini-value">{totalAvailable}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon orange">💰</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Avg. Rent</p>
                            <p className="stat-mini-value">₹{avgRent}</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="form-card">
                    <div className="form-card-header">
                        <h4 className="form-card-title">
                            {editId ? '✎ Update Room' : '➕ Add New Room'}
                        </h4>
                        {editId && (
                            <button 
                                className="btn-action edit" 
                                onClick={() => {
                                    setEditId(null);
                                    setFormData({
                                        pgId: formData.pgId || selectedPg,
                                        roomType: "",
                                        capacity: "",
                                        availableBeds: "",
                                        rent: ""
                                    });
                                }}
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Select PG</label>
                                <select
                                    name="pgId"
                                    value={formData.pgId || selectedPg}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select PG</option>
                                    {pgs.map((pg) => (
                                        <option key={pg.pgId} value={pg.pgId}>
                                            {pg.pgName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Room Type</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Deluxe, Standard"
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Capacity</label>
                                <input
                                    type="number"
                                    placeholder="Total seats"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>

                            <div className="form-group">
                                <label>Available Beds</label>
                                <input
                                    type="number"
                                    placeholder="Available"
                                    name="availableBeds"
                                    value={formData.availableBeds}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>

                            <div className="form-group">
                                <label>Rent (₹)</label>
                                <input
                                    type="number"
                                    placeholder="Monthly rent"
                                    name="rent"
                                    value={formData.rent}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                />
                            </div>

                            <div className="form-group" style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button 
                                    type="submit" 
                                    className={`btn-primary-premium ${editId ? 'edit-mode' : ''}`}
                                >
                                    {editId ? '✎ Update Room' : '➕ Add Room'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="table-card">
                    <div className="table-card-header">
                        <h4 className="table-card-title">
                            📋 Room List
                            <span className="table-card-badge">{rooms.length} Rooms</span>
                        </h4>
                    </div>

                    {loading ? (
                        <div style={{ padding: "40px", textAlign: "center" }}>
                            <div className="loading-spinner"></div>
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">🛏️</div>
                            <div className="empty-state-title">No Rooms Found</div>
                            <div className="empty-state-desc">
                                {selectedPg ? "Add your first room for this PG" : "Select a PG to view rooms"}
                            </div>
                        </div>
                    ) : (
                        <div className="table-wrap">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Room Type</th>
                                        <th>Capacity</th>
                                        <th>Available</th>
                                        <th>Rent</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room) => (
                                        <tr key={room.roomId}>
                                            <td className="room-id-cell">#{room.roomId}</td>
                                            <td className="room-type-cell">{room.roomType}</td>
                                            <td className="room-capacity-cell">{room.capacity}</td>
                                            <td className="room-available-cell">{room.availableBeds}</td>
                                            <td className="room-rent-cell">₹{room.rent}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn-action edit"
                                                        onClick={() => handleEdit(room)}
                                                    >
                                                        ✎ Edit
                                                    </button>
                                                    <button
                                                        className="btn-action delete"
                                                        onClick={() => handleDelete(room.roomId)}
                                                    >
                                                        ✕ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rooms;