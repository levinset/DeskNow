import React, { useState } from "react";
import { useUpdateDesk } from "../../../hooks/adminHooks/useUpdateDesk";
//tyoes
interface BookedDesk {
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
  };
  bookedAt: string;
  dateStart: string;
  dateEnd: string;
  user: string;
}
interface UpdateDeskFormProps {
  desk: BookedDesk; // Define the type of the desk prop
  onSuccess: () => void; // Define the type of onSuccess prop
}

const UpdateDeskForm: React.FC<UpdateDeskFormProps> = ({ desk, onSuccess }) => {
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
        <div className="mb-4 text-green-500">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="label" className="block mb-1 font-bold">
            Desk Label
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="officeId" className="block mb-1 font-bold">
            Office ID
          </label>
          <input
            type="text"
            id="officeId"
            value={officeId}
            onChange={(e) => setOfficeId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="equipment" className="block mb-1 font-bold">
            Equipment
          </label>
          <input
            type="text"
            id="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Update Desk
        </button>
      </form>
    </div>
  );
};

export default UpdateDeskForm;
