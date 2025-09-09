import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";
import AboutImage from "../assets/images/about.jpg";

const Goods = () => {
  return (
    <div>
      <Breadcrum heading={`Import&Export of Goods and Technology`} page_title={`Import and Export`} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 justify-center">
            {/* Text */}
            <div className="space-y-6 py-10">
              <h1 className="text-2xl md:text-3xl font-bold">
                Import and Export of Goods and Technology
              </h1>
              <p className="text-xl leading-relaxed">
                Leveraging our extensive network and local expertise, ZSBC aids clients in navigating the complexities of buying goods in China, negotiating deals, and facilitating import/export processes. We are committed to streamlining international trade activities, providing valuable insights, and ensuring compliance with regulatory requirements.
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

export default Goods