import React, { useState } from 'react';
import { useGetAllOffices } from "..//../hooks/admin-hooks/useGetAllOffices";
import CreateOfficeForm from "./CreateOfficeForm";
import { useDeleteOffice } from '../../hooks/admin-hooks/useDeleteOffice'; 
import UpdateOfficeForm from './UpdateOfficeForm';
import { OfficesProps } from '../../types/OfficesProps';

const ManageOffices = () => {
  const { data, isLoading, isError } = useGetAllOffices();
  const [isCreating, setIsCreating] = useState(false);
  const deleteOfficeMutation = useDeleteOffice();
  const [selectedOffice, setSelectedOffice] = useState(null);

  const handleUpdateOffice = (office: OfficesProps) => {
    setSelectedOffice(office); // Set the selected office for update
  };

  const handleSuccess = () => {
    setSelectedOffice(null); // Reset the selected office after successful update
  };

  const handleDelete = async (officeId: string) => {
    if (window.confirm('Are you sure you want to delete this office?')) {
      try {
        await deleteOfficeMutation.mutateAsync(officeId);
      } catch (error) {
        console.error('Error deleting office:', error);
      }
    }
  };

  const handleCreateOfficeSuccess = () => {
    setIsCreating(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching offices</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Offices</h2>
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {data.map((office: OfficesProps) => (
          <li key={office.id} className="bg-gray-100 rounded-md p-4 mb-4">
            <p className="font-bold">Office ID: {office.id}</p>
            <p className="mb-2">Office Name: {office.name}</p>
            <p className="mb-2">Office Map: {office.map}</p>
            <p className="mb-2">
              Office Layout: Column {office.columns} and Row {office.rows}
            </p>
            <div className="flex space-x-2">
              <button  onClick={() => handleUpdateOffice(office)} className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
                Update
              </button>
              <button onClick={() => handleDelete(office.id)} className="uppercase bg-red-500 text-black px-3 py-1 rounded-md shadow-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Render the UpdateOfficeForm if an office is selected for update */}
      {selectedOffice && (
        <div>
          <h2 className='text-center font-bold uppercase '>Update Office</h2>
          <UpdateOfficeForm office={selectedOffice} onSuccess={handleSuccess} />
        </div>
      )}
      <button
        onClick={() => setIsCreating(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-4 uppercase"
      >
        Create Office
      </button>
      {isCreating && <CreateOfficeForm onSuccess={handleCreateOfficeSuccess} />}
    </div>
  );
};

export default ManageOffices;
