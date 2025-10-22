import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdmissionSuccess() {
    const [showConfetti, setShowConfetti] = useState(true);
    const { token } = useStateContext();

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 10000);
        // const audio = new Audio("/success-sound.mp3"); // brief success sound
        // audio.play().catch(() => {});
        return () => clearTimeout(timer);
    }, []);

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={800} />}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-md w-full"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 120 }}
                    className="flex justify-center mb-6"
                >
                    <CheckCircle className="text-green-500 w-20 h-20" />
                </motion.div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Admission Application Submitted Successfully!
                </h1>
                <p className="text-gray-600 mb-8">
                    Thank you for applying. Our admissions team will review your application and get back to you soon.
                </p>

                <div className="flex flex-col gap-3">
                    <Link to="/" className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg animate-bounce text-xl">
                        Go Back to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
