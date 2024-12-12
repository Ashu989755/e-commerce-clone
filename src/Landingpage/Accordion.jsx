import { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white mb-3 shadow rounded-md mt-5">
      <button  className="flex items-center justify-between w-full p-4 duration-300 text-dark_link font-semibold text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="#303030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
      </button>
      {isOpen && (
        <div className="p-4 pt-0">
            <p className='text-sm text-main_gray'>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
