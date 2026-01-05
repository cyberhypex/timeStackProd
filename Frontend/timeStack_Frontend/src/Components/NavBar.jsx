import { useState } from "react";
import { RaisedButton } from "./RaisedButton";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Home");

    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth(); 

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout();         
            navigate("/", { replace: true });
        } else {
            navigate("/login");
        }
    };

    const navItemClasses = (name) => `
        font-semibold tracking-wide cursor-pointer
        transition-all duration-200
        hover:text-white hover:drop-shadow-[0_0_8px_white] hover:scale-110
        ${
            active === name
                ? "text-white drop-shadow-[0_0_10px_white] underline underline-offset-4"
                : "text-white/90"
        }
    `;

    return (
        <nav className="w-full bg-blue-400 text-white px-6 py-4 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">

                
                <h1
                    className="text-3xl font-extrabold tracking-wider drop-shadow-lg
                               hover:scale-105 transition-all duration-200 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Time<span className="text-blue-900">Stack</span>
                </h1>

                
                <button
                    className="md:hidden text-white text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

               
                <div className="hidden md:flex items-center space-x-6 text-lg">
                    <ul className="flex items-center space-x-6">

                        <NavLink to="/">
                            <li
                                className={navItemClasses("Home")}
                                onClick={() => setActive("Home")}
                            >
                                Home
                            </li>
                        </NavLink>

                        <NavLink to="/about">
                            <li
                                className={navItemClasses("About")}
                                onClick={() => setActive("About")}
                            >
                                About
                            </li>
                        </NavLink>

                        <NavLink to="/dashboard">
                            <li
                                className={navItemClasses("Dashboard")}
                                onClick={() => setActive("Dashboard")}
                            >
                                Dashboard
                            </li>
                        </NavLink>

                    </ul>

                    <RaisedButton
                        text={isAuthenticated ? "Logout" : "Login"}
                        onClick={handleAuthAction}
                    />
                </div>
            </div>

            
            {open && (
                <div className="md:hidden mt-3 space-y-4 text-lg bg-blue-500 p-4 rounded-lg shadow">

                    <div
                        className={navItemClasses("Home")}
                        onClick={() => {
                            setActive("Home");
                            setOpen(false);
                            navigate("/");
                        }}
                    >
                        Home
                    </div>

                    <div
                        className={navItemClasses("About")}
                        onClick={() => {
                            setActive("About");
                            setOpen(false);
                            navigate("/about");
                        }}
                    >
                        About
                    </div>

                    <div
                        className={navItemClasses("Dashboard")}
                        onClick={() => {
                            setActive("Dashboard");
                            setOpen(false);
                            navigate("/dashboard");
                        }}
                    >
                        Dashboard
                    </div>

                    <RaisedButton
                        text={isAuthenticated ? "Logout" : "Login"}
                        onClick={() => {
                            setOpen(false);
                            handleAuthAction();
                        }}
                    />
                </div>
            )}
        </nav>
    );
}