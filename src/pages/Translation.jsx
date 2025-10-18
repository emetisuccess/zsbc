import React from 'react'
import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";
import TransImage from "../assets/images/5image.jpg";
import Logo from "../assets/logos/zsbc_icon.png"

const Translation = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });


  return (
    <div>
      <Breadcrum heading={`Translation`} page_title={`Translation`} imagePath={TransImage} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {/* Text */}
            <div className="space-y-6 py-10">
              <h1 className="text-2xl md:text-3xl font-bold">
                Translation
              </h1>
              <p className="text-xl leading-relaxed">
                ZSBC recognizes the importance of effective communication in the global business landscape. Our proficient translation services bridge language barriers, facilitating clear and accurate communication between parties. Whether it's legal documents, business contracts, or other materials, our skilled translators ensure precision and cultural sensitivity.
              </p>
            </div>
            {/* Video */}
            <div className="w-full h-96 object-center hidden md:block" style={{
              backgroundImage: `url(${TransImage})`, backgroundPosition: "center", height: "500px", objectFit: "fill", backgroundSize: "contain", backgroundRepeat: "no-repeat"
            }}>
            </div>
          </div>
        </div>
      </section>
      <ApplyNow />
    </div>
  )
}

export default Translation