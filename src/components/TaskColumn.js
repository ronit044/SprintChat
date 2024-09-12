"use client";
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';
import { FaPlus } from 'react-icons/fa';

const TaskColumn = ({ title, tasks = [], onTaskMove, onTaskAdd, type, mode }) => {
  const [newTask, setNewTask] = useState('');

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskMove(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = { task: newTask.trim() };
      onTaskAdd(task, type);
      setNewTask('');
    }
  };

  return (
    <div
      ref={drop}
      className={`p-4 flex flex-col w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] min-h-[300px] rounded-lg shadow-lg border ${mode === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} ${
        isOver ? 'bg-blue-100' : ''
      } transition-all duration-300 ease-in-out mx-2 my-4`}
    >
      <h2 className={`text-base sm:text-lg md:text-xl font-bold mb-4 border-b pb-2 animate-text ${
        mode === 'dark' ? 'text-white' : 'text-gray-800'
      }`}>
        {title} ({tasks.length})
      </h2>

      {/* Task List */}
      {tasks.map((task, index) => (
        <TaskItem key={index} task={task} mode={mode} />
      ))}

      {/* Add New Task */}
      <div className="mt-4 flex flex-col">
        <textarea
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          rows="2" // Starting height
          className={`p-2 w-full resize-none overflow-y-auto rounded-md ${mode === 'dark' ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'} 
            border border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300`}
          style={{ maxHeight: '150px' }} // Limits the textarea height
        />
        <button
          onClick={handleAddTask}
          className={`mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center`}
        >
          <FaPlus className="mr-1" /> Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskColumn;
