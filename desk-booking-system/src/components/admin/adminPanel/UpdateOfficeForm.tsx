import React, { useState } from "react";
import { useUpdateOffice } from "../../../hooks/adminHooks/useUpdateOffice";

interface Office {
  id: string;
  name: string;
  columns?: number | undefined; // Make columns optional
  rows?: number | undefined;
}

interface Props {
  office: Office;
  onSuccess: () => void;
}

const UpdateOfficeForm: React.FC<Props> = ({ office, onSuccess }) => {
  const [name, setName] = useState<string>(office.name);
  const [columns, setColumns] = useState<string>(office.columns.toString());
  const [rows, setRows] = useState<string>(office.rows.toString());
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateOfficeMutation = useUpdateOffice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOfficeMutation.mutateAsync({
        id: office.id,
        name,
        columns: parseInt(columns),
        rows: parseInt(rows),
      });
      setSuccessMessage("Office updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating office:", error);
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
          Update Office
        </button>
      </form>
    </div>
  );
};

export default UpdateOfficeForm;
