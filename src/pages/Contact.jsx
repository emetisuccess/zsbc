import { useState } from "react";
import Breadcrum from "../layouts/Breadcrum";
import ApplyNow from "../layouts/ApplyNow";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import AboutImage from "../assets/images/4image.jpg";


const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Check if token is available
  const { token } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !messageContent) {
      toast.error("All fields are Required!")
      return;
    }

    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('messageContent', messageContent);

    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/user/contact-us/send-message`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`, // if you need a token
        },
        body: formData
      }).then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            toast.error("You are not authorized. Please login to continue.")
            localStorage.removeItem("ACCESS_TOKEN");
            return;
          } else {
            const data = await res.json();
            toast.error(data.message);
            return;
          }
        }
        const data = await res.json();
        if (data.success) {
          toast.success(data.message || "Sent Successfully!")
          setName("");
          setEmail("");
          setSubject("");
          setMessageContent("");
          return;
        } else {
          toast.error("Something went Wrong!")
        }
      }).then((err) => {
        console.log(err.message);
        return;
      }).finally(() => { setLoading(false); return; })
    } catch (error) {
      error.message;
      // console.log(error.message);
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div>
      <Breadcrum heading={`Contact Us`} page_title={`Contact Us`} imagePath={AboutImage} />
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
              <form onSubmit={handleSubmit} className="mt-5">
                {/* Name Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Subject Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={subject}
                    required
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  />
                </div>

                {/* Message Textarea */}
                <div className="mb-4">
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Enter Message Here"
                    required
                    rows="7"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-5 border border-[#0061a1] text-[#0061a1] rounded-lg hover:bg-[#0061a1] hover:text-white text-xl transition-all cursor-pointer duration-500 ease-in-out"
                  >
                    {loading ? "Sending..." : "Send Message"}
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