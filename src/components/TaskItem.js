import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, mode }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 rounded shadow-sm mb-2 border ${mode === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'} ${
        isDragging ? 'opacity-50' : 'opacity-100'
      } transition-opacity duration-300 ease-in-out`}
    >
      {task}
    </div>
  );
};

export default TaskItem;
