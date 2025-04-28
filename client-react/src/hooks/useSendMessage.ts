import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chatStore";
import { api } from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Define the input type for the mutation
interface SendMessageVariables {
  chatId: string;
  chatType: "private" | "group";
  message: string;
  receiverId?: string;
}

// Updated interface to include all possible returned fields
interface ReceivedMessageData {
  _id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  message: string;
  createdAt: string;
}

// Define specific response types for each endpoint
interface PrivateMessageResponse {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

interface GroupMessageResponse {
  status: string;
  success: boolean;
  msgInfo: {
    _id: string;
    groupId: string;
    senderId: string;
    message: string;
    createdAt: string;
  };
}

/**
 * Custom hook to send a message (private or group) using TanStack Query mutation.
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { addMessage } = useChatStore();
  const { user } = useAuthStore();

  return useMutation<ReceivedMessageData, Error, SendMessageVariables>({
    mutationFn: async (variables) => {
      const { chatId, chatType, message, receiverId } = variables;
      console.log(`Sending ${chatType} message to ${chatId}: ${message}`);

      if (chatType === "private") {
        // For private messages, we need the receiverId
        if (!receiverId) {
          throw new Error("receiverId is required for private messages");
        }

        // Private message API call
        const response = await api.post<PrivateMessageResponse>(
          "/chat/send-message",
          {
            receiverId, // Use the proper receiverId parameter
            message,
          },
        );

        return {
          _id: response.data._id,
          senderId: response.data.senderId,
          receiverId: response.data.receiverId,
          message: response.data.message,
          createdAt: response.data.createdAt,
        };
      } else {
        // Group message API call
        const response = await api.post<GroupMessageResponse>(
          "/groupChat/send-group-message",
          {
            groupId: chatId,
            msg: message, // Note the different parameter name for group messages
          },
        );

        return {
          _id: response.data.msgInfo._id,
          senderId: user?._id || "",
          groupId: chatId,
          message: response.data.msgInfo.message,
          createdAt: response.data.msgInfo.createdAt,
        };
      }
    },
    onSuccess: (data, variables) => {
      // Format the message for the chat store
      const formattedMessage = {
        _id: data._id,
        senderId: data.senderId,
        message: data.message,
        createdAt: data.createdAt,
      };

      // Add the message to the local state
      addMessage(formattedMessage);

      // Invalidate the query for this chat to refresh the messages list
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.chatId],
      });
    },
  });
};
