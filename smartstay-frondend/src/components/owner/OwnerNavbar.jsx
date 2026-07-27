import React from "react";

const OwnerNavbar = () => {

    const owner = JSON.parse(localStorage.getItem("owner"));

    return (

        <nav
            className="navbar navbar-light bg-white shadow-sm px-4"
        >

            <h4 className="m-0">

                Owner Panel

            </h4>

            <div>

                Welcome,

                <strong className="ms-2">

                    {owner?.fullName}

                </strong>

            </div>

        </nav>

    );

};

export default OwnerNavbar;