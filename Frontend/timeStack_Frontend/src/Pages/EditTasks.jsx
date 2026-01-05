import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import { RaisedButton } from "../Components/RaisedButton";

export default function EditTaskPage() {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");

    
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await api.get(`/task/getTask/${taskId}`);
                const task = res.data.task;

                setTitle(task.title);
                setDescription(task.description);
                setType(task.type);
                setStartTime(task.startTime);
                setEndTime(task.endTime);
            } catch (err) {
                setResponseMsg("✖ Failed to load task");
            }
        };

        fetchTask();
    }, [taskId]);

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) return setResponseMsg("✖ Title cannot be empty");
        if (!type) return setResponseMsg("✖ Please select task type");
        if (!startTime || !endTime)
            return setResponseMsg("✖ Start & End time required");
        const start=new Date(startTime)
        const end=new Date(endTime)

       
        if(end<=start){
            return setResponseMsg("✖ End time must be after start time");
        }
        const durationMinutes=(end-start)/60000;
        if(durationMinutes<=0){
            return setResponseMsg("Please select valid time range")
        }
        setLoading(true);
        setResponseMsg("");

        try {
            await api.put(`/task/updateTask/${taskId}`, {
                title,
                description,
                type,
                startTime,
                endTime
            });

            setResponseMsg("✔ Task updated successfully!");
            setTimeout(() => navigate("/dashboard"), 800);
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
                    Edit Task
                </h2>

                <form onSubmit={handleUpdateTask}>

                    
                    <div className="mb-4">
                        <label className="block font-semibold text-blue-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label className="block font-semibold text-blue-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={3}
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label className="block font-semibold text-blue-700 mb-1">
                            Task Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-blue-300
                                       focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select type</option>
                            <option value="study">Study</option>
                            <option value="work">Work</option>
                            <option value="sports">Sports</option>
                            <option value="leisure">Leisure</option>
                            <option value="gaming">Game</option>
                            <option value="other">Other</option>
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
                        text={loading ? "Updating..." : "Update Task"}
                        type="submit"
                    />
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