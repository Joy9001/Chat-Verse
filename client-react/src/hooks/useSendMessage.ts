import { sendGroupMessage, sendPrivateMessage } from "@/services/chatService";
import { Message, useChatStore } from "@/store/chatStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Define the input type for the mutation
interface SendMessageVariables {
  chatId: string;
  chatType: "private" | "group";
  message: string;
}

/**
 * Custom hook to send a message (private or group) using TanStack Query mutation.
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useChatStore(); // Get addMessage for potential optimistic updates

  return useMutation<
    Message | { msgInfo: Message }, // Success response type (adjust based on actual API return)
    Error, // Error type
    SendMessageVariables // Variables type
  >({
    mutationFn: async ({ chatId, chatType, message }: SendMessageVariables) => {
      if (chatType === "private") {
        // Assuming sendPrivateMessage returns the created Message object directly
        return await sendPrivateMessage(chatId, message);
      } else {
        // Assuming sendGroupMessage returns { msgInfo: Message }
        const response = await sendGroupMessage(chatId, message);
        return response; // Return the whole response object
      }
    },
    onSuccess: (data, variables) => {
      console.log("Message sent successfully:", data);
      // Message is likely already added optimistically in MessageInput
      // OR via socket 'newMessage' event handling.
      // We might not need to manually add it here again unless backend returns the final ID/timestamp
      // and we want to replace the optimistic one.

      // Example: Replacing optimistic message if backend returns full message
      // const returnedMessage = 'msgInfo' in data ? data.msgInfo : data;
      // if (returnedMessage) {
      //    // Find optimistic message and replace/update?
      // }

      // Optional: Invalidate messages query for the specific chat to refetch (alternative to optimistic/socket)
      // queryClient.invalidateQueries({ queryKey: ['messages', variables.chatId] });
    },
    onError: (error, variables) => {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message.");
      // TODO: Implement rollback for optimistic update if needed
      // e.g., remove the optimistically added message from chatStore
    },
  });
};
