import React from 'react';

interface Props {
  handleClick: () => void;
  text:string;
}

const StickyButton = ({handleClick, text}:Props) => {
  return (
    <div className="fixed bottom-4 right-6">
      <button 
        onClick={handleClick}
        className="bg-white text-lg font-bold text-black py-2 px-4 rounded-full shadow-lg border-2 border-gray-300 hover:bg-gray-100">
        {text}
      </button>
    </div>
  );
};

export default StickyButton;
