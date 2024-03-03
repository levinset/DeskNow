import React, { useState } from "react";
import { useCreateOffice } from "..//../hooks/admin-hooks/useCreateOffice";

interface Props {
  onSuccess: () => void;
}

const CreateOfficeForm: React.FC<Props> = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState("");
  const [rows, setRows] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createOfficeMutation = useCreateOffice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOfficeMutation.mutateAsync({
        name,
        columns: parseInt(columns),
        rows: parseInt(rows),
      });
      setName("");
      setColumns("");
      setRows("");
      setSuccessMessage("Office created successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error creating office:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block font-bold mb-1">
            Office Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="columns" className="block font-bold mb-1">
            Number of Columns
          </label>
          <input
            type="number"
            id="columns"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rows" className="block font-bold mb-1">
            Number of Rows
          </label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Create Office
        </button>
      </form>
    </div>
  );
};

export default CreateOfficeForm;
