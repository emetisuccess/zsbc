import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";



export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            toast.error("Please enter a valid email address!")
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || `Request failed (${res.status})`);
            }
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setEmail("");
                setTimeout(() => {
                    return <Navigate to="/verify-otp" />
                }, 4000);
                return;
            }
        } catch (err) {
            toast.error(err.message || "Something went wrong. Try again!");
            err.message
            // console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold mb-1">Forgot your password?</h2>
                    <p className="text-sm text-gray-500 mb-4">Enter your email and we'll send a link to reset your password.</p>

                    <form onSubmit={submit} className="space-y-4">
                        <label className="block">
                            <span className="text-sm text-gray-700">Email</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 p-2"
                                placeholder="you@company.com"
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 rounded-lg bg-[#0061a1]  text-white font-medium disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Sending..." : "Send reset OTP"}
                        </button>

                        <div className="text-center text-xs text-gray-400">Check your spam folder if you don't see the email.</div>
                    </form>
                </div>
            </div>
        </div>
    );
}

