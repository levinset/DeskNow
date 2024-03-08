// SearchBar
import React, { useState } from "react";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        placeholder="Search by ID, Label, Equipment, Row, or Column, comment, user"
        className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-20"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
