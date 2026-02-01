import { useState } from "react";
import { RaisedButton } from "../Components/RaisedButton";
import { FaBrain } from "react-icons/fa";
import api from "../axios";

export function DailyAIInsights() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleGetAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("task/stats/dailyTaskInsights");

      setSummary(response.data.summary);
      setInsight(response.data.insight);
    } catch (err) {
      console.error("Error fetching daily AI insights:", err);

      setError(
        err.response?.status === 503
          ? "AI service is temporarily unavailable. Please try again later."
          : "Failed to fetch daily AI insights."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white pt-24 px-4 sm:px-8 lg:px-10 flex justify-center">
      <div
        className="
          max-w-3xl w-full 
          bg-blue-50 border border-blue-200 
          rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10
        "
      >
        <div className="flex items-center gap-4 mb-6">
          <FaBrain className="text-blue-600 text-3xl sm:text-4xl" />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
            Daily AI Insights
          </h1>
        </div>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
          Get a personalized productivity analysis based on how you spent
          your time today. Understand what took the most time, what was
          underutilized, and how you can improve tomorrow.
        </p>

        <div className="mb-8">
          <RaisedButton
            text={loading ? "Loading..." : "Get today's analysis"}
            onClick={handleGetAnalysis}
            disabled={loading}
          />
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-100 text-red-700 font-medium">
            {error}
          </div>
        )}

        {summary && (
          <div className="mt-6 bg-white rounded-xl p-5 sm:p-6 shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-4">
              Today’s Summary
            </h2>

            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Total Minutes:</span>{" "}
              {summary.totalMinutes}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-blue-100 text-blue-800">
                <p className="font-semibold">Most Time Spent</p>
                <p className="capitalize">
                  {summary.longestCategory.type} –{" "}
                  {summary.longestCategory.totalDuration} min
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-100 text-red-800">
                <p className="font-semibold">Least Time Spent</p>
                <p className="capitalize">
                  {summary.shortestCategory.type} –{" "}
                  {summary.shortestCategory.totalDuration} min
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {summary.breakdown.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-gray-700 text-sm sm:text-base"
                >
                  <span className="capitalize">{item.type}</span>
                  <span>{item.totalDuration} min</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {insight && (
  <div className="mt-6 bg-white rounded-xl p-5 sm:p-6 shadow-md">
    <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-5">
      AI Insight
    </h2>

    <div className="space-y-4">
      {insight
        .split(/\n\n(?=\d+\.)/)
        .map((section, index) => {
          const [titleLine, ...rest] = section.split("\n");
          return (
            <div
              key={index}
              className="p-4 rounded-lg bg-blue-50 border border-blue-200"
            >
              <p className="font-semibold text-blue-700 mb-2">
                {titleLine}
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {rest.join(" ")}
              </p>
            </div>
          );
        })}
    </div>
  </div>
)}

      </div>
    </div>
  );
}
