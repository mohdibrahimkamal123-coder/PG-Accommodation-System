import React, { useEffect, useState } from "react";
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

        const response = await getMyPgs(owner.ownerId);

        setPgs(response.data);

    };

    const loadRooms = async (pgId) => {

        if (!pgId) return;

        const response = await getRooms(pgId);

        setRooms(response.data);

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

        if (name === "pgId") {

            loadRooms(value);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editId) {

            await updateRoom(editId, formData);

        } else {

            await addRoom(formData);

        }

        setFormData({
            pgId: formData.pgId,
            roomType: "",
            capacity: "",
            availableBeds: "",
            rent: ""
        });

        setEditId(null);

        loadRooms(formData.pgId);

    };

    const handleEdit = (room) => {

        setEditId(room.roomId);

        setFormData(room);

    };

    const handleDelete = async (id) => {

        if (window.confirm("Delete Room ?")) {

            await deleteRoom(id);

            loadRooms(formData.pgId);

        }

    };

    return (

        <div className="container mt-4">

            <h3 className="mb-4">
                Rooms
            </h3>

            <div
                className="card p-4 mb-4"
                style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >

                <form onSubmit={handleSubmit}>

                    <div className="row g-3">

                        <div className="col-md-2">

                            <select
                                className="form-select"
                                name="pgId"
                                value={formData.pgId}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select PG
                                </option>

                                {

                                    pgs.map((pg) => (

                                        <option
                                            key={pg.pgId}
                                            value={pg.pgId}
                                        >

                                            {pg.pgName}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                        <div className="col-md-2">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Room Type"
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Available Beds"
                                name="availableBeds"
                                value={formData.availableBeds}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <input
                                type="number"
                                className="form-control"
                                placeholder="Rent"
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="col-md-2">

                            <button
                                className="btn btn-primary w-100"
                            >

                                {editId ? "Update" : "Add"}

                            </button>

                        </div>

                    </div>

                </form>

            </div>

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>

                        <th>Room Type</th>

                        <th>Capacity</th>

                        <th>Available</th>

                        <th>Rent</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        rooms.map((room) => (

                            <tr key={room.roomId}>

                                <td>{room.roomId}</td>

                                <td>{room.roomType}</td>

                                <td>{room.capacity}</td>

                                <td>{room.availableBeds}</td>

                                <td>₹ {room.rent}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(room)}
                                    >

                                        Edit

                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(room.roomId)}
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default Rooms;