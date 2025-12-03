import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { addTask, deleteTask, fetchTask } from "../store";

export const Todo = () => {

    const [task, setTask] = useState("");

    const tasks = useSelector((state) => state.task);
    // console.log("react states", state.task);

    const dispatch = useDispatch();

    // handle handleFormSubmit 
    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addTask(task));
        return setTask("");
    };

    // handle handleTaskDelete 
    const handleTaskDelete = (id) => {
        return dispatch(deleteTask(id));
    };

    const handleFetchTasks = () => {
        dispatch(fetchTask());
    };
    

    return (
        <div className="container">
            <div className="todo-app">
                <h1>
                    <i className="fa-regular fa-pen-to-square"></i>To-do List:
                </h1>
                <div className="row">
                    <form onSubmit={handleFormSubmit}>
                        <input 
                        type="text" 
                        id="input-box" 
                        placeholder="Add a new task" 
                        value={task}
                        onChange={(e) => setTask(e.target.value)}    
                        />
                        <button>Add Task</button>
                    </form>
                </div>

                <button onClick={handleFetchTasks}>Fetch Tasks</button>

                <ul id="list-container">
                    {
                        tasks.map((curTask, index) => {
                            return (
                                <li key={index}>
                                    <p>{index}: {curTask}</p>
                                    <div>
                                        <MdDeleteForever
                                         className="icon-style"
                                         onClick={() => handleTaskDelete(index)}
                                         />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};