import { FiCheckCircle, FiShield } from "react-icons/fi";
import { BsFileTextFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import Hero from "../layouts/Hero"
import ApplyNow from "../layouts/ApplyNow";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

const Home = () => {

  const style = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80')",
  }

  const slides = [
    {
      id: 1,
      title: "Beautiful Landscape",
      description: "Experience the serene view of nature at its best.",
      img: "https://picsum.photos/600/400?random=1",
    },
    {
      id: 2,
      title: "City Life",
      description: "Feel the vibrant energy of modern cities.",
      img: "https://picsum.photos/600/400?random=2",
    },
    {
      id: 3,
      title: "Mountain Escape",
      description: "Find peace in the majestic mountains.",
      img: "https://picsum.photos/600/400?random=3",
    },
  ];

  const options = {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 3,
    gap: 8,
    arrows: false,
    pagination: false,
    breakpoints: {
      // 1536: { perPage: 4 }, // 2K screens
      // 1280: { perPage: 4 }, // XL screens
      // 1024: { perPage: 4 }, // Laptops
      768: { perPage: 1, gap: 2, },  // Tablets
      640: { perPage: 1, gap: 2 },  // Mobile
      450: { perPage: 1, gap: 2 },  // Mobile
      350: { perPage: 1, gap: 2 },  // Mobile
      200: { perPage: 1, gap: 2 },  // Mobile
    },
    autoScroll: {
      speed: 1,
    },
  }

  const cards = [
    {
      id: 1,
      title: "Card One",
      image: "https://picsum.photos/600/400?random=1",
      description: "Find peace in the majestic mountains.",
    },
    {
      id: 2,
      title: "Card Two",
      image: "https://picsum.photos/600/400?random=2",
      description: "Find peace in the majestic mountains.",
    },
    {
      id: 3,
      title: "Card Three",
      image: "https://picsum.photos/600/400?random=3",
      description: "Find peace in the majestic mountains.",
    },
    {
      id: 4,
      title: "Card Four",
      image: "https://picsum.photos/600/400?random=3",
      description: "Find peace in the majestic mountains.",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <Hero />
      {/* What We Offer*/}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4 px-4 sm:px-6 lg:px-8 font-sans">
            What We Offer
          </h2>
          <p className="lg:text-lg font-semibold sm:text-xl text-center text-gray-600 mb-8 max-w-4xl text-lg font-sans">
            At Zhenjiang Sino Business Consultancy (ZSBC), our Admission Department is dedicated
            to facilitating the educational journey of international students who aspire to pursue academic
            excellence in China. We understand that choosing the right educational path is a crucial decision,
            and we are committed to guiding students through every step of the admission process with professionalism and expertise.
          </p>
          <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <div className="flex flex-col max-w-3xl mt-8">
              <div className="flex flex-row flex-nowrap mt-8">
                <FiShield className="text-4xl sm:text-4xl  md:text-4xl text-[#0061a1]" />
                &nbsp;&nbsp;<h2 className="text-2xl font-bold">Comprehensive Consultation:</h2>
              </div>
              <p className="overflow-x-auto mt-4 text-[20px] text-gray-500 pl-10">
                Our experienced team of education consultants provides comprehensive consultation services to prospective students. We offer insights into various academic programs, institutions, and admission requirements, helping students make informed decisions about their educational future.
              </p>
            </div>
            <div className="flex flex-col max-w-3xl mt-8">
              <div className="flex flex-row flex-nowrap mt-8">
                <FiCheckCircle className="text-4xl sm:text-4xl  md:text-4xl text-[#0061a1]" />
                &nbsp;&nbsp;
                <h2 className="text-2xl font-bold">Application Assistance</h2>
              </div>
              <p className="overflow-x-auto mt-4 text-[20px] text-gray-500 pl-10">
                ZSBC Admission Department assists students in completing and submitting their applications to universities and polytechnics in China. We ensure that all required documents are prepared and submitted accurately and on time, streamlining the application process for a smooth experience.
              </p>
            </div>
            <div className="flex flex-col max-w-3xl mt-8">
              <div className="flex flex-row flex-nowrap mt-8">
                <BsFileTextFill className="text-4xl sm:text-4xl  md:text-4xl text-[#0061a1]" />
                &nbsp;&nbsp;<h2 className="text-2xl font-bold">Scholarship Guidance</h2>
              </div>
              <p className="overflow-x-auto mt-4 text-[20px] text-gray-500 pl-10">
                Recognizing the importance of financial considerations, our team provides guidance on scholarship opportunities available for international students. We assist in identifying and applying for scholarships that align with the students' academic achievements and goals.
              </p>
            </div>
            <div className="flex flex-col max-w-3xl mt-8">
              <div className="flex flex-row flex-nowrap mt-8">
                <BiSupport className="text-4xl sm:text-4xl  md:text-4xl text-[#0061a1]" />
                &nbsp;&nbsp;<h2 className="text-2xl font-bold">Post-Arrival Support</h2>
              </div>
              <p className="overflow-x-auto mt-4 text-[20px] text-gray-500 pl-10">
                Our commitment to students extends beyond admission. We provide post-arrival support, assisting students with orientation, accommodation, and any initial challenges they may face as they begin their academic journey in China.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ApplyNow />
      <section className="py-12">
        {/* Title & Paragraph */}
        <div className="max-w-3xl mx-auto text-center mb-10 px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trending Majors
          </h2>
          <p className="text-xl text-gray-600">
            Majors for students Seeking admissions in China
          </p>
        </div>

        {/* Splide Carousel */}
        <div className="max-w-6xl mx-auto px-4">
          <Splide options={options} extensions={{ AutoScroll }}>
            {slides.map((slide) => (
              <SplideSlide key={slide.id}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-[350px]">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Description overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {slide.title}q
                    </h3>
                    <p className="text-sm text-gray-200">{slide.description}</p>
                    <Link to='/apply'>
                      <button className="px-6 py-2 bg-[#0061a1] text-white rounded-lg hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out hover:scale-110 mt-2">
                        Apply
                      </button>
                    </Link>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </section>
      <section className="py-16 px-6 md:px-1">
        <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-10 items-center">
          {/* Left Side Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Other Majors
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Other Majors for students Seeking admissions in China
            </p>
          </div>

          {/* Right Side Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.id} className="relative rounded-2xl overflow-hidden shadow-lg h-[350px]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                {/* Description overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-200">{card.description}</p>
                  <Link to='/apply'>
                    <button className="px-6 py-2 bg-[#0061a1] text-white rounded-lg hover:bg-blue-800 cursor-pointer transition duration-300 ease-in-out hover:scale-110 mt-2">
                      Apply
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Link to='/majors' className="text-2xl text-right underline">View other Majors</Link>
        </div>
      </section>
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 py-32 flex flex-col items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={style}
          ></div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-800 opacity-69"></div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-1 gap-8 justify-cente">
            {/* Video */}
            {/* Text */}
            <div className="text-white space-y-6 max-w-3xl px-16">
              <h1 className="text-4xl md:text-5xl font-bold">
                Why Choose ZSBC
              </h1>
              <div className="text-xl">
                <p><b>Expertise and Experience:</b> With years of experience in the education consultancy field, ZSBC's
                  Admission Department boasts a team of experts well-versed in the intricacies of the Chinese education
                  system.</p>
                <br />
                <p><b>Personalized Guidance:</b> We understand that every student is unique. Our consultants provide
                  personalized guidance tailored to the individual needs and aspirations of each student.</p>
                <br />
                <p><b>Strong Network:</b> ZSBC has established strong relationships with reputable universities and
                  polytechnics in China, ensuring that students have access to a diverse range of academic options.</p>
                {/*<button className="px-6 py-3 bg-[#0061a1] hover:bg-blue-700 transition rounded-full font-semibold shadow-lg">
                Get Started
              </button>*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 font-sans">
            What Students Say About Us
          </h2>
          <div className="grid grid-cols-1 gap-3 lg:grid-col-3 md:grid-cols-3 sm:grid-cols-2">
            <div className="mt-10 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex justify-start mb-6 space-x-2">
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
              </div>
              <p className="text-lg italic text-gray-700 leading-relaxed h-64">
                "I couldn't be happier with the support I received throughout the admission process. From initial
                inquiries to final acceptance, ZSBC team was incredibly responsive and helpful."
              </p>
              <div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 text-right">Levi Ganiru</h3>
              </div>
            </div>
            <div className="mt-10 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex justify-start mb-6 space-x-2">
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
              </div>
              <p className="text-lg italic text-gray-700 leading-relaxed h-64 mb-3">
                "I want to express my gratitude to the ZSBC Teams for their efficiency and professionalism. They made the daunting task of applying to college feel manageable and even enjoyable. Thanks alot."
              </p>
              <div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 text-right"> Michael Smith</h3>
              </div>
            </div>
            <div className="mt-10 bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="flex justify-start mb-6 space-x-2">
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
                <span className="w-2 h-2 bg-black p-3 rounded-full"></span>
              </div>
              <p className="text-lg italic text-gray-700 leading-relaxed h-64 mb-4">
                "I want to extend my sincere appreciation to the ZSBC staff for their unwavering support during the application process. Thanks to their efforts, I'm thrilled to be embarking on this exciting academic journey."
              </p>
              <div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800 text-right">Mark Huff</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home