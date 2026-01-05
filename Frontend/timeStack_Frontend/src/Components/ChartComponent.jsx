import { useEffect,useState } from "react";
import api from "../axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


export default function ChartComponent({
    endpoint,
    title="Time Distribution",
}){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

    useEffect(()=>{
        const fetchChartData = async () => {
      try {
        setLoading(true);
        const res = await api.get(endpoint);
        setData(res.data.stats || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
    },[endpoint]);
    

    if(loading){
        return <p className="text-center mt-6">Loading Track...</p>;
    }

    if(error){
        return <p className="text-center mt-6 text-red-500">{error}</p>
    }

    

    const isEmpty = data.length === 0;
   return (
  <div className="w-full max-w-3xl mx-auto bg-blue-50 p-6 rounded-2xl shadow-lg">
    <h2 className="text-xl font-bold text-blue-700 text-center mb-4">
      {title}
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="type"
          tick={{ fill: "#0F45F5", fontSize: 12 }}
          label={{
            value: "Task Type",
            position:"insideBottom",
            offset: -2,
          }}
        />

        <YAxis
          tick={{ fill: "#1e40af", fontSize: 12 }}
          label={{
            value: "Duration (minutes)",
            angle: -90,
            position: "insideLeft",
          }}
        />

        <Tooltip />

        {data.length > 0 && (
          <Bar
            dataKey="totalDuration"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        )}

        {data.length === 0 && (
          <text
            x="55%"
            y="40%"
            
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#0B0B0BFF"
            fontSize={20}
            fontWeight="500"
          >
            No tasks
          </text>
        )}
      </BarChart>
    </ResponsiveContainer>
  </div>
);


}