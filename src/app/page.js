"use client"
import React, { useState } from 'react';
import TaskColumn from '../components/TaskColumn';
import DeleteZone from '../components/DeleteZone';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
  const mode = useSelector((state) => state.theme.mode);

  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const onTaskMove = (task, targetColumn) => {
    const { task: taskItem } = task;

    // Remove task from all columns
    setBacklogTasks((prev) => prev.filter((t) => t !== taskItem));
    setTodoTasks((prev) => prev.filter((t) => t !== taskItem));
    setActiveTasks((prev) => prev.filter((t) => t !== taskItem));
    setCompletedTasks((prev) => prev.filter((t) => t !== taskItem));

    // Add task to the target column
    switch (targetColumn) {
      case 'backlog':
        setBacklogTasks((prev) => [...prev, taskItem]);
        break;
      case 'todo':
        setTodoTasks((prev) => [...prev, taskItem]);
        break;
      case 'active':
        setActiveTasks((prev) => [...prev, taskItem]);
        break;
      case 'completed':
        setCompletedTasks((prev) => [...prev, taskItem]);
        break;
      default:
        break;
    }
  };

  const onTaskDelete = (task) => {
    const { task: taskItem } = task;

    setBacklogTasks((prev) => prev.filter((t) => t !== taskItem));
    setTodoTasks((prev) => prev.filter((t) => t !== taskItem));
    setActiveTasks((prev) => prev.filter((t) => t !== taskItem));
    setCompletedTasks((prev) => prev.filter((t) => t !== taskItem));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen`}>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Backlog"
              tasks={backlogTasks}
              setTasks={setBacklogTasks}
              onTaskMove={onTaskMove}
              type="backlog"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="To Do"
              tasks={todoTasks}
              setTasks={setTodoTasks}
              onTaskMove={onTaskMove}
              type="todo"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Active"
              tasks={activeTasks}
              setTasks={setActiveTasks}
              onTaskMove={onTaskMove}
              type="active"
              mode={mode}
            />
          </div>
          <div className="flex-1 min-w-[250px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <TaskColumn
              title="Completed"
              tasks={completedTasks}
              setTasks={setCompletedTasks}
              onTaskMove={onTaskMove}
              type="completed"
              mode={mode}
            />
          </div>
        </div>
        <DeleteZone onDelete={onTaskDelete} />
      </div>
    </DndProvider>
  );
}
