import React from 'react';
import { useDrop } from 'react-dnd';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteZone = ({ onDelete, selectedTasks }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onDelete(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full shadow-lg border-2 ${
        isOver ? 'bg-red-500 border-red-700' : 'bg-white border-gray-300'
      } transition-all duration-300 ease-in-out cursor-pointer z-50`}
    >
      <FaTrashAlt size={24} color={isOver ? 'white' : 'red'} />
    </div>
  );
};

export default DeleteZone;

