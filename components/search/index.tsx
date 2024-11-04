import React from 'react';

const SearchBox: React.FC<{ searchTerm: string, onSearch: (value: string) => void }> = ({ searchTerm, onSearch }) => {
    return (
      <div className="flex justify-center my-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a7 7 0 100 14 7 7 0 000-14zm6.707 11.293l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387a8.963 8.963 0 01-1.83.793 8.963 8.963 0 01-1.83-.793l-4.387 4.387a1 1 0 01-1.414-1.414l4.387-4.387A8.963 8.963 0 0111 18a8.963 8.963 0 011.293-.293z"
            />
          </svg>
        </div>
      </div>
    );
  };

  export default SearchBox;