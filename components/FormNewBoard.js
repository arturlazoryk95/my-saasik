"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", {
        name: name,
      });
      toast.success("New board added.");
      router.refresh();

      // console.log(data);
      setName("");
    } catch (e) {
      // Print error
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
          <span className="label-text">Board name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Type name of your Co. here 🙋"
          className="input input-bordered w-full"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
      </label>
      {/* Button */}
      <button className="btn btn-primary btn-block" type="submit">
        Create board
        {isLoading && <span className="loading loading-bars loading-xs"></span>}
      </button>
    </form>
  );
};

export default FormNewBoard;
