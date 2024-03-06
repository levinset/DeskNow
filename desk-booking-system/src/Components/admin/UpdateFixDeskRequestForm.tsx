import React, { useState } from 'react';
import { useUpdateFixDeskRequest } from '../../hooks/admin-hooks/useUpdateFixDeskRequestStatus';

interface Props {
  requestId: string;
  onSuccess: () => void;
}

const UpdateFixDeskRequestForm: React.FC<Props> = ({ requestId, onSuccess }) => {
  const [status, setStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateFixDeskRequestMutation = useUpdateFixDeskRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateFixDeskRequestMutation.mutateAsync({
        id: requestId,
        status,
      });
      setSuccessMessage('Fix desk request updated successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error updating fix desk request:', error);
    }
  };

  return (
    <div>
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="status" className="block font-bold mb-1">Status</label>
          <input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required className="border border-gray-300 rounded-md px-3 py-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Update Status</button>
      </form>
    </div>
  );
};

export default UpdateFixDeskRequestForm;
