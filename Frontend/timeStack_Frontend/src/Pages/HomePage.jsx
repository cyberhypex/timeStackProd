import TimeStack from "../Assets/TimeStack.png";
import {RaisedButton} from "../Components/RaisedButton";
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion";
import { 
    FaPlusCircle, FaEdit, FaTrashAlt, FaChartPie, 
    FaBell, FaCalendarCheck, FaBrain 
} from "react-icons/fa";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-white pt-20 overflow-x-hidden">

            
            <div className="w-full px-10 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-16">

               
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 space-y-6"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-blue-500 drop-shadow-xl">
                        Welcome to <span className="text-blue-700">TimeStack</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                        Track your daily activities, analyze how you spend time, and boost productivity 
                        with smart insights and beautiful dashboards.
                    </p>

                   <motion.p
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.3 }}
    className="
        text-lg md:text-xl 
        font-semibold 
        bg-gradient-to-r from-blue-600 to-blue-800 
        bg-clip-text text-transparent 
        drop-shadow-sm 
        hover:drop-shadow-[0_0_10px_rgba(30,58,138,0.4)]
        transition-all duration-300
    "
>
    Organize better. Work smarter. Control your time.
</motion.p>
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9, delay: 0.3 }}
  className="flex items-center"
>
  <NavLink to="/create-task">
    <RaisedButton text="Create Task" />
  </NavLink>

  <span className="inline-block w-4"></span>

  <NavLink to="/dashboard">
    <RaisedButton text="View Dashboard" />
  </NavLink>
</motion.div>


                </motion.div>

              
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.9 }}
                    className="flex-1 flex justify-end"
                >
                    <img
                        src={TimeStack}
                        alt="TimeStack App"
                        className="w-80 md:w-[420px] drop-shadow-2xl rounded-xl"
                    />
                </motion.div>
            </div>

           
            

          
            <div className="w-full mt-10 px-10">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-blue-600 mb-6"
                >
                    Features
                </motion.h2>

               
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar"
                >
                    {[
                        {
                            title: "Create Tasks Instantly",
                            icon: <FaPlusCircle className="text-white text-4xl" />,
                            desc: "Start organizing your day in seconds with clean and simple task creation."
                        },
                        {
                            title: "Edit With Ease",
                            icon: <FaEdit className="text-white text-4xl" />,
                            desc: "Update, adjust, and refine your tasks effortlessly anytime."
                        },
                        {
                            title: "Clean Up Clutter",
                            icon: <FaTrashAlt className="text-white text-4xl" />,
                            desc: "Remove outdated tasks and keep your workflow sharp."
                        },
                        {
                            title: "Visual Time Analytics",
                            icon: <FaChartPie className="text-white text-4xl" />,
                            desc: "See where every hour goes with beautiful data-driven charts."
                        },
                        {
                            title: "Smart Reminders",
                            icon: <FaBell className="text-white text-4xl" />,
                            desc: "Never miss an important task with intelligent reminders.Coming Soon...."
                        },
                        {
                            title: "Daily Progress Snapshot",
                            icon: <FaCalendarCheck className="text-white text-4xl" />,
                            desc: "A beautiful summary of your day’s accomplishments. Coming Soon...."
                        },
                        {
                            title: "Productivity Insights",
                            icon: <FaBrain className="text-white text-4xl" />,
                            desc: "AI-backed suggestions to improve your time efficiency. Coming Soon...."
                        }
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                scale: 1.1,
                                rotateX: 8,
                                rotateY: -8,
                                boxShadow: "0px 20px 45px rgba(0,0,0,0.4)"
                            }}
                            whileTap={{ scale: 0.97 }}
                            className="w-72 flex-shrink-0 rounded-2xl p-[2px] 
                                       bg-gradient-to-br from-blue-200 to-blue-500 shadow-xl"
                        >
                            <div className="bg-gradient-to-br from-blue-400 to-blue-500 
                                            rounded-2xl p-7 text-white h-full">
                                <div className="mb-4">{card.icon}</div>
                                <h3 className="text-2xl font-bold tracking-wide">{card.title}</h3>
                                <p className="mt-3 text-white/90 text-sm leading-relaxed">{card.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}