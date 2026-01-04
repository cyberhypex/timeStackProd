const mongoose = require('mongoose');
const TaskType=require('./TaskEnum')

const taskSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UsersTables',
        required:true

    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:false
    },
    type:{
        type:String,
        enum:[TaskType.SPORTS,TaskType.EDUCATION,TaskType.WORK,TaskType.LEISURE,TaskType.GAME,TaskType.OTHER],
        lowercase:true,
        trim:true,
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true  
    },
    duration:{
        type:Number,
    }


});
taskSchema.pre('save',function(next){
    if (this.startTime && this.endTime) {
        const diffMs = this.endTime - this.startTime;
        this.duration = diffMs > 0 ? Math.floor(diffMs / 60000) : 0;
    }
    next();
});


taskSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.startTime && update.endTime) {
        const diffMs = new Date(update.endTime) - new Date(update.startTime);
        update.duration = diffMs > 0 ? Math.floor(diffMs / 60000) : 0;
        this.setUpdate(update);
    }
    next();
});

module.exports=mongoose.model('Tasks',taskSchema);