"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CardPost = ({ post }) => {
  const router = useRouter();
  const handleAdd = async () => {
    try {
      await axios.post("/api/vote", { postId: post._id });
      toast.success("Vote added!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add vote!");
      console.error("Error voting:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/post", {
        data: { postId: post._id },
      });
      toast.success("Post deleted.");
      router.refresh();
    } catch (e) {
      toast.error("Failed to add vote!");
      console.error("Error voting:", error);
    }
  };

  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between gap-6 items-start transition-transform duration-300 ease-in-out transform">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-clip scroll-m-0">
          {post.content}
        </div>
      </div>
      <div className="flex gap-6">
        <button onClick={handleAdd} className="btn btn-warning">
          {post.numberOfVotes}
        </button>
        <button onClick={handleDelete} className="btn btn-error">
          del
        </button>
      </div>
    </li>
  );
};

export default CardPost;
