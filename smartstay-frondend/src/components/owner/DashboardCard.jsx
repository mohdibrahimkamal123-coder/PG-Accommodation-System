import React from "react";

const DashboardCard = ({ title, value }) => {

    return (

        <div className="col-md-3 mb-3">

            <div
                className="card text-center"
                style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >

                <div className="card-body">

                    <h6>

                        {title}

                    </h6>

                    <h3>

                        {value}

                    </h3>

                </div>

            </div>

        </div>

    );

};

export default DashboardCard;