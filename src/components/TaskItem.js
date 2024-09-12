import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = ({ task, mode }) => {
  const [expanded, setExpanded] = useState(false);
  const textareaRef = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleToggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = expanded ? `${textareaRef.current.scrollHeight}px` : '24px';
    }
  }, [expanded]);

  return (
    <div
      ref={(node) => drag(node)} // Ensure the div is draggable
      onClick={handleToggleExpand}
      className={`p-2 rounded shadow-sm mb-2 border cursor-pointer ${
        mode === 'dark' ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'
      } ${isDragging ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300 ease-in-out`}
      style={{ position: 'relative', cursor: 'grab' }} // Ensure positioning for draggable
    >
      <textarea
        ref={textareaRef}
        readOnly
        value={task}
        className={`w-full bg-transparent border-none resize-none overflow-hidden ${
          mode === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
        style={{
          whiteSpace: 'pre-wrap',
          transition: 'height 0.3s ease',
          cursor: 'default', // Hide text cursor
          userSelect: 'none', // Prevent text selection
          caretColor: 'transparent', // Hide caret
        }}
      />
    </div>
  );
};

export default TaskItem;
