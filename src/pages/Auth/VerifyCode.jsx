import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from "react-router-dom";

const VerifyCode = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [verify, setVerify] = useState(false);
    const { setUser, setToken, token } = useStateContext();



    // Countdown timer for resend
    useEffect(() => {
        let interval;
        if (isResendDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setIsResendDisabled(false);
        }
        return () => clearInterval(interval);
    }, [isResendDisabled, timer]);

    // Handle OTP input
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        let newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Auto-focus next input
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    if (token) {
        return <Navigate to="/" />
    }

    // Submit OTP
    const handleSubmit = async () => {
        const enteredOtp = otp.join("");
        console.log(enteredOtp);
        if (!enteredOtp && enteredOtp.length < 6) {
            toast.error("OTP field is Required!");
            return;
        } else {
            setVerify(true);
            try {
                const formData = new FormData();
                formData.append("otp", enteredOtp);
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/verify-email`, {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: formData
                });
                if (!res.ok) {
                    const data = await res.json();
                    toast.error(data.message);
                    return;
                }
                const data = await res.json();
                if (data.success) {
                    toast.success(data.message);
                    setToken(data.token);
                    setUser(data.user);
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 3000);
                    return;
                }
            } catch (err) {
                toast.error(err.message);
                return;
            } finally {
                setVerify(false);
            }
        }
    };



    // Resend OTP
    const handleResend = async () => {
        setIsResendDisabled(true);
        setTimer(30);
        setOtp(new Array(6).fill(""));

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/resend-otp`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                const data = await res.json();
                toast.error(data.message)
                return
            }
            const data = await res.json();
            if (data.success) {
                toast.success(data.message)
                return;
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold mb-2">Verify Your Account</h1>
                <p className="mb-6 text-sm font-bold">
                    We’ve sent a 6-digit verification code to your email.
                    Enter it below to confirm your identity.
                </p>
            </div>
            <div className="flex flex-col py-16 px-32 shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">OTP Verification</h2>
                <div className="flex space-x-2 mb-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            className="w-10 h-10 text-center border rounded"
                        />
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-[#0061a1] text-white px-4 py-2 rounded mb-2"
                >
                    {verify ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                    onClick={handleResend}
                    disabled={isResendDisabled}
                    className={`px-4 py-2 rounded ${isResendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white"
                        }`}
                >
                    {isResendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
            </div>
        </div>
    );
};

export default VerifyCode