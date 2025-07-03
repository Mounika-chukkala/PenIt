import React, { useState } from "react";
import DisplayBlogs from "./DisplayBlogs";
import usePagination from "../hooks/UsePagination";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function SearchBlogs({ query }) {
  const [type, setType] = useState("blogs");
  const [page, setPage] = useState(1);

  const queryObj = { search: query };
  const { blogs, users, hasMore } = usePagination(
    type === "blogs" ? "search-blogs" : "search-users",
    queryObj,
    3,
    page
  );

  return (
    <div className="space-y-2">
      <div className="flex gap-4 text-sm">
        <button
          onClick={() => {
            setType("blogs");
            setPage(1);
          }}
          className={`px-4 cursor-pointer py-1.5  ${
            type === "blogs" ? "border-b-2 border-blue-600 " : " text-gray-700"
          }`}
        >
          Blogs
        </button>
        <button
          onClick={() => {
            setType("users");
            setPage(1);
          }}
          className={`px-4 cursor-pointer py-1.5  ${
            type === "users" ? "border-b-2 border-blue-600 " : " text-gray-700"
          }`}
        >
          People
        </button>
      </div>

      <h1 className="text-xl font-semibold text-gray-700">
        Results for <span className="text-black">{query}</span>
      </h1>

      {type === "blogs" ? (
        blogs.length > 0 ? (
          <div className="flex flex-col items-end  mb-10">
            <DisplayBlogs blogs={blogs} />
            <div className="text-center flex gap-1">
              <button disabled={page == 1}>
                <ChevronLeft
                  size={30}
                  onClick={() => setPage((prev) => prev - 1)}
                  className={`rounded-full ${
                    page == 1 ? "text-slate-400" : "text-blue-700"
                  } font-extrabold text-3xl`}
                />
              </button>
              <button disabled={!hasMore}>
                <ChevronRight
                  size={30}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={` ${
                    !hasMore ? "text-slate-400" : "text-blue-700"
                  } font-extrabold  text-3xl`}
                />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No blogs found.</p>
        )
      ) : users?.length > 0 ? (
        <div className="space-y-2 flex flex-col items-end">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex w-full items-center gap-4 p-3 rounded-md bg-white shadow-sm"
            >
              <img
                src={
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user.username}` ||
                  user.name[0]
                }
                className="bg-blue-100 text-blue-700 w-10 h-10  flex items-center justify-center rounded-full font-bold"
              />

              <div>
                <p className="font-medium text-gray-800">
                  <Link to={`/${user.username}`}> {user.name} </Link>
                  <span className="text-sm text-gray-500">
                    @{user.username}
                  </span>
                </p>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </div>
          ))}
          <div className="text-center flex gap-1">
            <button disabled={page == 1}>
              <ChevronLeft
                size={30}
                onClick={() => setPage((prev) => prev - 1)}
                className={`rounded-full ${
                  page == 1 ? "text-slate-400" : "text-blue-700"
                } font-extrabold text-3xl`}
              />
            </button>
            <button disabled={!hasMore}>
              <ChevronRight
                size={30}
                onClick={() => setPage((prev) => prev + 1)}
                className={` ${
                  !hasMore ? "text-slate-400" : "text-blue-700"
                } font-extrabold  text-3xl`}
              />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No users found.</p>
      )}
    </div>
  );
}

export default SearchBlogs;
