import React, { useState } from "react";
import { useGetAllDesks } from "../../../hooks/userHooks/desks/useGetAllDesks";
import { useDeleteDesk } from "./../../../hooks/adminHooks/useDeleteDesk";
import CreateDeskFormDesk from "./CreateDeskFormDesk";
import Desk from "./Desk";
import UpdateDeskForm from "./UpdateDeskForm";
import { BookedDesk } from "../../types/DesksProps";
import SearchBar from "./SearchBar";

const ManageDesks: React.FC = () => {
  const { data: allDesks, isLoading, isError } = useGetAllDesks();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const deleteDeskMutation = useDeleteDesk();
  const [selectedDesk, setSelectedDesk] = useState<BookedDesk | null>(null);
  const [filteredDesks, setFilteredDesks] = useState<BookedDesk[]>([]); // Define the type for filteredDesks

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredDesks([]);
      return;
    }

    const filtered = allDesks.filter((desk: BookedDesk) => {
      return (
        desk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desk.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desk.equipment.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        desk.row.toString().includes(searchTerm) ||
        desk.column.toString().includes(searchTerm)
      );
    });

    setFilteredDesks(filtered);
  };

  // Update Desk
  const handleUpdateDesk = (desk: BookedDesk) => {
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
    // Handle success action
    setShowCreateForm(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching desks</div>;
  }

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Manage Desks</h2>
      <SearchBar onSearch={handleSearch} />
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {(filteredDesks.length ? filteredDesks : allDesks).map(
          (desk: BookedDesk) => (
            <li key={desk.id} className="p-4 mb-4 bg-gray-100 rounded-md">
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
          )
        )}
      </ul>

      {selectedDesk && (
        <UpdateDeskForm desk={selectedDesk} onSuccess={handleUpdateSuccess} />
      )}

      {showCreateForm && <CreateDeskFormDesk onSuccess={handleSuccess} />}

      <div className="mt-4">
        <button
          onClick={handleCreateClcik}
          className="px-4 py-2 text-white uppercase bg-green-500 rounded-md hover:bg-green-600"
        >
          Create Desk
        </button>
      </div>
    </div>
  );
};

export default ManageDesks;
