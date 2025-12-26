import { Message, User } from "@/store/chatStore"; // Corrected path and import Message type
import { api } from "@/utils/http"; // Assuming you have an api utility like in auth.store.ts

// Response type for private conversation
interface PrivateConversationResponse {
  messages: Message[];
  isBlocked: boolean;
  blockedBy: string | null;
  senderId: string;
}

export const fetchPrivateMessages = async (
  conversationId: string,
): Promise<PrivateConversationResponse> => {
  try {
    const response = await api.post<PrivateConversationResponse>(
      "/conversations/get-conversation",
      { conversationId },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching private messages for conversation ${conversationId}:`,
      error,
    );
    throw new Error("Failed to fetch private messages.");
  }
};

interface GroupConversationResponse {
  groupMessages: Message[];
  requesterId: string;
}

export const fetchGroupMessages = async (
  groupId: string,
): Promise<GroupConversationResponse> => {
  try {
    const response = await api.post<GroupConversationResponse>(
      "/group-chat/get-group-conversation",
      { groupId },
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching group messages for ${groupId}:`, error);
    throw new Error("Failed to fetch group messages.");
  }
};

interface SearchPeopleResponse {
  people: User[];
}
export const searchPeople = async (
  queryText: string,
): Promise<SearchPeopleResponse> => {
  try {
    const response = await api.post<SearchPeopleResponse>(
      "/search/search-people",
      { queryText },
    );
    return response.data;
  } catch (error) {
    console.error(`Error searching people with query "${queryText}":`, error);
    throw new Error("Failed to search people.");
  }
};

// --- Add People to Chat (Private) ---
interface AddPeopleResponse {
  message: string;
  newPerson?: User; // User type includes isOnline? Needs verification
}
export const addPersonToChat = async (
  receiverId: string,
): Promise<AddPeopleResponse> => {
  try {
    // Assuming '/add-people-api' base path from EJS code structure
    const response = await api.post<AddPeopleResponse>(
      "/add-people-api/add-people-to-chat",
      { receiverId },
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding person ${receiverId} to chat:`, error);
    throw new Error("Failed to add person to chat.");
  }
};

// --- Send Messages ---
// interface SendMessageResponse extends Message {
//   // Backend might return the created message object
// }
export const sendPrivateMessage = async (
  receiverId: string,
  message: string,
): Promise<Message> => {
  try {
    const response = await api.post<Message>("/chat/send-message", {
      receiverId,
      message,
    });
    return response.data;
  } catch (error) {
    console.error(`Error sending private message to ${receiverId}:`, error);
    throw new Error("Failed to send message."); // Rethrow specific errors?
  }
};

export const sendGroupMessage = async (
  groupId: string,
  msg: string,
): Promise<{ msgInfo: Message }> => {
  try {
    // Assuming '/group-chat-api' base path and endpoint structure
    const response = await api.post<{ msgInfo: Message }>(
      "/group-chat-api/send-group-message",
      { groupId, msg },
    );
    return response.data;
  } catch (error) {
    console.error(`Error sending group message to ${groupId}:`, error);
    throw new Error("Failed to send group message.");
  }
};

// --- Delete Messages ---
interface DeleteResponse {
  message: string;
}
export const deletePrivateMessage = async (
  receiverId: string,
  msgId: string,
): Promise<DeleteResponse> => {
  try {
    const response = await api.post<DeleteResponse>("/chat/delete-message", {
      receiverId,
      msgId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting private message ${msgId}:`, error);
    throw new Error("Failed to delete message.");
  }
};

export const deleteGroupMessage = async (
  groupId: string,
  msgId: string,
): Promise<{ success: boolean }> => {
  try {
    // Assuming '/group-chat-api' base path and endpoint structure
    const response = await api.post<{ success: boolean }>(
      "/group-chat-api/delete-group-message",
      { groupId, msgId },
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting group message ${msgId} in group ${groupId}:`,
      error,
    );
    throw new Error("Failed to delete group message.");
  }
};

// --- Delete Conversation ---
export const deleteConversation = async (
  receiverId: string,
): Promise<DeleteResponse> => {
  try {
    const response = await api.post<DeleteResponse>(
      "/chat/delete-conversation",
      { receiverId },
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting conversation with ${receiverId}:`, error);
    throw new Error("Failed to delete conversation.");
  }
};

// --- Block/Unblock ---
export const blockUser = async (
  receiverId: string,
): Promise<DeleteResponse> => {
  try {
    const response = await api.post<DeleteResponse>("/chat/block-user", {
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error blocking user ${receiverId}:`, error);
    throw new Error("Failed to block user.");
  }
};

export const unblockUser = async (
  receiverId: string,
): Promise<DeleteResponse> => {
  try {
    const response = await api.post<DeleteResponse>("/chat/unblock-user", {
      receiverId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error unblocking user ${receiverId}:`, error);
    throw new Error("Failed to unblock user.");
  }
};

// --- Group Actions (Assuming endpoints based on EJS logic) ---
export const leaveAndDeleteGroup = async (
  groupId: string,
): Promise<{ success: boolean }> => {
  try {
    const response = await api.post<{ success: boolean }>(
      "/group-chat-api/leave-and-delete-group",
      { groupId },
    );
    return response.data;
  } catch (error) {
    console.error(`Error leaving group ${groupId}:`, error);
    throw new Error("Failed to leave group.");
  }
};

interface GroupMembersResponse {
  success: boolean;
  groupMembers: User[];
}
export const fetchGroupMembers = async (
  groupId: string,
): Promise<GroupMembersResponse> => {
  try {
    const response = await api.post<GroupMembersResponse>(
      "/group-chat-api/get-group-members",
      { groupId },
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching members for group ${groupId}:`, error);
    throw new Error("Failed to fetch group members.");
  }
};

interface CreateGroupData {
  groupName: string;
  groupDescription: string;
  groupAvatar: string;
  members: string[]; // User IDs
}

export const createGroup = async (
  groupData: CreateGroupData,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post<{ success: boolean; message: string }>(
      "/group-chat/create-group",
      groupData as unknown as Record<string, unknown>,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error("Failed to create group.");
  }
};
