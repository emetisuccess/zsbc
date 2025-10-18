import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);


    const submit = async (e) => {
        e.preventDefault();

        if (!password || password.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirm) {
            toast.error("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || `Request failed (${res.status})`);
            }
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setPassword("");
                setConfirm("");
                setTimeout(() => {
                    return <Navigate to="/login" />
                    // window.location.href = "/login"
                }, 3000);
                return;
            }
        } catch (err) {
            toast.error(err.message || "Failed to reset password!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-2xl font-semibold mb-1">Reset your password</h2>
                    <p className="text-sm text-gray-500 mb-4">Set a new password for your account.</p>
                    <form onSubmit={submit} className="space-y-4">
                        <label className="block">
                            <span className="text-sm text-gray-700">New password</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 p-2"
                                placeholder="••••••••"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm text-gray-700">Confirm password</span>
                            <input
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 p-2"
                                placeholder="••••••••"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 rounded-lg bg-[#0061a1]  text-white font-medium disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? "Saving..." : "Reset password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default ResetPassword