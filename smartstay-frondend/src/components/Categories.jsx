function Categories() {

  const categories = [
    "Boys PG",
    "Girls PG",
    "Co-Living",
    "Hostel",
    "Single Room",
    "Shared Room"
  ];

  return (

    <section className="py-5">

      <div className="container">

        <h2 className="fw-bold text-center mb-5">
          Browse By Category
        </h2>

        <div className="row">

          {
            categories.map((item,index)=>(

              <div className="col-md-2 col-6 mb-4" key={index}>

                <div className="card shadow-sm border-0 text-center p-4">

                  <h5>{item}</h5>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </section>

  );

}

export default Categories;