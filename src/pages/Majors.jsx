import React, { useEffect, useState } from 'react'
import Breadcrum from "../layouts/Breadcrum"
import Logo from "../assets/logos/zsbc_icon.png"
import AboutImage from "../assets/images/about.jpg";

const Majors = () => {
  const [loading, setLoading] = useState(true);
  const [majors, setMajors] = useState([]);
  const [pagination, setPagination] = useState({}); // store pagination info
  const [page, setPage] = useState(1); // current page


  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      setLoading(true);
      fetch(`${import.meta.env.VITE_BASE_URL}/user/majors?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setMajors(data.data);
          setPagination({
            current_page: data.current_page,
            last_page: data.last_page,
          });
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    }
    return () => { ignore = true }; // cleanup
  }, [page]); // run whenever page changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Logo} alt="Loading..." className="w-32 h-32 animate-ping" />
      </div>
    );
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div>
      <Breadcrum heading={`Majors`} page_title={`Majors`} imagePath={AboutImage} />
      <section className="py-16 px-6 md:px-1">
        <div className="max-w-6xl mx-auto grid md:grid-cols-1 gap-10 items-center">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              All Majors
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Available Majors for students Seeking admissions in China
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-6">
            {majors.map((major) => (
              <div key={major.id} className="relative rounded-2xl overflow-hidden shadow-lg h-[350px]">
                <img
                  src={major.image}
                  alt={major.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {major.name}
                  </h3>
                  <p className="text-sm text-gray-200">{major.description}</p>
                  <button className="px-6 py-2 bg-[#0061a1] text-white rounded-lg hover:bg-blue-800 transition duration-300 ease-in-out hover:scale-110 mt-2">
                    <a href='/apply'>Apply</a>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 cursor-pointer rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 font-semibold">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Majors
