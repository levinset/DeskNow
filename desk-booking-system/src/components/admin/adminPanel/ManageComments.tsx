import React, { useEffect, useState } from "react";
import { useGetComments } from "../../../hooks/adminHooks/useGetComment";
import axios from "axios";
import { useGetAllDesks } from "./../../../hooks/userHooks/desks/useGetAllDesks";
import { DeskProps } from "../../../types/DesksProps";

interface Comment {
  id: string;
  comment: string;
  commentedAt: string;
  updatedAt: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    department: string;
  };
  desk: {
    label: string;
    id: string;
    equipment: string[];
    // Add new properties to desk object
    type: string;
    createdAt: string;
    updatedAt: string;
    column: number;
    row: number;
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

const ManageComments: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const { data, isLoading, isError, refetch } = useGetComments(page);
  const { data: deskData } = useGetAllDesks();
  //
  useEffect(() => {
    if (data && deskData) {
      // Update desk object in comments with office name
      const updatedComments = data.map((comment: Comment) => {
        const desk = deskData.find(
          (desk: DeskProps) => desk.id === comment.desk.id
        );
        if (desk) {
          return { ...comment, desk: { ...desk, office: desk.office } };
        }
        return comment;
      });
      setFilteredComments(updatedComments);
    }
  }, [data, deskData]);

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
      refetch();
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredComments([]);
      return;
    }
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
        comment.commentedAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.desk.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.desk.createdAt
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        comment.desk.updatedAt
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        // Check office name for search
        (comment.desk.office.name &&
          comment.desk.office.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredComments(filtered);
  };

  const commentsToRender = filteredComments.length ? filteredComments : data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching comments</div>;
  }
  //

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
              User Name: {comment.user.firstname} {comment.user.lastname}
            </p>
            <p className="text-lg font-semibold">
              Department: {comment.user.department}
            </p>
            {/* Check if office exists before accessing its properties */}
            {comment.desk.office && (
              <p className="font-semibold text-gray-600">
                Office Name: {comment.desk.office.name}
              </p>
            )}
            <p className="text-gray-600">Comment: {comment.comment}</p>
            <p className="text-gray-600">Commented At: {comment.commentedAt}</p>
            <p className="text-gray-600">Desk lable: {comment.desk.label}</p>
            <p className="text-gray-600">Desk Type: {comment.desk.type}</p>
            <p className="text-gray-600">Desk Id: {comment.desk.id}</p>

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
