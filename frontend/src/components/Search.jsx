import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchBlogs from "./SearchBlogs";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [input, setInput] = useState(query || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate(`/search?q=${encodeURIComponent(input.trim())}`);
  };

  return (
    <div className="w-full px-4 py-4 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-3xl mx-auto space-y-2">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search blogs..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {!query ? (
          <h2 className="text-center text-xl text-gray-500">
            Enter a query in the search bar to begin.
          </h2>
        ) : (
          <SearchBlogs query={query} />
        )}
      </div>
    </div>
  );
}

export default Search;
