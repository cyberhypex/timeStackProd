const express=require('express');
const router=express.Router();

const authMiddleware=require('../Middlewares/auth');
const {createTask,updateTask,deleteTask,getAllTasks,getTask,getDailyGenreStats,getMonthlyGenreStats,getDailyGeminiInsights,getMonthlyGeminiInsights}=require('../Controller/TaskController');

router.post('/createTask',authMiddleware,createTask);
router.put('/updateTask/:id',authMiddleware,updateTask);
router.delete('/deleteTask/:id',authMiddleware,deleteTask);
router.get('/getAllTasks',authMiddleware,getAllTasks);
router.get('/getTask/:id',authMiddleware,getTask);
router.get('/stats/daily-genre',authMiddleware,getDailyGenreStats);
router.get('/stats/monthly-genre',authMiddleware,getMonthlyGenreStats);
router.get('/stats/dailyTaskInsights',authMiddleware,getDailyGeminiInsights);
router.get('/stats/monthlyTaskInsights',authMiddleware,getMonthlyGeminiInsights);
module.exports=router;