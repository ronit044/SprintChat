"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from '../components/TaskColumn';
import DeleteZone from '../components/DeleteZone';
import { fetchTasks, addTask, deleteTask, createTask } from '@/utils/firbaseUtils';
import Loader from '@/components/loader';
import { useAuth } from '@/components/authComponents/authProvider';
import { setBacklogTasks, setTodoTasks, setActiveTasks, setCompletedTasks } from '@/redux/taskSlice'; 
import { toast } from 'react-toastify';
const Home = () => {
  const { isLoggedIn, loading } = useAuth();
  const uid = useSelector((state) => state.auth.user.uid);
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const backlogTasks = useSelector((state) => state.tasks.backlogTasks);
  const todoTasks = useSelector((state) => state.tasks.todoTasks);
  const activeTasks = useSelector((state) => state.tasks.activeTasks);
  const completedTasks = useSelector((state) => state.tasks.completedTasks);

  useEffect(() => {
    if (!isLoggedIn) {
      const emptyTasks = async () => {
        dispatch(setBacklogTasks( [] ));
          dispatch(setTodoTasks([]));
          dispatch(setActiveTasks( []));
          dispatch(setCompletedTasks( []));
      }
      emptyTasks();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && uid) {
      const loadTasks = async () => {
        try {
          const tasks = await fetchTasks(uid);
          dispatch(setBacklogTasks(tasks.backlog || []));
          dispatch(setTodoTasks(tasks.todo || []));
          dispatch(setActiveTasks(tasks.active || []));
          dispatch(setCompletedTasks(tasks.completed || []));
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      loadTasks();
    }
  }, [isLoggedIn, uid, dispatch]);

  const onTaskMove = async (task, targetColumn) => {
    const { task: taskItem } = task;
    if (
      (targetColumn === 'backlog' && backlogTasks.includes(taskItem)) ||
      (targetColumn === 'todo' && todoTasks.includes(taskItem)) ||
      (targetColumn === 'active' && activeTasks.includes(taskItem)) ||
      (targetColumn === 'completed' && completedTasks.includes(taskItem))
    ) {
      toast.error("Task already exists in the target column.");
      return;
    }

    dispatch(setBacklogTasks(backlogTasks.filter((t) => t !== taskItem)));
    dispatch(setTodoTasks(todoTasks.filter((t) => t !== taskItem)));
    dispatch(setActiveTasks(activeTasks.filter((t) => t !== taskItem)));
    dispatch(setCompletedTasks(completedTasks.filter((t) => t !== taskItem)));

    switch (targetColumn) {
      case 'backlog':
        dispatch(setBacklogTasks([...backlogTasks, taskItem]));
        break;
      case 'todo':
        dispatch(setTodoTasks([...todoTasks, taskItem]));
        break;
      case 'active':
        dispatch(setActiveTasks([...activeTasks, taskItem]));
        break;
      case 'completed':
        dispatch(setCompletedTasks([...completedTasks, taskItem]));
        break;
      default:
        break;
    }

    if (isLoggedIn && uid) {
      try {
        await addTask(uid, taskItem, targetColumn);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const onTaskAdd = async (task, column) => {
    const { task: taskItem } = task;

    if (isLoggedIn) {
      try {
        await createTask(uid, taskItem, column);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }

    // Add task to the column
    switch (column) {
      case 'backlog':
        dispatch(setBacklogTasks([...backlogTasks, taskItem]));
        break;
      case 'todo':
        dispatch(setTodoTasks([...todoTasks, taskItem]));
        break;
      case 'active':
        dispatch(setActiveTasks([...activeTasks, taskItem]));
        break;
      case 'completed':
        dispatch(setCompletedTasks([...completedTasks, taskItem]));
        break;
      default:
        break;
    }
  };

  const onTaskDelete = async (task) => {
    const { task: taskItem } = task;

    // Remove task from all columns
    dispatch(setBacklogTasks(backlogTasks.filter((t) => t !== taskItem)));
    dispatch(setTodoTasks(todoTasks.filter((t) => t !== taskItem)));
    dispatch(setActiveTasks(activeTasks.filter((t) => t !== taskItem)));
    dispatch(setCompletedTasks(completedTasks.filter((t) => t !== taskItem)));

    if (isLoggedIn && uid) {
      try {
        await deleteTask(uid, taskItem);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Backlog"
              tasks={backlogTasks}
              onTaskMove={onTaskMove}
              onTaskAdd={onTaskAdd}
              type="backlog"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="To Do"
              tasks={todoTasks}
              onTaskMove={onTaskMove}
              onTaskAdd={onTaskAdd}
              type="todo"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Active"
              tasks={activeTasks}
              onTaskMove={onTaskMove}
              onTaskAdd={onTaskAdd}
              type="active"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
              onTaskMove={onTaskMove}
              onTaskAdd={onTaskAdd}
              type="completed"
              mode={mode}
            />
          </div>
        </div>
        <DeleteZone onDelete={onTaskDelete} />
      </div>
    </DndProvider>
  );
};

export default Home;
