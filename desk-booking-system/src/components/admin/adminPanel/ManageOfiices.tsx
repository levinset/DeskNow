import { useState } from "react";
import CreateOfficeForm from "./CreateOfficeForm";
import UpdateOfficeForm from "./UpdateOfficeForm";
import SearchBar from "./SearchBar";
import { useGetAllOffices } from "./../../../hooks/userHooks/offices/useGetAllOffices";
import { useDeleteOffice } from "./../../../hooks/adminHooks/useDeleteOffice";
import { OfficesProps } from "./../../../types/OfficesProps";

const ManageOffices = () => {
  const { data: allOffices, isLoading, isError } = useGetAllOffices();
  const deleteOfficeMutation = useDeleteOffice();
  const [selectedOffice, setSelectedOffice] = useState<OfficesProps | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const [filteredOffices, setFilteredOffices] = useState<OfficesProps[]>([]);

  //update office
  const handleUpdateOffice = (office: OfficesProps) => {
    setSelectedOffice(office); // Set the selected office for update
  };

  //handle success after updating office
  const handleSuccess = () => {
    setSelectedOffice(null); // Reset the selected office after successful update
  };

  //Delete Office
  const handleDelete = async (officeId: string) => {
    if (window.confirm("Are you sure you want to delete this office?")) {
      try {
        await deleteOfficeMutation.mutateAsync(officeId);
      } catch (error) {
        console.error("Error deleting office:", error);
      }
    }
  };

  //handle create office succes
  const handleCreateOfficeSuccess = () => {
    setIsCreating(false);
  };

  //handle Err
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching offices</div>;
  }

  //Handle Search term
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredOffices([]);
      return;
    }

    const filtered = allOffices.filter((office: OfficesProps) => {
      return (
        office.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        office.map.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredOffices(filtered);
  };

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Manage Offices</h2>
      <SearchBar onSearch={handleSearch} />
      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {(filteredOffices.length ? filteredOffices : allOffices).map(
          (office: OfficesProps) => (
            <li key={office.id} className="p-4 mb-4 bg-gray-100 rounded-md">
              <p className="font-bold">Office ID: {office.id}</p>
              <p className="mb-2">Office Name: {office.name}</p>
              <p className="mb-2">Office Map: {office.map}</p>
              <p className="mb-2">
                Office Layout: Column {office.columns} and Row {office.rows}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateOffice(office)}
                  className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(office.id)}
                  className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
      {/* Render the UpdateOfficeForm if an office is selected for update */}
      {selectedOffice && (
        <div>
          <h2 className="font-bold text-center uppercase ">Update Office</h2>
          <UpdateOfficeForm office={selectedOffice} onSuccess={handleSuccess} />
        </div>
      )}
      <button
        onClick={() => setIsCreating(true)}
        className="px-4 py-2 mt-4 text-white uppercase bg-green-500 rounded-md hover:bg-green-600"
      >
        Create Office
      </button>
      {isCreating && <CreateOfficeForm onSuccess={handleCreateOfficeSuccess} />}
    </div>
  );
};

export default ManageOffices;
