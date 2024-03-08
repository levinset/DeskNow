import { useState } from "react";
import UpdateFixDeskRequestForm from "./UpdateFixDeskRequestForm";
import SearchBar from "./SearchBar";
import { useGetAllFixDesk } from "./../../../hooks/adminHooks/useGetAllFixDesk";

interface RequestProps {
  desk: {
    id: string;
    label: string;
    name: string;
    office: {
      name: string;
    };
  };
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
  const { data: allFixDeskRequests, isLoading, isError } = useGetAllFixDesk();
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );
  const [filteredFixDeskRequests, setFilteredFixDeskRequests] = useState<
    RequestProps[]
  >([]);

  const handleUpdateStatus = (requestId: string) => {
    setSelectedRequestId(requestId);
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredFixDeskRequests([]);
      return;
    }

    const filtered = allFixDeskRequests.filter((request: RequestProps) => {
      return (
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user.firstname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        request.user.lastname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (request.status &&
          request.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
        request.desk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.createdAt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredFixDeskRequests(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching FixDesk requests</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Manage FixDesk Requests</h2>
      <SearchBar onSearch={handleSearch} />

      <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96">
        {(filteredFixDeskRequests.length
          ? filteredFixDeskRequests
          : allFixDeskRequests
        ).map((request: RequestProps) => (
          <li key={request.id} className="p-4 bg-white rounded-lg shadow-md">
            <p>
              <strong>User ID:</strong> {request.user.id}
            </p>
            <p>
              <strong>Name:</strong> {request.user.firstname}{" "}
              {request.user.lastname}
            </p>
            <p>
              <strong>Status: </strong>
              {request.status}
            </p>
            <p>
              <strong>Desk ID: </strong>
              {request.desk.id}
            </p>
            <p>
              <strong>Office Name: </strong>
              {request.desk.office.name}
            </p>
            <p>
              <strong>Desk Lable: </strong>
              {request.desk.label}
            </p>
            <p>
              <strong>Date of Booking: </strong>
              {request.createdAt}
            </p>
            <button
              onClick={() => handleUpdateStatus(request.id)}
              className=" px-2 group inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75 uppercase"
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
