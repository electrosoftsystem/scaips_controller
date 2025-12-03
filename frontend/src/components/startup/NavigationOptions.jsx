import React from "react";

const NavigationOptions = ({ selectedOption, onOptionSelect, compact = false }) => {
  const options = ["Industry", "Projects", "Jobs", "Address"];
  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="flex flex-col gap-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onOptionSelect(option)}
              className={`px-2 py-1.5 rounded text-xs font-medium transition-colors duration-200 text-left ${
                selectedOption === option
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onOptionSelect(option)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            selectedOption === option
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default NavigationOptions;
