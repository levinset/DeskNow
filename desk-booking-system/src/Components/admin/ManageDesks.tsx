import React, { useState } from "react";
import { useGetAllDesks } from "../../hooks/useGetAllDesks";
import { useDeleteDesk } from "../../hooks/admin-hooks/useDeleteDesk";
import CreateDeskForm from "./CreateDeskForm";
import Desk from "./Desk";
import UpdateDeskForm from "./UpdateDeskForm";
import { DeskProps } from "../../types/DesksProps";

const ManageDesks = () => {
  const { data, isLoading, isError } = useGetAllDesks();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const deleteDeskMutation = useDeleteDesk();
  const [selectedDesk, setSelectedDesk] = useState(null);

  // Update Desk
  const handleUpdateDesk = (desk: DeskProps) => {
    setSelectedDesk(desk);
  };

  const handleUpdateSuccess = () => {
    setSelectedDesk(null);
  };

  const handleDelete = async (deskId: string) => {
    if (window.confirm("Are you sure you want to delete this desk?")) {
      try {
        await deleteDeskMutation.mutateAsync(deskId);
      } catch (error) {
        console.error("Error deleting desk:", error);
      }
    }
  };

  const handleCreateClcik = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleSuccess = () => {
    // Handle success action here
    setShowCreateForm(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching desks</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Manage Desks</h2>
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {data.map((desk: DeskProps) => (
          <li key={desk.id} className="bg-gray-100 rounded-md p-4 mb-4">
            <Desk desk={desk} />
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateDesk(desk)}
                className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(desk.id)}
                className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedDesk && (
        <UpdateDeskForm desk={selectedDesk} onSuccess={handleUpdateSuccess} />
      )}

      {showCreateForm && <CreateDeskForm onSuccess={handleSuccess} />}

      <div className="mt-4">
        <button
          onClick={handleCreateClcik}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md uppercase"
        >
          Create Desk
        </button>
      </div>
    </div>
  );
};

export default ManageDesks;
