import React, { useState } from "react";
import { useUpdateDesk } from "../../hooks/admin-hooks/useUpdateDesk";
import { BookedDesk } from "../../types/DesksProps";

const UpdateDeskForm: React.FC<BookedDesk> = ({ desk, onSuccess }) => {
  const [label, setLabel] = useState(desk.label || "");
  const [officeId, setOfficeId] = useState(desk.office?.id || "");
  const [equipment, setEquipment] = useState(desk.equipment?.join(",") || "");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateDeskMutation = useUpdateDesk();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateDeskMutation.mutateAsync({
        id: desk.id, // Include desk ID in the data object
        label,
        officeId, // Include office ID in the data object
        equipment: equipment.split(","),
      });
      setSuccessMessage("Desk updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating desk:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="label" className="block font-bold mb-1">
            Desk Label
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="officeId" className="block font-bold mb-1">
            Office ID
          </label>
          <input
            type="text"
            id="officeId"
            value={officeId}
            onChange={(e) => setOfficeId(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="equipment" className="block font-bold mb-1">
            Equipment
          </label>
          <input
            type="text"
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Update Desk
        </button>
      </form>
    </div>
  );
};

export default UpdateDeskForm;
