import Breadcrum from "../layouts/Breadcrum"
import ApplyNow from "../layouts/ApplyNow"
import AboutImage from "../assets/images/about.jpg";

const About = () => {

  // const style = {

  // }
  return (
    <div>
      <Breadcrum heading={`About Us`} page_title={`About Us`} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {/* Text */}
            <div className="space-y-6 py-10">
              <h1 className="text-2xl md:text-3xl font-bold">
                Zhenjiang Sino Business Consultancy Co. Ltd (ZSBC) was Founded since 2018.
              </h1>
              <p className="text-xl leading-relaxed">
                Zhenjiang Sino Business Consultancy Co. Ltd (ZSBC) is a dynamic and versatile business consultancy firm headquartered in China, committed to providing a comprehensive range of services to meet the diverse needs of our clients. With a strong foundation built on expertise and reliability, ZSBC has emerged as a trusted partner for individuals and businesses seeking seamless solutions in various domains.
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

export default About