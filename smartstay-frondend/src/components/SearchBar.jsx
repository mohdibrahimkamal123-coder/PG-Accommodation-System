function SearchBar() {
  return (
    <section className="py-5 bg-white">
      <div className="container">

        <div className="card shadow border-0 p-4">

          <h3 className="text-center mb-4">
            Search Your Perfect PG
          </h3>

          <div className="row g-3">

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter City"
              />
            </div>

            <div className="col-md-3">
              <select className="form-select">
                <option>Select Gender</option>
                <option>Boys</option>
                <option>Girls</option>
                <option>Co-Living</option>
              </select>
            </div>

            <div className="col-md-3">
              <select className="form-select">
                <option>Budget</option>
                <option>₹5000 - ₹7000</option>
                <option>₹7000 - ₹10000</option>
                <option>Above ₹10000</option>
              </select>
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100">
                Search
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;