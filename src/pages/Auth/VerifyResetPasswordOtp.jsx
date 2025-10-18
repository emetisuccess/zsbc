import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useStateContext } from "../../contexts/ContextProvider";

const VerifyCode = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [verify, setVerify] = useState(false);
    const { setUser, setToken } = useStateContext();

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
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/verify-otp`, {
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
                        window.location.href = "/reset-password"
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

            <div className="flex flex-col border border-[#0061a154] py-16 px-32 shadow-md">
                <h2 className="text-xl font-semibold mb-4">OTP Verification</h2>
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