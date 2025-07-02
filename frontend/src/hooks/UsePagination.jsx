import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function usePagination(path, queryParams = {}, limit = 4, page = 1) {
  const [hasMore, setHasMore] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/${path}`, {
          params: { ...queryParams, limit, page },
        });

        if (path.includes("blogs")) {
          setBlogs(res.data.blogs || []);
        } else if (path.includes("users")) {
          setUsers(res.data.users || []);
        }

        setHasMore(res?.data?.hasMore || false);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch data");
        navigate(-1);
        setBlogs([]);
        setUsers([]);
        setHasMore(false);
      }
    }
    fetchData();
  }, [path, JSON.stringify(queryParams), limit, page]);

  return { blogs, users, hasMore };
}

export default usePagination;
