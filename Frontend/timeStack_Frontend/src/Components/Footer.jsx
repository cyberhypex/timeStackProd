import { FaLinkedin, FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="w-full bg-blue-400 text-white py-6 shadow-inner">
            <div
                className="
                max-w-6xl mx-auto 
                flex flex-col md:flex-row 
                items-center md:items-center 
                justify-between 
                px-6 
                space-y-4 md:space-y-0
            ">

              
                <h1
                    className="
                        text-2xl font-extrabold tracking-wide drop-shadow
                        cursor-pointer hover:scale-105 transition duration-200
                    "
                >
                    Time<span className="text-blue-900">Stack</span>
                </h1>

                
                <p className="text-white/90 font-medium tracking-wide text-center md:text-left">
                    © {new Date().getFullYear()} TimeStack. All rights reserved.
                </p>

                
                <div className="flex items-center space-x-5 text-3xl">

                    <FaLinkedin
                        className="
                            cursor-pointer 
                            hover:text-white 
                            hover:drop-shadow-[0_0_8px_white] 
                            hover:scale-110 
                            transition duration-200
                        "
                        onClick={() =>
                            window.open(
                                "https://www.linkedin.com/in/anshuman-gogoi-b99671211/",
                                "_blank"
                            )
                        }
                    />

                    <FaFacebookSquare
                        className="
                            cursor-pointer 
                            hover:text-white 
                            hover:drop-shadow-[0_0_8px_white] 
                            hover:scale-110 
                            transition duration-200
                        "
                        onClick={() =>
                            window.open(
                                "https://www.facebook.com/anshuman.gogoi.10485/",
                                "_blank"
                            )
                        }
                    />
                </div>
            </div>
        </footer>
    );
}