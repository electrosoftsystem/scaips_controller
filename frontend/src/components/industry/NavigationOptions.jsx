import React from "react";

const NavigationOptions = ({ selectedOption, onOptionSelect, options, className = "" }) => {
  return (
    <div className="bg-white border-t sticky top-0 z-10 shadow-sm">
      <div className="max-w-screen-xl mx-auto">
        <div className={`flex gap-1 ${className} hide-scrollbar`}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionSelect(option)}
              className={`flex items-center px-6 py-4 text-[15px] font-medium transition-all duration-200 whitespace-nowrap border-b-[3px] hover:bg-gray-50 ${
                selectedOption === option
                  ? "text-blue-600 border-blue-600 bg-blue-50/40"
                  : "text-gray-600 border-transparent hover:border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
          overflow-x: auto;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default NavigationOptions;
