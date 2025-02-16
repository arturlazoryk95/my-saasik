"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", {
        name: name,
      });

      // console.log(data);
      setName("");
      router.refresh();
      toast.success("Added 🙋");
    } catch (e) {
      // Print error
      const errorMessage =
        e.response?.data?.error || e.message || "Something went wrong 😞";
      toast.error(errorMessage);
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

      {/* My funny buttons */}
      <div className="flex gap-2">
        <button
          className="btn btn-warning"
          onClick={() => setName("Elo")}
          type="button"
        >
          Elo
        </button>
        <button
          className="btn btn-warning"
          onClick={() => setName("Witam")}
          type="button"
        >
          Witam
        </button>
      </div>
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
