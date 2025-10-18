import Breadcrum from "../layouts/Breadcrum"
import ApplyNow from "../layouts/ApplyNow"
import { Link } from "react-router-dom";
import AboutImage from "../assets/images/7image.jpg";

const About = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div>
      <Breadcrum heading={`About Us`} page_title={`About Us`} imagePath={AboutImage} />
      <section className="relative w-full h-fit flex items-center justify-center">
        <div className="bg-white text-gray-800 font-sans">
          {/* Hero Section */}
          <section className="text-[#0061a1] py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Zhenjiang Sino Business Consultancy Co. Ltd (ZSBC)
            </h1>
            <p className="text-lg">Bridging China and Africa in Trade, Education, and Investment</p>
            <p className="bg-[#0061a1] py-0.5 mt-0.5"></p>
          </section>

          {/* About Us */}
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-[#0061a1] mb-4">About Us</h2>
            <p className="leading-relaxed text-gray-700 mb-6">
              Zhenjiang Sino Business Consultancy Co. Ltd (ZSBC) is a trusted international
              business consultancy and service provider based in Zhenjiang, Jiangsu Province, China.
              We specialize in end-to-end solutions for foreign clients seeking to establish,
              expand, and operate effectively in China and across Africa, with a strong focus on Nigeria.
            </p>
            <p className="leading-relaxed text-gray-700">
              With our extensive network, bilingual expertise, and deep understanding of
              cross-border regulations, we bridge the gap between China and Nigeria
              in trade, education, and investment.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6">
              <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[#0061a1]">
                <h3 className="text-2xl font-semibold text-[#0061a1] mb-4">Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To simplify cross-border trade and empower our clients with seamless
                  solutions that foster growth and global competitiveness.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-2xl p-8 border-t-4 border-[#0061a1]">
                <h3 className="text-2xl font-semibold text-[#0061a1] mb-4">Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading global bridge connecting businesses across China and the
                  world through innovative consultancy, reliable logistics, and seamless
                  international trade services.
                </p>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-[#0061a1] mb-8">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Import & Export Facilitation",
                  desc: "Supporting clients in sourcing, procurement, inspection, and shipment of goods from China to Nigeria and beyond."
                },
                {
                  title: "Business Consultancy & Company Formation",
                  desc: "Assisting clients in registering companies, securing work permits, and providing office solutions."
                },
                {
                  title: "Logistics & Shipping Services",
                  desc: "Coordinating reliable freight forwarding, customs documentation, and transportation of goods."
                },
                {
                  title: "Education & Admission Processing",
                  desc: "Partnering with Chinese universities to facilitate student admissions for international applicants."
                },
                {
                  title: "Client Support Services",
                  desc: "Airport pick-up, hotel arrangements, translation, and settlement services for international clients."
                },
              ].map((service, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition hover:scale-110 cursor-pointer">
                  <h4 className="text-xl font-semibold text-[#0061a1] mb-2">{service.title}</h4>
                  <p className="text-gray-700">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-blue-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-[#0061a1] mb-6">Why Choose ZSBC?</h2>
              <ul className="space-y-4 text-gray-700">
                <li>✅ Strong partnerships with manufacturers, government agencies, and logistics providers.</li>
                <li>✅ Experience in handling business transactions between China and Africa.</li>
                <li>✅ Personalized support ensuring trust, transparency, and efficiency.</li>
                <li>✅ Bridging cultural and language gaps between partners.</li>
              </ul>
            </div>
          </section>
        </div>
      </section>
      <ApplyNow />
    </div>
  )
}

export default About