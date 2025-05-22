import { useChatStore } from "@/store/chatStore";
import { api } from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Define the input type for the mutation
interface DeleteMessageVariables {
  messageId: string;
  chatId: string;
  chatType: "private" | "group";
}

interface DeleteMessageResponse {
  message: string;
  success?: boolean;
}

/**
 * Custom hook to delete a message (private or group) using TanStack Query mutation.
 */
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { removeMessage } = useChatStore();

  return useMutation<DeleteMessageResponse, Error, DeleteMessageVariables>({
    mutationFn: async (variables) => {
      const { messageId, chatId, chatType } = variables;
      console.log(
        `Deleting ${chatType} message: ${messageId} from chat ${chatId}`,
      );

      if (chatType === "private") {
        // For private messages
        const response = await api.post<DeleteMessageResponse>(
          "/chat/delete-message",
          {
            receiverId: chatId,
            msgId: messageId,
          },
        );
        return response.data;
      } else {
        // For group messages
        const response = await api.post<DeleteMessageResponse>(
          "/groupChat/delete-group-message",
          {
            groupId: chatId,
            msgId: messageId,
          },
        );
        return response.data;
      }
    },
    onSuccess: (data, variables) => {
      // Remove the message from the local state
      removeMessage(variables.messageId);

      // Invalidate the query for this chat to refresh the messages list
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.chatId],
      });
    },
  });
};
