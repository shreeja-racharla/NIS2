import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  icon: Icon,
  type = "header",
  error, // Accept an error prop
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Ensure the accordion opens when the error prop changes to true
  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const baseClasses =
    type === "header"
      ? "flex items-center justify-between p-4 border-b cursor-pointer hover:bg-blue-200 transition-colors duration-150 rounded-t-lg"
      : "bg-gray-50 hover:bg-gray-100";

  const headerClasses = error
    ? "bg-red-100 border-red-500 text-red-900" // Red color for errors
    : "bg-blue-100 text-blue-900"; // Default color

  const textClasses =
    type === "header"
      ? "text-xl font-bold"
      : "text-lg font-semibold";

  return (
    <div
      className={`border ${
        type === "header" ? "rounded-lg mb-4" : "rounded-md"
      }`}
    >
      <button
        onClick={toggleAccordion}
        className={`w-full p-4 flex justify-between items-center ${baseClasses} ${headerClasses} transition-all`}
      >
        <div className="flex items-center space-x-2">
          {Icon && <Icon className={`h-6 w-6 ${error ? "text-red-600" : "text-blue-600"}`} />}
          <span className={textClasses}>{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className={`h-6 w-6 ${error ? "text-red-900" : "text-blue-900"}`} />
        ) : (
          <ChevronDown className={`h-6 w-6 ${error ? "text-red-900" : "text-blue-900"}`} />
        )}
      </button>

      {isOpen && (
        <div className={`p-4 ${type === "header" ? "space-y-4" : "space-y-2"}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;


