// src/utils/blogUtils.js
import axios from "axios";
import { toast } from "react-hot-toast";

export async function handleSaveBlog(id, token) {
  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/save-blog/${id}`, {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
    );
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch blog");
  }
}
