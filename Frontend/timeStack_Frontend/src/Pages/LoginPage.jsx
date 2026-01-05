import { useState } from "react";
import { RaisedButton } from "../Components/RaisedButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setResponseMsg("✖ Email cannot be empty");
            return;
        }
        if (!password.trim()) {
            setResponseMsg("✖ Password cannot be empty");
            return;
        }

        setLoading(true);
        setResponseMsg("");

        try {
            const res = await api.post("/user/login", {
                email,
                password
            });

           
            login(res.data.jwtToken, res.data.user);

            setResponseMsg("✔ Login successful!");
            navigate("/dashboard", { replace: true });

        } catch (err) {
            if (err.response) {
                setResponseMsg(`✖ ${err.response.data.message}`);
                alert(err.response.data.message);
                
                
            } else {
                setResponseMsg("✖ Network error");
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">

            <div className="w-full max-w-md bg-blue-50 shadow-2xl rounded-2xl p-8 border border-blue-200">

                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center drop-shadow">
                    Login to TimeStack
                </h2>

              
                <form onSubmit={handleLogin}>

                    
                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-blue-300
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       text-blue-900 peer bg-transparent"
                            placeholder="Enter your e-mail"
                        />
                        <label className="absolute left-4 top-3 text-blue-700
                                          transition-all duration-200
                                          peer-focus:-top-3 peer-focus:text-sm
                                          peer-valid:-top-3 peer-valid:text-sm">
                            Email
                        </label>
                    </div>

                    
                    <div className="relative mb-6">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-blue-300
                                       focus:outline-none focus:ring-2 focus:ring-blue-500
                                       text-blue-900 peer bg-transparent"
                            placeholder="Enter your password"
                        />
                        <label className="absolute left-4 top-3 text-blue-700
                                          transition-all duration-200
                                          peer-focus:-top-3 peer-focus:text-sm
                                          peer-valid:-top-3 peer-valid:text-sm">
                            Password
                        </label>

                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3 cursor-pointer
                                       text-blue-700 hover:text-blue-900"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    
                    <RaisedButton
                        text={loading ? "Logging in..." : "Login"}
                        type="submit"
                    />

                    
                    <div className="mt-6 text-center text-blue-700 font-medium">
                        New to TimeStack?
                    </div>

                    <div className="mt-3 flex justify-center">
                        <NavLink to="/signup">
                            <RaisedButton
                                text="Create Account"
                                type="button"
                            />
                        </NavLink>
                    </div>

                </form>

                
                {responseMsg && (
                    <p className={`mt-4 font-bold text-center ${
                        responseMsg.startsWith("✔")
                            ? "text-green-600"
                            : "text-red-600"
                    }`}>
                        {responseMsg}
                    </p>
                )}

            </div>
        </div>
    );
}