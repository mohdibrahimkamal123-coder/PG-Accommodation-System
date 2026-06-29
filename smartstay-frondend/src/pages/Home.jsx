import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import FeaturedPG from "../components/FeaturedPG";
import PopularCities from "../components/PopularCities";
import WhyChoose from "../components/WhyChoose";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <Categories />
      <PopularCities />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;