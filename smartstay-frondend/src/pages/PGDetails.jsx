import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPgById } from "../services/pgService";

function PgDetails() {

    const { id } = useParams();

    const [pg, setPg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadPg();

    }, []);

    const loadPg = async () => {

        try {

            const response = await getPgById(id);

            setPg(response.data);

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container text-center mt-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                    </div>

                    <p className="mt-3">
                        Loading PG Details...
                    </p>

                </div>

            </>

        );

    }

    if (!pg) {

        return (

            <>
                <Navbar />

                <div className="container text-center mt-5">

                    <h3>PG Not Found</h3>

                    <Link
                        to="/pgs"
                        className="btn btn-primary mt-3"
                    >
                        Back
                    </Link>

                </div>

            </>

        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <Link
                    to="/pgs"
                    className="btn btn-outline-secondary mb-4"
                >
                    ← Back
                </Link>

                <div className="card shadow">

                    <img
                        src="https://placehold.co/900x400"
                        className="card-img-top"
                        alt={pg.pgName}
                    />

                    <div className="card-body">

                        <h2>{pg.pgName}</h2>

                        <h5 className="text-muted">
                            📍 {pg.city}, {pg.state}
                        </h5>

                        <h3 className="text-primary mt-3">
                            ₹{pg.rentStarting}/month
                        </h3>

                        <p className="mt-3">
                            ⭐ {pg.rating ?? "New"}
                        </p>

                        <hr />

                        <h4>Description</h4>

                        <p>{pg.description}</p>

                        <hr />

                        <h4>Facilities</h4>

                        <ul>

                            {pg.wifiAvailable &&
                                <li>📶 WiFi</li>}

                            {pg.foodAvailable &&
                                <li>🍴 Food</li>}

                            {pg.laundryAvailable &&
                                <li>🧺 Laundry</li>}

                        </ul>

                        <hr />

                        <h4>Address</h4>

                        <p>

                            {pg.address},

                            {pg.city},

                            {pg.state}

                            -

                            {pg.pincode}

                        </p>

                        <button
                            className="btn btn-success btn-lg"
                        >
                            Book Now
                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default PgDetails;