const TaskModel=require('../Models/TaskSchema');
const mongoose=require('mongoose');


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

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Start date",startOfDay)
    console.log("End date",endOfDay)

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


const getMonthlyGenreStats=async(req,res)=>{
    try{
        const userId=req.user.userId;
        const startOfMonth=new Date();
        startOfMonth.setUTCDate(1);
        startOfMonth.setUTCHours(0,0,0,0);

        const endOfMonth=new Date();
        startOfMonth.getFullYear();
        startOfMonth.getMonth()+1;
        endOfMonth.setUTCHours(23,59,59,999);
        const statsForMonth=await TaskModel.aggregate([
            {
                $match:{
                    userId:new mongoose.Types.ObjectId(userId),
                    startTime:{
                        $gte:startOfMonth,
                        $lte:endOfMonth
                    }
                }
            },
            {
                $group:{
                    _id:"$type",
                    totalDuration:{$sum:"$duration"}
                }
            },
            {
                $project:{
                    _id:0,
                    type:"$_id",
                    totalDuration:1
                }
            },
            {
                $sort:{totalDuration:1}
            }
        ]);
        res.status(200).json({stats:statsForMonth});
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports={createTask,updateTask,deleteTask,getAllTasks,getTask,getDailyGenreStats,getMonthlyGenreStats};