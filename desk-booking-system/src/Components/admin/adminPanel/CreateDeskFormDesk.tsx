import React, { useState } from "react";
import { useCreateDesk } from "../../../hooks/adminHooks/useCreateDesk";

interface Props {
  onSuccess: () => void;
}

const CreateDeskFormDesk: React.FC<Props> = ({ onSuccess }) => {
  const [label, setLabel] = useState<string>("");
  const [officeId, setOfficeId] = useState<string>("");
  const [equipment, setEquipment] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createDeskMutation = useCreateDesk();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createDeskMutation.mutateAsync({
        label,
        office: officeId, // Use the entered office ID
        equipment,
      });
      setLabel("");
      setOfficeId("");
      setEquipment([]);
      setSuccessMessage("Desk created successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error creating desk:", error);
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
            value={equipment.join(",")}
            onChange={(e) => setEquipment(e.target.value.split(","))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Create Desk
        </button>
      </form>
    </div>
  );
};

export default CreateDeskFormDesk;
