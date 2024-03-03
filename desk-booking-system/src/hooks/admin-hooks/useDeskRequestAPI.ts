import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ApprovalVariables {
  requestId: string;
}

const approveFixDeskRequest = async ({ requestId }: ApprovalVariables) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) throw new Error("Admin token not found in local storage");
  
      const response = await axios.put(
        `https://deskbooking.dev.webundsoehne.com/api/admin/fix-desk-requests/${requestId}`,
        { status: 'approved' },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Error approving fix desk request: " + error.message);
    }
  };
  

const rejectFixDeskRequest = async ({ requestId }: ApprovalVariables): Promise<void> => {
  try {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) throw new Error("Admin token not found in local storage");

    await axios.put(
      `https://deskbooking.dev.webundsoehne.com/api/admin/fix-desk-requests/${requestId}`,
      { status: 'rejected' },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
  } catch (error) {
    throw new Error("Error rejecting fix desk request");
  }
};

export const useApproveFixDeskRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ApprovalVariables>({
    mutationFn: approveFixDeskRequest,
    onSuccess: (_, variables) => {
      console.log(`Fix desk request approved with ID: ${variables.requestId}`);
      queryClient.invalidateQueries({ queryKey: ["fixDeskRequests"]});
    },
  });
};

export const useRejectFixDeskRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ApprovalVariables>({
    mutationFn: rejectFixDeskRequest,
    onSuccess: (_, variables) => {
      console.log(`Fix desk request rejected with ID: ${variables.requestId}`);
      queryClient.invalidateQueries({ queryKey: ["fixDeskRequests"]});
    },
  });
};
