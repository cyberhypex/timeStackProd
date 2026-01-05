import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="w-full px-8 md:px-20 py-16 font-[Inter]">

            
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold text-blue-600 text-center drop-shadow-lg mb-10"
            >
                Why <span className="text-blue-800">TimeStack</span>?
            </motion.h1>

            
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="
                    bg-blue-50 shadow-xl rounded-2xl 
                    p-10 max-w-4xl mx-auto border border-blue-200
                "
            >

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center mb-8">
                    TimeStack isn’t just another task app — it’s your smart companion for mastering your time, 
                    boosting productivity, and staying effortlessly organized.
                </p>

               
                <ul className="space-y-6 text-gray-800 text-lg md:text-xl">
                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span><b>Smart Task Creation</b> — Track your activities with precise start & end times.</span>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span><b>Beautiful Analytics</b> — Understand where your time really goes with intuitive dashboards.</span>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span><b>Smart Reminders</b> — Get notified before important tasks and deadlines.</span>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span><b>Daily Progress Tracking</b> — See how productive your day really was in a glance.</span>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.9 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span>
                            <b>AI-Powered Insights (coming soon 🚀)</b> —  
                            Personalized suggestions to optimize your time and habits.
                        </span>
                    </motion.li>

                    <motion.li
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex gap-3 items-start"
                    >
                        <span className="text-blue-600 text-2xl">✔</span>
                        <span><b>Minimal Interface</b> — Clean, fast, distraction-free experience with a modern blue-white theme.</span>
                    </motion.li>
                </ul>

                
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center text-lg md:text-xl text-gray-700 mt-10 font-semibold"
                >
                    You're not just managing tasks —  
                    <span className="text-blue-700"> you're building better habits, days, and goals.</span>
                </motion.p>
            </motion.div>
        </div>
    );
}