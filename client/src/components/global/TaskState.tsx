import { useState } from "react";

const STATUS_LIST = ['Not Started', 'In Progress', 'Completed'];

export default function TaskState({ id, initialStatus = 'Not Started' }) {
  const statusStyles = {
    'Not Started': 'px-[12px] py-[6px] text-[12px] rounded-[3px] bg-gray-300 bg-opacity-50 text-gray-300',
    'In Progress': 'px-[12px] py-[6px] text-[12px] rounded-[3px] bg-blue-700 bg-opacity-50 text-blue-700',
    'Completed': 'px-[12px] py-[6px] text-[12px] rounded-[3px] bg-green-700 bg-opacity-50 text-green-700',
  };

  // Initial state
  const [status, setStatus] = useState(initialStatus);

  // Handle status change
  const handleChange = () => {
    const currentIndex = STATUS_LIST.indexOf(status);
    const nextIndex = (currentIndex + 1) % STATUS_LIST.length;
    setStatus(STATUS_LIST[nextIndex]);
  };

  return (
    <div
      className={statusStyles[status]} // Apply the style based on the current status
      onClick={handleChange} // Change status on click
      role="button"
      aria-label={`Task status: ${status}`}
      title={`Click to change status: ${status}`}
    >
      {status}
    </div>
  );
}
