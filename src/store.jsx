import { configureStore, createSlice } from "@reduxjs/toolkit";

/* eslint-disable no-case-declarations */
const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASKS = "task/fetch";


const initialState = {
    task: [],
    isLoading: false,
};

// Step 5: Create action creators
export const addTask = (data) => {
   return { type: ADD_TASK, payload: data }
}; 

export const deleteTask = (id) => {
    return { type: DELETE_TASK, payload: id }
};

export const fetchTask = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=3"
            );
            const task = await res.json();
            console.log(task);
            
            dispatch({ 
                type: FETCH_TASKS, 
                payload: task.map((curTask) => curTask.title),
             });
        } catch (error) {
            console.log(error);
        }
    }
};


// Step 1: Create a simple reducer function 
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ... state,
                task: [... state.task, action.payload],
            };

        case DELETE_TASK:
            const updatedTask = state.task.filter((curTask, index) => index !== action.payload); 
               return {
                ...state,
                task: updatedTask,
               };

        case FETCH_TASKS: 
            return {
                ...state,
                task:[... state.task, ...action.payload],
            }       
        default:
            return state;
    }
};

export const store = configureStore({
    reducer: {
        taskReducer,
    },
});


// Step 3: Log the initial state 
console.log("initial State: ", store.getState());

// Step 4: Dispatch an action to add a task 
store.dispatch(addTask("Good Morning!"));
store.dispatch(addTask("Good Afternoon!"));
store.dispatch(addTask("Good Night"));
console.log("updated State: ", store.getState());






