import React, { useState } from 'react';
import { useGetAllFixDesk } from '../../hooks/admin-hooks/useGetAllFixDesk';
import UpdateFixDeskRequestForm from './UpdateFixDeskRequestForm';


interface RequestProps {
  desk: {id: string};
  user: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    isAdmin: boolean;
    department: string;
    createdAt: string;
    updatedAt: string;
  };
  id: string;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

const ManageFixDeskRequests = () => {
  const { data, isLoading, isError } = useGetAllFixDesk();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleUpdateStatus = (requestId: string) => {
    setSelectedRequestId(requestId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching FixDesk requests</div>;
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>Manage FixDesk Requests</h2>
      <ul className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {data.map((request: RequestProps) => (
          <li key={request.id} className='bg-white shadow-md rounded-lg p-4'>
            <p className='text-lg font-semibold'>User ID: {request.user.id}</p>
            <p className='text-lg font-semibold'>Name: {request.user.firstname} {request.user.lastname}</p>
            <p className='text-lg font-semibold'>Status: {request.status}</p>
            <p className='text-lg font-semibold'>Desk ID: {request.desk.id}</p>
            <p className='text-lg font-semibold'>Date of Booking: {request.createdAt}</p>
            <button
              onClick={() => handleUpdateStatus(request.id)}
              className="group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 uppercase"
            >
              Update Status
            </button>
            {selectedRequestId === request.id && (
              <UpdateFixDeskRequestForm
                requestId={request.id}
                onSuccess={() => setSelectedRequestId(null)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageFixDeskRequests;
