import { useState } from "react";
import { RaisedButton } from "../Components/RaisedButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../axios";
import PositiveButton from "../Components/PositiveButton";
import { NavLink ,useNavigate} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


export function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
   

    const [showPassword, setShowPassword] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const navigate=useNavigate();
    const {login}=useAuth();


    const emailRegex = /^\S+@\S+\.\S+$/;

    const handleSignup = async () => {
    if (!username.trim()) return setResponseMsg("✖ Username cannot be empty");
    if (!email.trim()) return setResponseMsg("✖ Email cannot be empty");
    if (!emailRegex.test(email)) return setResponseMsg("✖ Please enter a valid email");
    if (!password.trim()) return setResponseMsg("✖ Password cannot be empty");
    if (password.length < 6) return setResponseMsg("✖ Password must be at least 6 characters");
    if (!age.trim()) return setResponseMsg("✖ Age cannot be empty");
    if(age.toString().length>3 || Number(age)<=0) return setResponseMsg("✖ Please enter a valid age");

    setLoading(true);
    setResponseMsg("");

    try {
        const res = await api.post(
            "/user/createUser",
            {
                username,
                email,
                password,
                age: Number(age),
                gender
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        login(res.data.jwtToken,res.data.user);
        navigate("/dashboard", { replace: true });

    } catch (err) {
        if (err.response) {
            setResponseMsg(`✖ ${err.response.data.message}`);
        } else {
            setResponseMsg("✖ Network error");
        }
    }

    setLoading(false);
};


    

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-white px-4">

            <div className="
                w-full max-w-md bg-blue-50 
                shadow-2xl rounded-2xl 
                p-8 border border-blue-200
            ">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center drop-shadow">
                    Create Your TimeStack Account
                </h2>

                
                <div className="relative mb-6">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="
                            w-full px-4 py-3 rounded-lg border border-blue-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-blue-900 peer bg-transparent
                        "
                    />
                    <label className="
                        absolute left-4 top-3 text-blue-700 
                        transition-all duration-200 pointer-events-none
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600
                        peer-valid:-top-3 peer-valid:text-sm
                    ">
                        Username
                    </label>
                </div>

               
                <div className="relative mb-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full px-4 py-3 rounded-lg border border-blue-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-blue-900 peer bg-transparent
                        "
                    />
                    <label className="
                        absolute left-4 top-3 text-blue-700 
                        transition-all duration-200 pointer-events-none
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600
                        peer-valid:-top-3 peer-valid:text-sm
                    ">
                        Email
                    </label>
                </div>

               
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full px-4 py-3 rounded-lg border border-blue-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-blue-900 peer bg-transparent
                        "
                    />
                    <label className="
                        absolute left-4 top-3 text-blue-700 
                        transition-all duration-200 pointer-events-none
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600
                        peer-valid:-top-3 peer-valid:text-sm
                    ">
                        Password
                    </label>

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3 cursor-pointer text-blue-700 hover:text-blue-900"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                
                <div className="relative mb-6">
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="
                            w-full px-4 py-3 rounded-lg border border-blue-300
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-blue-900 peer bg-transparent
                        "
                    />
                    <label className="
                        absolute left-4 top-3 text-blue-700 
                        transition-all duration-200 pointer-events-none
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600
                        peer-valid:-top-3 peer-valid:text-sm
                    ">
                        Age
                    </label>
                </div>

                
                <label className="block text-blue-700 font-semibold mb-2">Gender</label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="
                        w-full px-4 py-3 mb-6 rounded-lg border border-blue-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        text-blue-900
                    "
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                </select>

                                
                


                
                <RaisedButton
                    text={loading ? "Creating..." : "Sign Up"}
                    onClick={handleSignup}
                />

                <div className="mt-6 text-center text-blue-700 font-medium">
                    Already have an account?
                </div>

                <div className="mt-3 flex justify-center">
                    <NavLink to="/login">
                    <RaisedButton
                        text="Login"
                        onClick={() => console.log("Login clicked")}
                        type="button"
                    />
                    </NavLink>
                    </div>

               
                {responseMsg && (
                    <p
                        className={`mt-4 font-bold text-center ${
                            responseMsg.startsWith("✔") ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {responseMsg}
                    </p>
                )}
            </div>
        </div>
    );
}