import React, { useState } from "react";
import { useGetComments } from "../../../hooks/adminHooks/useGetComment";
import axios from "axios";

interface Comment {
  id: string;
  comment: string;
  commentedAt: string;
  updatedAt: string;
  user: {
    firstname: string;
    lastname: string;
  };
}

const ManageComments: React.FC = () => {
  const [page, setPage] = useState<number>(0);
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
      if (!token) {
        throw new Error("No access token found");
      }
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
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Manage Comments</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md"
        >
          Next
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {data.map((comment: Comment) => (
          <li key={comment.id} className="p-4 bg-white rounded-lg shadow-md">
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
