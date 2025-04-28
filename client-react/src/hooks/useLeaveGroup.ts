import { leaveAndDeleteGroup } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Custom hook to leave and delete a group using TanStack Query mutation.
 */
export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  // Use removeGroupChat action
  const { clearSelectedChat, removeGroupChat } = useChatStore();

  return useMutation<
    { success: boolean }, // Success response type
    Error,
    string // Variables type (groupId)
  >({
    mutationFn: leaveAndDeleteGroup,
    onSuccess: (data, groupId) => {
      if (data.success) {
        console.log(`Group ${groupId} left successfully`, data);
        toast.success("Group left and deleted.");

        // Call removeGroupChat action
        removeGroupChat(groupId);

        // Clear the selected chat details and messages (already handled by removeGroupChat if it was selected)
        // clearSelectedChat();

        // Optionally, invalidate other queries if needed
        // queryClient.invalidateQueries({ queryKey: ['chats', 'initial'] });
      } else {
        // Handle cases where backend returns success: false
        console.error(
          `Failed to leave group ${groupId} (API returned success: false)`,
        );
        toast.error("Failed to leave group.");
      }
    },
    onError: (error, groupId) => {
      console.error(`Error leaving group ${groupId}:`, error);
      toast.error(error.message || "Failed to leave group.");
    },
  });
};
