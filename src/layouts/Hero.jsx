import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Default Splide styling
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/logos/zsbc_icon.png";



const Hero = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    async function fetchHeroes() {
      await fetch(`${import.meta.env.VITE_BASE_URL}/user/heroes`)
        .then((res) => res.json())
        .then((data) => {
          setHeroes(data.heroes);
        })
        .catch((e) => {
          console.log(e.error);
        })
    }
    fetchHeroes();
  }, []);


  const options = {
    type: "loop",
    autoplay: true,
    interval: 10000,
    pauseOnHover: true,
    arrows: false,
    pagination: true,
    speed: 4000,
  }


  return (
    <section className="relative w-full">
      <Splide
        options={options}
        aria-label="Hero Carousel"
      >
        {heroes.length > 0 ? heroes.map((slide) => (
          <SplideSlide key={slide.id}>
            <div className="relative w-full h-[90vh]">
              {/* Background image */}
              <img
                src={slide.hero_image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h1 className="text-5xl max-w-6xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
                    {slide.sub_title}
                  </p>
                  <Link to='/contact'>
                    <button className="px-6 py-2 bg-[#0061a1] text-white rounded-lg hover:bg-blue-800 text-xl cursor-pointer transition duration-300 ease-in-out hover:scale-110 mt-2">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SplideSlide>
        )) :
          <SplideSlide>
            <div className="relative w-full h-[80vh] bg-gray-300 shadow animate-pulse">
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              </div>
            </div>
          </SplideSlide>
        }
      </Splide>
    </section >
  );
}

export default Hero