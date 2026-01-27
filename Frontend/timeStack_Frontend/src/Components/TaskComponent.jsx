import {RaisedButton} from "../Components/RaisedButton"

export default function TaskComponent({
    task,
    onEdit,
    onDelete
}) {
    return (
        <div className="
            w-full bg-blue-50 border border-blue-200 
            rounded-xl p-5 shadow-md mb-4
        ">
            
            <div className="mb-4">
                <h3 className="text-xl font-bold text-blue-700">
                    {task.title}
                </h3>

                {task.description && (
                    <p className=" break-all text-gray-600 mt-1 ">
                        {task.description}
                    </p>
                )}

                <div className="mt-2 text-sm text-blue-600 font-medium">
                    <span className="mr-4">Type: {task.type}</span>
                    <span>Duration: {task.duration} min</span>
                </div>
                <div className="mt-2 text-sm text-blue-600 font-medium">
                   
                    <span>Task start date: {new Date(task.startTime).toLocaleDateString()} </span>
                </div>
                <div className="mt-2 text-sm text-blue-600 font-medium">
                   
                    <span>Task end date: {new Date(task.endTime).toLocaleDateString()} </span>
                </div>
            </div>

           
            <div className="flex gap-4">
                <RaisedButton
                    text="Edit Task"
                    onClick={() => onEdit(task._id)}
                />

                <RaisedButton
                    text="Delete Task"
                    onClick={() => onDelete(task._id)}
                />
            </div>
        </div>
    );
}