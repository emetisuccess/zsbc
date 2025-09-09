import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css"; // Default Splide styling
import Hero1 from "../assets/hero_bg/1716036938.png"
import Hero2 from "../assets/hero_bg/1716037562.png"
import Hero3 from "../assets/hero_bg/1716037611.png"
import { Link } from "react-router-dom";


const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Top Class Agency Services",
      subtitle: "We Provide best agency services for students seeking admission in China.",
      img: Hero1,
    },
    {
      id: 2,
      title: "Education Is Key To Knowledge",
      subtitle: "If you think education is expensive, try illitracy.",
      img: Hero2,
    },
    {
      id: 3,
      title: "Best Agency For A Reason",
      subtitle: "We are the best and trusted agency that can give you that dream study.",
      img: Hero3,
    },
  ];

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
        {slides.map((slide) => (
          <SplideSlide key={slide.id}>
            <div className="relative w-full h-[80vh]">
              {/* Background image */}
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white px-6">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
                    {slide.subtitle}
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
        ))}
      </Splide>
    </section>
  );
}

export default Hero