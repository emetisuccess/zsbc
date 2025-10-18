import React from 'react'
import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";
import AboutImage from "../assets/images/3image.jpg";
import Logo from "../assets/logos/zsbc_icon.png"

const Business = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });


  return (
    <div>
      <Breadcrum heading={`Business Consultation`} page_title={`Business Consultation`} imagePath={AboutImage} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {/* Text */}
            <div className="space-y-6 py-10">
              <h1 className="text-2xl md:text-3xl font-bold">
                Business Consultation &amp; Planning
              </h1>
              <p className="text-xl leading-relaxed">
                At the heart of ZSBC's offerings is our commitment to providing strategic business consultation and planning services. We work closely with clients to understand their unique goals and challenges, offering tailored solutions that drive growth and success. From market entry strategies to organizational development, ZSBC is dedicated to empowering businesses to thrive in the competitive marketplace.
              </p>
            </div>
            {/* Video */}
            <div className="w-full h-96 object-center hidden md:block" style={{
              backgroundImage: `url(${AboutImage})`, backgroundPosition: "center", height: "500px", objectFit: "fill", backgroundSize: "contain", backgroundRepeat: "no-repeat"
            }}>
            </div>
          </div>
        </div>
      </section>
      <ApplyNow />
    </div>
  )
}

export default Business