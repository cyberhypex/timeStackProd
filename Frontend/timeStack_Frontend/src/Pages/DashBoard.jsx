import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import api from "../axios";
import { useNavigate } from "react-router-dom";

import ChartComponent from "../Components/ChartComponent";
import TaskComponent from "../Components/TaskComponent";
import { RaisedButton } from "../Components/RaisedButton";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [viewMode, setViewMode] = useState("daily");
    const [loading, setLoading] = useState(true);

    const dailyChartEndpoint = "/task/stats/daily-genre";
    const monthlyChartEndpoint = "/task/stats/monthly-genre";
    

    

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get("/task/getAllTasks");
                setTasks(res.data.tasks || []);
            } catch (err) {
                console.error("Failed to fetch tasks", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading dashboard...</p>;
    }

    return (
    <div className="min-h-screen bg-white px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">

        
        <div className="w-full lg:w-1/4 bg-blue-50 rounded-2xl shadow-lg p-6 text-center">
            <img
                src={user?.avatar}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto object-cover border-4 border-blue-400"
            />

            <h2 className="mt-4 text-xl sm:text-2xl font-bold text-blue-700">
                {user?.username}
            </h2>

            <p className="text-gray-600 mt-1">
                Age: {user?.age}
            </p>
            <p className="text-gray-600 mt-1">
                Gender: {user?.gender}
            </p>

            <div className="mt-6">
                <RaisedButton
                    text="Create New Task"
                    onClick={() => navigate("/create-task")}
                />
            </div>
        </div>

      
        <div className="w-full lg:w-3/4 flex flex-col gap-6">

           
            <div className="w-full overflow-x-auto">
                <ChartComponent
                    endpoint={
                        viewMode === "daily"
                            ? dailyChartEndpoint
                            : monthlyChartEndpoint
                    }
                    title={
                        viewMode === "daily"
                            ? "Today's Time Distribution"
                            : "Monthly Time Distribution"
                    }
                />
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
                <RaisedButton
                    text="Daily"
                    onClick={() => setViewMode("daily")}
                />
                <RaisedButton
                    text="Monthly"
                    onClick={() => setViewMode("monthly")}
                />
            </div>

           
            <div className="mt-2 space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No tasks created yet
                    </p>
                ) : (
                    tasks.map((task) => (
                        <TaskComponent
                            key={task._id}
                            task={task}
                            onEdit={() => navigate(`/edit-task/${task._id}`)}
                            onDelete={async () => {
                                try {
                                    await api.delete(`/task/deleteTask/${task._id}`);
                                    alert("Task deleted successfully");
                                    window.location.reload();
                                } catch (err) {
                                    console.log(err);
                                    alert("Failed to delete task");
                                }
                            }}
                            onTaskUpdated={() => window.location.reload()}
                        />
                    ))
                )}
            </div>
        </div>
    </div>
);

}