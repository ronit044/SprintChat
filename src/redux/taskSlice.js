import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  backlogTasks: [],
  todoTasks: [],
  activeTasks: [],
  completedTasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setBacklogTasks(state, action) {
      state.backlogTasks = action.payload;
    },
    setTodoTasks(state, action) {
      state.todoTasks = action.payload;
    },
    setActiveTasks(state, action) {
      state.activeTasks = action.payload;
    },
    setCompletedTasks(state, action) {
      state.completedTasks = action.payload;
    },
  },
});

export const { setBacklogTasks, setTodoTasks, setActiveTasks, setCompletedTasks } = taskSlice.actions;
export default taskSlice.reducer;
