"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormAddPost = ({ boardId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = await axios.post("/api/post", {
        boardId: boardId,
        title: title,
        content: content,
      });
      toast.success("New post added.");
      router.refresh();

      // console.log(data);
      setTitle("");
      setContent("");
    } catch (e) {
      // Print error
      print(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      {/* Title */}
      <p className="text-lg font-bold">Create new board!</p>

      {/* Form */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Post title</span>
        </div>
        <input
          required
          type="text"
          placeholder="Post title here 🙋"
          className="input input-bordered w-full"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          maxLength={100}
        />
      </label>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Post content</span>
        </div>
        <textarea
          required
          type="text"
          placeholder="Your post content heree 🙋"
          className=" textarea-bordered textarea w-full"
          onChange={(event) => setContent(event.target.value)}
          value={content}
          maxLength={1000}
        />
      </label>
      {/* Button */}
      <button className="btn btn-primary btn-block" type="submit">
        Create Post
        {isLoading && <span className="loading loading-bars loading-xs"></span>}
      </button>
    </form>
  );
};

export default FormAddPost;
