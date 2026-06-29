import PGCard from "./PGCard";

function FeaturedPG() {

  const pgList = [

    {
      id: 1,
      name: "Royal PG",
      city: "Noida",
      rent: 7000,
      image: "https://placehold.co/400x250"
    },

    {
      id: 2,
      name: "Green Residency",
      city: "Delhi",
      rent: 8500,
      image: "https://placehold.co/400x250"
    },

    {
      id: 3,
      name: "Elite Stay",
      city: "Pune",
      rent: 6500,
      image: "https://placehold.co/400x250"
    }

  ];

  return (

    <section className="py-5 bg-light">

      <div className="container">

        <h2 className="text-center mb-5">
          Featured PGs
        </h2>

        <div className="row">

          {pgList.map((pg) => (

            <PGCard
              key={pg.id}
              name={pg.name}
              city={pg.city}
              rent={pg.rent}
              image={pg.image}
            />

          ))}

        </div>

      </div>

    </section>

  );
}

export default FeaturedPG;