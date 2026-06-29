function WhyChoose() {
  const features = [
    {
      title: "Verified PGs",
      desc: "Every PG is verified before listing."
    },
    {
      title: "Affordable Rent",
      desc: "Find PGs that fit your budget."
    },
    {
      title: "Safe & Secure",
      desc: "Secure booking and trusted owners."
    },
    {
      title: "24x7 Support",
      desc: "We're here whenever you need help."
    }
  ];

  return (
    <section className="py-5">
      <div className="container">

        <h2 className="text-center mb-5 fw-bold">
          Why Choose SmartStay?
        </h2>

        <div className="row">

          {features.map((item, index) => (

            <div className="col-md-3 mb-4" key={index}>

              <div className="card h-100 border-0 shadow text-center p-4">

                <h4 className="text-primary">
                  {item.title}
                </h4>

                <p className="text-muted mt-3">
                  {item.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChoose;