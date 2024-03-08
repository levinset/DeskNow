import React from "react";
import { useState } from "react";
import { useGetComments } from "../../hooks/admin-hooks/useGetComment";
import axios from "axios";
import SearchBar from "./SearchBar";

interface Comment {
  id: string;
  comment: string;
  commentedAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    department: string;
    createdAt: string;
    updatedAt: string;
  };

  desk: {
    id: string;
    label: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    column: number;
    row: number;
    equipment: string[];
    office: {
      id: string;
      name: string;
      map: string;
      columns: number;
      rows: number;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const ManageComments = () => {
  const [page, setPage] = useState(0);
  const {
    data: allComments,
    isLoading,
    isError,
    refetch,
  } = useGetComments(page);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);

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
    }
  };

  //handle  search bar functionality
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredComments([]);
      return;
    }
    //handle filter for  search bar functionality
    const filtered = allComments.filter((comment: Comment) => {
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
      <SearchBar onSearch={handleSearch} />
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {(filteredComments.length ? filteredComments : allComments).map(
          (comment: Comment) => (
            <li key={comment.id} className="bg-white shadow-md rounded-lg p-4">
              <p>
                <strong>Name: </strong>
                {comment.user.firstname} {comment.user.lastname}
              </p>
              <p>
                <strong>Email:</strong> {comment.user.email}
              </p>
              <p>
                <strong>Department:</strong> {comment.user.department}
              </p>
              <p>
                <strong>Desk: </strong>
                {comment.desk.label}
              </p>
              <p>
                <strong>Desk ID :</strong>
                {comment.desk.id}
              </p>
              <p>
                <strong>Equipment: </strong>
                {comment.desk.equipment}
              </p>
              <p>
                <strong>Comment: </strong>
                {comment.comment}
              </p>
              <p>
                <strong>Commented At: </strong>
                {comment.commentedAt}
              </p>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r uppercase from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              >
                Delete Comment
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ManageComments;
