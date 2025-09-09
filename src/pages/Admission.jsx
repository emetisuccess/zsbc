
import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";
import AboutImage from "../assets/images/about.jpg";


const Admission = () => {
  return (
    <div>
      <Breadcrum heading={`Admission Processing`} page_title={`Admission Processing`} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {/* Text */}
            <div className="space-y-6 py-10">
              <h1 className="text-2xl md:text-3xl font-bold">
                Admission Processing
              </h1>
              <p className="text-xl leading-relaxed">
                ZSBC specializes in assisting international students who aspire to pursue
                academic excellence in China. We provide support for diploma, bachelor's, master's, and Ph.D. programs,
                catering to both scholarship and self-sponsored candidates. Our team is dedicated to ensuring a smooth
                and hassle-free transition for students seeking quality education in Chinese universities and polytechnics.
              </p>
            </div>
            {/* Video */}
            <div className="w-full h-96 object-center" style={{
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

export default Admission