import React from "react";
import { useState } from "react";
import { useGetComments } from "../../../hooks/adminHooks/useGetComment";
import axios from "axios";

interface Comment {
  id: string;
  comment: string;
  commentedAt: string;
  updatedAt: string;
  user: User;
}

const ManageComments = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, refetch } = useGetComments(page);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `https://deskbooking.dev.webundsoehne.com/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // refetch the comments to update the list
      refetch();
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle error, show error message, etc.
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching comments</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Comments</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
        >
          Next
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {data.map((comment: Comment) => (
          <li key={comment.id} className="bg-white shadow-md rounded-lg p-4">
            <p className="text-lg font-semibold">
              {comment.user.firstname} {comment.user.lastname}
            </p>
            <p className="text-gray-600">Comment: {comment.comment}</p>
            <p className="text-gray-600">Commented At: {comment.commentedAt}</p>
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageComments;
