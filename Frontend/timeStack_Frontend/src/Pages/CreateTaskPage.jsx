import { useState } from "react";
import { RaisedButton } from "../Components/RaisedButton";
import api from "../axios";
import { useNavigate } from "react-router-dom";
import TASK_TYPES from "../Constants/TaskTypes";

export default function CreateTaskPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("STUDY"); 
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    

    const navigate = useNavigate();

    const handleCreateTask = async (e) => {
        e.preventDefault();

        

        if (!title.trim()) return setResponseMsg("✖ Title is required");
        if (!startTime) return setResponseMsg("✖ Start time is required");
        if (!endTime) return setResponseMsg("✖ End time is required");

        const start=new Date(startTime)
        const end=new Date(endTime)

       
        if(end<=start){
            return setResponseMsg("✖ End time must be after start time");
        }
        const durationMinutes=(end-start)/60000;
        if(durationMinutes<0){
            return setResponseMsg("Please select valid time range")
        }
        setLoading(true);
        setResponseMsg("");

        try {
            await api.post("/task/createTask", {
                title,
                description,
                type,         
                startTime,
                endTime
            });

            setResponseMsg("✔ Task created successfully");
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
            <div className="w-full max-w-md bg-blue-50 shadow-2xl rounded-2xl p-8 border border-blue-200">

                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                    Create New Task
                </h2>

                <form onSubmit={handleCreateTask}>

                    
                    <div className="mb-5">
                        <label className="block text-blue-700 font-semibold mb-1">
                            Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div className="mb-5">
                        <label className="block text-blue-700 font-semibold mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div className="mb-5">
                        <label className="block text-blue-700 font-semibold mb-1">
                            Task Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500"
                        >
                        <option value={TASK_TYPES.EDUCATION}>Study</option>
                        <option value={TASK_TYPES.WORK}>Work</option>
                        <option value={TASK_TYPES.SPORTS}>Sports</option>
                        <option value={TASK_TYPES.LEISURE}>Leisure</option>
                        <option value={TASK_TYPES.GAME}>Game</option>
                        <option value={TASK_TYPES.OTHER}>Other</option> 
                        </select>
                    </div>

                    
                    <div className="mb-5">
                        <label className="block text-blue-700 font-semibold mb-1">
                            Start Time
                        </label>
                        <input
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    
                    <div className="mb-6">
                        <label className="block text-blue-700 font-semibold mb-1">
                            End Time
                        </label>
                        <input
                            type="datetime-local"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <RaisedButton
                        text={loading ? "Creating..." : "Create Task"}
                        type="submit"
                    />
                </form>

                {responseMsg && (
                    <p className={`mt-4 text-center font-bold ${
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