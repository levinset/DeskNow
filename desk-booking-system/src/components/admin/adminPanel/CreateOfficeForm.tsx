import React, { useState } from "react";
import { useCreateOffice } from "../../../hooks/adminHooks/useCreateOffice";

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
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-bold">
            Office Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="columns" className="block mb-1 font-bold">
            Number of Columns
          </label>
          <input
            type="number"
            id="columns"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rows" className="block mb-1 font-bold">
            Number of Rows
          </label>
          <input
            type="number"
            id="rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Create Office
        </button>
      </form>
    </div>
  );
};

export default CreateOfficeForm;
