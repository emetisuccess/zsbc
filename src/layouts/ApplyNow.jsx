import Video from "../assets/videos/zsbc_video.mp4";

const ApplyNow = () => {

  const style = {
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80')",
  }



  return (
    <section className="relative w-full h-fit flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-32 flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center"
          style={style}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-800 opacity-69"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {/* Video */}
          <div className="w-full">
            <video
              controls
              className="rounded-2xl shadow-lg w-full h-auto"
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"
            >
              <source src={Video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Apply Now
            </h1>
            <p className="text-xl leading-relaxed">
              ZSBC can help you to fulfil your dream career. Through our widespread services, you will secure admission to study in top Universities and Polytechnics in China and learn the Chinese culture.
            </p>
            {/*<button className="px-6 py-3 bg-[#0061a1] hover:bg-blue-700 transition rounded-full font-semibold shadow-lg">
                Get Started
              </button>*/}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApplyNow