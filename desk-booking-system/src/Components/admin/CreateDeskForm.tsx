import React, { useState } from "react";
import { useCreateDesk } from "../../hooks/admin-hooks/useCreateDesk";

interface Props {
  onSuccess: () => void;
}
const CreateDeskForm: React.FC<Props> = ({ onSuccess }) => {
  const [label, setLabel] = useState("");
  const [officeId, setOfficeId] = useState("");
  const [equipment, setEquipment] = useState([]);
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
            onChange={(e) => setEquipment(e.target.value.split(","))}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md uppercase"
        >
          Create Desk
        </button>
      </form>
    </div>
  );
};

export default CreateDeskForm;
