const TaskModel=require('../Models/TaskSchema');
const mongoose=require('mongoose');

const {getGeminiInsights}=require('../services/geminiService');


const createTask = async (req, res) => {
  //  console.log("Decoded user:", req.user);

    const userId = req.user.userId; 
   // console.log("User ID from token:", userId);

    const { title, description, type, startTime, endTime } = req.body;

    try {
        if (!title || !startTime || !endTime) {
            return res.status(400).json({ message: "Please provide required fields" });
        }

        const newTask = await TaskModel.create({
            title,
            description,
            type,
            startTime,
            endTime,
            userId
        });

        return res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const updateTask = async (req, res) => {
    const taskId = req.params.id;          
    const userId = req.user.userId;        

   // console.log("Updating task:", taskId, "for user:", userId);

    const { title, description, type, startTime, endTime } = req.body;

    try {
        
        const task = await TaskModel.findOne({
            _id: taskId,
            userId: userId
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        if (title) task.title = title;
        if (description !== undefined) task.description = description;
        if (type) task.type = type;
        if (startTime) task.startTime = startTime;
        if (endTime) task.endTime = endTime;

        await task.save();

        return res.status(200).json({
            message: "Task updated successfully",
            task
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const task = await TaskModel.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        return res.status(200).json({ message: "Task deleted successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({ userId: req.user.userId }).sort({ startTime: -1 });

        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: tasks
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getTask=async(req,res)=>{

    try{
        const {id}=req.params;
        const task=await TaskModel.findById(id);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }   
        return res.status(200).json({message:"Task fetched successfully",task});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
 }
const getDailyGenreStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    
    const nowUTC = new Date();
    const IST_OFFSET = 330 * 60 * 1000;
    const nowIST = new Date(nowUTC.getTime() + IST_OFFSET);

    
    const year = nowIST.getFullYear();
    const month = nowIST.getMonth();
    const date = nowIST.getDate();

    
    const startOfDay = new Date(Date.UTC(year, month, date, 0, -330, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, date, 23, 29, 59, 999));
    console.log(startOfDay,endOfDay);

    const stats = await TaskModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          startTime: { $lte: endOfDay },
          endTime: { $gte: startOfDay }
        }
      },
      {
        $project: {
          type: 1,
          effectiveStart: {
            $cond: [
              { $lt: ["$startTime", startOfDay] },
              startOfDay,
              "$startTime"
            ]
          },
          effectiveEnd: {
            $cond: [
              { $gt: ["$endTime", endOfDay] },
              endOfDay,
              "$endTime"
            ]
          }
        }
      },
      {
        $project: {
          type: 1,
          duration: {
            $divide: [
              { $subtract: ["$effectiveEnd", "$effectiveStart"] },
              60000
            ]
          }
        }
      },
      {
        $group: {
          _id: "$type",
          totalDuration: { $sum: "$duration" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalDuration: { $round: ["$totalDuration", 0] }
        }
      }
    ]);

    res.status(200).json({ stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getMonthlyGenreStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const IST_OFFSET_MINUTES = 330;

    
    const nowUTC = new Date();
    const nowIST = new Date(nowUTC.getTime() + IST_OFFSET_MINUTES * 60000);

    const year = nowIST.getFullYear();
    const month = nowIST.getMonth(); 

  
    const startOfMonth = new Date(
      Date.UTC(year, month, 1, 0, -IST_OFFSET_MINUTES, 0, 0)
    );

    const endOfMonth = new Date(
      Date.UTC(year, month + 1, 0, 23, 59 - IST_OFFSET_MINUTES, 59, 999)
    );

    const statsForMonth = await TaskModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          startTime: { $lte: endOfMonth },
          endTime: { $gte: startOfMonth }
        }
      },
      {
        $project: {
          type: 1,
          effectiveStart: {
            $cond: [
              { $lt: ["$startTime", startOfMonth] },
              startOfMonth,
              "$startTime"
            ]
          },
          effectiveEnd: {
            $cond: [
              { $gt: ["$endTime", endOfMonth] },
              endOfMonth,
              "$endTime"
            ]
          }
        }
      },
      {
        $project: {
          type: 1,
          duration: {
            $divide: [
              { $subtract: ["$effectiveEnd", "$effectiveStart"] },
              60000
            ]
          }
        }
      },
      {
        $group: {
          _id: "$type",
          totalDuration: { $sum: "$duration" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalDuration: { $round: ["$totalDuration", 0] }
        }
      },
      {
        $sort: { totalDuration: -1 }
      }
    ]);

    res.status(200).json({ stats: statsForMonth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getMonthlyGeminiInsights = async (req, res) => {
  try {
    const userId = req.user.userId;

    const IST_OFFSET_MINUTES = 330;

    const nowUTC = new Date();
    const nowIST = new Date(nowUTC.getTime() + IST_OFFSET_MINUTES * 60000);

    const year = nowIST.getFullYear();
    const month = nowIST.getMonth();

    const startOfMonth = new Date(
      Date.UTC(year, month, 1, 0, -IST_OFFSET_MINUTES, 0, 0)
    );

    const endOfMonth = new Date(
      Date.UTC(year, month + 1, 0, 23, 59 - IST_OFFSET_MINUTES, 59, 999)
    );

    const stats = await TaskModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          startTime: { $lte: endOfMonth },
          endTime: { $gte: startOfMonth }
        }
      },
      {
        $project: {
          type: 1,
          effectiveStart: {
            $cond: [
              { $lt: ["$startTime", startOfMonth] },
              startOfMonth,
              "$startTime"
            ]
          },
          effectiveEnd: {
            $cond: [
              { $gt: ["$endTime", endOfMonth] },
              endOfMonth,
              "$endTime"
            ]
          }
        }
      },
      {
        $project: {
          type: 1,
          duration: {
            $divide: [
              { $subtract: ["$effectiveEnd", "$effectiveStart"] },
              60000
            ]
          }
        }
      },
      {
        $group: {
          _id: "$type",
          totalDuration: { $sum: "$duration" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalDuration: { $round: ["$totalDuration", 0] }
        }
      }
    ]);

    if (!stats.length) {
      return res.status(200).json({
        summary: {
          month: `${year}-${String(month + 1).padStart(2, "0")}`,
          totalMinutes: 0,
          breakdown: []
        },
        insight: "No tasks were recorded this month, so no productivity analysis is available."
      });
    }

    const totalMinutes = stats.reduce((sum, s) => sum + s.totalDuration, 0);

    const longest = stats.reduce((a, b) =>
      a.totalDuration > b.totalDuration ? a : b
    );

    const shortest = stats.reduce((a, b) =>
      a.totalDuration < b.totalDuration ? a : b
    );

    const summary = {
      month: `${year}-${String(month + 1).padStart(2, "0")}`,
      totalMinutes,
      breakdown: stats,
      longestCategory: longest,
      shortestCategory: shortest
    };

    const prompt = `
You are a productivity coach.

Here is a user's MONTHLY activity summary in JSON:
${JSON.stringify(summary, null, 2)}

Analyze and respond with:
1. Overall time distribution across the month
2. Whether the balance between work, rest, and activity is sustainable
3. Any long-term imbalance or risk pattern
4. One clear, practical improvement suggestion for the next month

Rules:
- Be specific to the data
- Focus on trends, not single-day behavior
- No generic advice
- No emojis
`;

    try {
      const insight = await getGeminiInsights(prompt);

      return res.status(200).json({
        summary,
        insight
      });
    } catch (err) {
      console.error(err);

      if (
        err.status === 503 ||
        err.message?.includes("overloaded") ||
        err.message?.includes("UNAVAILABLE")
      ) {
        return res.status(503).json({
          summary,
          insight: "AI service is temporarily unavailable. Please try again later."
        });
      }

      return res.status(500).json({
        message: "Failed to generate monthly productivity insight"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getDailyGeminiInsights = async (req, res) => {
  try {
    const userId = req.user.userId;

    const nowUTC = new Date();
    const IST_OFFSET = 330 * 60 * 1000;
    const nowIST = new Date(nowUTC.getTime() + IST_OFFSET);

    const year = nowIST.getFullYear();
    const month = nowIST.getMonth();
    const date = nowIST.getDate();

    const startOfDay = new Date(Date.UTC(year, month, date, 0, -330, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month, date, 23, 29, 59, 999));

    const stats = await TaskModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          startTime: { $lte: endOfDay },
          endTime: { $gte: startOfDay }
        }
      },
      {
        $project: {
          type: 1,
          effectiveStart: {
            $cond: [
              { $lt: ["$startTime", startOfDay] },
              startOfDay,
              "$startTime"
            ]
          },
          effectiveEnd: {
            $cond: [
              { $gt: ["$endTime", endOfDay] },
              endOfDay,
              "$endTime"
            ]
          }
        }
      },
      {
        $project: {
          type: 1,
          duration: {
            $divide: [
              { $subtract: ["$effectiveEnd", "$effectiveStart"] },
              60000
            ]
          }
        }
      },
      {
        $group: {
          _id: "$type",
          totalDuration: { $sum: "$duration" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalDuration: { $round: ["$totalDuration", 0] }
        }
      }
    ]);

    if (!stats.length) {
      return res.status(200).json({
        summary: {
          date: nowIST.toISOString().split("T")[0],
          totalMinutes: 0,
          breakdown: []
        },
        insight: "No tasks were recorded today, so no productivity analysis is available."
      });
    }

    const totalMinutes = stats.reduce((sum, s) => sum + s.totalDuration, 0);

    const longest = stats.reduce((a, b) =>
      a.totalDuration > b.totalDuration ? a : b
    );

    const shortest = stats.reduce((a, b) =>
      a.totalDuration < b.totalDuration ? a : b
    );

    const summary = {
      date: nowIST.toISOString().split("T")[0],
      totalMinutes,
      breakdown: stats,
      longestCategory: longest,
      shortestCategory: shortest
    };

    const prompt = `
You are a productivity coach.

Here is a user's DAILY activity summary in JSON:
${JSON.stringify(summary, null, 2)}

Analyze and respond with:
1. Where most time was spent
2. Whether that distribution is healthy
3. Which category may be under-allocated
4. One clear, practical improvement suggestion

Rules:
- Be specific to the data
- No generic advice
- No emojis
`;

    try {
      const insight = await getGeminiInsights(prompt);

      return res.status(200).json({
        summary,
        insight
      });
    } catch (err) {
      console.error(err);

      if (err.status === 503 || err.message?.includes("overloaded") || err.message?.includes("UNAVAILABLE")) {
        return res.status(503).json({
          summary,
          insight: "AI service is temporarily unavailable. Please try again later."
        });
      }

      return res.status(500).json({
        message: "Failed to generate productivity insight"
      });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



      

      



module.exports={createTask,updateTask,deleteTask,getAllTasks,getTask,getDailyGenreStats,getMonthlyGenreStats,getDailyGeminiInsights,getMonthlyGeminiInsights}