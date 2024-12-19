import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-6">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-10/12 p-2 pl-4 pr-10 rounded border border-gray-300"
        />
        {searchTerm && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
