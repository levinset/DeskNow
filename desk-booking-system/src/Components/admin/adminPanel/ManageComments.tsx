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
    email: string; // Add email field to the user object
    department: string; // Add department field to the user object
  };
  desk: {
    label: string;
    id: string;
    equipment: string[]; // Assuming equipment is an array of strings
  };
}

const ManageComments: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]); // State for filtered comments
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

  // Handle search functionality
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredComments([]); // Clear filtered comments if search term is empty
      return;
    }
    // Filter comments based on search term
    const filtered = data.filter((comment: Comment) => {
      return (
        comment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.user.firstname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        comment.user.lastname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        comment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.user.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        comment.desk.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.desk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.desk.equipment.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        comment.commentedAt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredComments(filtered);
  };

  // Determine comments to render based on whether search is active
  const commentsToRender = filteredComments.length ? filteredComments : data;

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
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
      />
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {commentsToRender.map((comment: Comment) => (
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
