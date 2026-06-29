function Hero() {
  return (
    <section className="bg-light py-5">
      <div className="container">

        <div className="row align-items-center">

          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">
              Find Your Perfect PG with SmartStay
            </h1>

            <p className="lead mt-3">
              Discover verified PGs with affordable rent, modern amenities,
              and secure booking.
            </p>

            <div className="mt-4">
              <button className="btn btn-primary btn-lg me-3">
                Explore PGs
              </button>

              <button className="btn btn-outline-dark btn-lg">
                Learn More
              </button>
            </div>
          </div>

          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              src="https://placehold.co/600x400"
              className="img-fluid rounded shadow"
              alt="Hero"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;