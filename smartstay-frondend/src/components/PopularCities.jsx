function PopularCities() {

    const cities=[
        "Delhi",
        "Noida",
        "Pune",
        "Mumbai",
        "Hyderabad",
        "Bangalore"
    ];

    return(

        <section className="bg-light py-5">

            <div className="container">

                <h2 className="text-center fw-bold mb-5">
                    Popular Cities
                </h2>

                <div className="row">

                    {
                        cities.map((city,index)=>(

                            <div className="col-md-4 mb-4" key={index}>

                                <div className="card border-0 shadow text-center p-5">

                                    <h3>{city}</h3>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default PopularCities;