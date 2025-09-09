import React from "react";
import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";

const Contact = () => {
  return (
    <div>
      <Breadcrum heading={`Contact Us`} page_title={`Contact Us`} />
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 ">
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 py-3">
            <div className="shadow-2xl p-4 text-center rounded-2xl transition duration-300 ease-in-out hover:scale-110">
              <h3 className="mb-4 text-black text-2xl font-semibold">
                Company's Address
              </h3>
              <p className="text-lg text-gray-900">No.308 Xuefu Road, Jingkou District, Zhenjiang City, Jiangsu Province, China.<br />江苏省镇江市京口区学府路308号 </p>
            </div>
            <div className="shadow-2xl p-4 text-center rounded-2xl transition duration-300 ease-in-out hover:scale-110">
              <h3 className="mb-4 text-black text-2xl font-semibold">
                Contact Number
              </h3>
              <p>
                <span className="icon-phone2"></span>
                <a href="tel:+8618252585772" className="">+8618252585772</a>
              </p>
            </div>
            <div className="shadow-2xl p-4 text-center rounded-2xl transition duration-300 ease-in-out hover:scale-110">
              <h3 className="mb-4 text-black text-2xl font-semibold">
                Email Address
              </h3>
              <span className="icon-paper-plane"></span>
              <a href="mailto:zbc@zbusinessconsult.com" className="">zbc@zbusinessconsult.com</a>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-1 mb-5 w-full">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-stretch">
            <div className="w-full md:w-8/12 p-4 md:p-8 order-last md:order-last rounded-xl shadow-xl">
              <div className="py-4 text-2xl font-bold">Contact Us</div>
              <form method="POST" action="/contact_store" className="mt-5">
                {/* Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Subject Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Message Textarea */}
                <div className="mb-4">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows="7"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 border border-[#0061a1] text-[#0061a1] rounded-lg hover:bg-[#0061a1] hover:text-white text-xl transition-all duration-500 ease-in-out"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ApplyNow />
    </div>
  )
}
export default Contact