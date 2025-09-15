import React from 'react'
import Breadcrum from "../layouts/Breadcrum"

const Majors = () => {

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
    <div>
      <Breadcrum heading={`Majors`} page_title={`Majors`} />
      <section className="py-16 px-6 md:px-1">
        <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-10 items-center">
          {/* Left Side Text */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Majors
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Available Majors for students Seeking admissions in China
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
                  <button className="px-6 py-2 bg-[#0061a1] text-white rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out hover:scale-110 mt-2">
                    <a href='/apply'>Apply</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <a href='javascript:0' className="text-2xl text-right underline">Pagination here</a>
        </div>
      </section>
    </div>
  )
}

export default Majors