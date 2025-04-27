import { Message, User } from '@/store/chatStore'; // Corrected path and import Message type
import { api } from '@/utils/http'; // Assuming you have an api utility like in auth.store.ts

// --- Fetch Messages --- //

// Response type for private conversation (adjust based on actual backend response)
interface PrivateConversationResponse {
    messages: Message[];
    isBlocked: boolean;
    blockedBy: string | null; // User ID of who blocked
    senderId: string; // Current user's ID from backend perspective
    // Add other fields if the backend sends them
}

/**
 * Fetches messages for a private conversation.
 * @param receiverId - The encrypted ID of the other user.
 */
export const fetchPrivateMessages = async (receiverId: string): Promise<PrivateConversationResponse> => {
    try {
        const response = await api.post<PrivateConversationResponse>('/conv-api/get-conversation', { receiverId });
        return response.data;
    } catch (error) {
        console.error(`Error fetching private messages for ${receiverId}:`, error);
        throw new Error('Failed to fetch private messages.');
    }
};

// Response type for group conversation (adjust based on actual backend response)
interface GroupConversationResponse {
    groupMessages: Message[];
    requesterId: string; // Current user's ID
    // Add other fields if needed
}

/**
 * Fetches messages for a group conversation.
 * @param groupId - The ID of the group.
 */
export const fetchGroupMessages = async (groupId: string): Promise<GroupConversationResponse> => {
    try {
        // Assuming '/group-chat-api' base path from EJS code structure
        const response = await api.post<GroupConversationResponse>('/group-chat-api/get-group-conversation', { groupId });
        return response.data;
    } catch (error) {
        console.error(`Error fetching group messages for ${groupId}:`, error);
        throw new Error('Failed to fetch group messages.');
    }
};

// --- Search ---
interface SearchPeopleResponse {
    people: User[]; // Assuming the backend returns users matching the User type
}
export const searchPeople = async (queryText: string): Promise<SearchPeopleResponse> => {
    try {
        const response = await api.post<SearchPeopleResponse>('/search/search-people', { queryText });
        return response.data;
    } catch (error) {
        console.error(`Error searching people with query "${queryText}":`, error);
        throw new Error('Failed to search people.');
    }
};

// --- Add People to Chat (Private) ---
interface AddPeopleResponse {
    message: string;
    newPerson?: User; // User type includes isOnline? Needs verification
}
export const addPersonToChat = async (receiverId: string): Promise<AddPeopleResponse> => {
    try {
        // Assuming '/add-people-api' base path from EJS code structure
        const response = await api.post<AddPeopleResponse>('/add-people-api/add-people-to-chat', { receiverId });
        return response.data;
    } catch (error) {
        console.error(`Error adding person ${receiverId} to chat:`, error);
        throw new Error('Failed to add person to chat.');
    }
};

// --- Send Messages ---
interface SendMessageResponse extends Message {
    // Backend might return the created message object
}
export const sendPrivateMessage = async (receiverId: string, message: string): Promise<SendMessageResponse> => {
    try {
        const response = await api.post<SendMessageResponse>('/chat/send-message', { receiverId, message });
        return response.data;
    } catch (error) {
        console.error(`Error sending private message to ${receiverId}:`, error);
        throw new Error('Failed to send message.'); // Rethrow specific errors?
    }
};

export const sendGroupMessage = async (groupId: string, msg: string): Promise<{ msgInfo: Message }> => {
    try {
        // Assuming '/group-chat-api' base path and endpoint structure
        const response = await api.post<{ msgInfo: Message }>('/group-chat-api/send-group-message', { groupId, msg });
        return response.data;
    } catch (error) {
        console.error(`Error sending group message to ${groupId}:`, error);
        throw new Error('Failed to send group message.');
    }
};

// --- Delete Messages ---
interface DeleteResponse {
    message: string;
}
export const deletePrivateMessage = async (receiverId: string, msgId: string): Promise<DeleteResponse> => {
    try {
        const response = await api.post<DeleteResponse>('/chat/delete-message', { receiverId, msgId });
        return response.data;
    } catch (error) {
        console.error(`Error deleting private message ${msgId}:`, error);
        throw new Error('Failed to delete message.');
    }
};

export const deleteGroupMessage = async (groupId: string, msgId: string): Promise<{ success: boolean }> => {
    try {
        // Assuming '/group-chat-api' base path and endpoint structure
        const response = await api.post<{ success: boolean }>('/group-chat-api/delete-group-message', { groupId, msgId });
        return response.data;
    } catch (error) {
        console.error(`Error deleting group message ${msgId} in group ${groupId}:`, error);
        throw new Error('Failed to delete group message.');
    }
};


// --- Delete Conversation ---
export const deleteConversation = async (receiverId: string): Promise<DeleteResponse> => {
    try {
        const response = await api.post<DeleteResponse>('/chat/delete-conversation', { receiverId });
        return response.data;
    } catch (error) {
        console.error(`Error deleting conversation with ${receiverId}:`, error);
        throw new Error('Failed to delete conversation.');
    }
};

// --- Block/Unblock ---
export const blockUser = async (receiverId: string): Promise<DeleteResponse> => {
    try {
        const response = await api.post<DeleteResponse>('/chat/block-user', { receiverId });
        return response.data;
    } catch (error) {
        console.error(`Error blocking user ${receiverId}:`, error);
        throw new Error('Failed to block user.');
    }
};

export const unblockUser = async (receiverId: string): Promise<DeleteResponse> => {
    try {
        const response = await api.post<DeleteResponse>('/chat/unblock-user', { receiverId });
        return response.data;
    } catch (error) {
        console.error(`Error unblocking user ${receiverId}:`, error);
        throw new Error('Failed to unblock user.');
    }
};

// --- Group Actions (Assuming endpoints based on EJS logic) ---
export const leaveAndDeleteGroup = async (groupId: string): Promise<{ success: boolean }> => {
    try {
        const response = await api.post<{ success: boolean }>('/group-chat-api/leave-and-delete-group', { groupId });
        return response.data;
    } catch (error) {
        console.error(`Error leaving group ${groupId}:`, error);
        throw new Error('Failed to leave group.');
    }
};

interface GroupMembersResponse {
    success: boolean;
    groupMembers: User[];
}
export const fetchGroupMembers = async (groupId: string): Promise<GroupMembersResponse> => {
    try {
        const response = await api.post<GroupMembersResponse>('/group-chat-api/get-group-members', { groupId });
        return response.data;
    } catch (error) {
        console.error(`Error fetching members for group ${groupId}:`, error);
        throw new Error('Failed to fetch group members.');
    }
};

// TODO: Add create group function
// export const createGroup = async (groupData: ...) => { ... }

// REMOVE DUPLICATE fetchInitialChats
/*
export const fetchInitialChats = async (): Promise<InitialChatsResponse> => {
    try {
        // TODO: Verify the actual endpoint from backend routes
        // Referring to `chat.route.js` and `groupChat.route.js` doesn't immediately show
        // a combined endpoint. Assuming one exists or needs to be created at `/api/chats/initial`.
        const response = await api.get<InitialChatsResponse>('/chats/initial');
        // It's crucial to map the backend response to the frontend types (PrivateChat, GroupChat)
        // This might involve transforming fields (e.g., backend _id -> frontend id, etc.)
        // For now, assuming the backend response structure matches the frontend types.
        return response.data;
    } catch (error) {
        console.error("Error fetching initial chats:", error);
        // Re-throw the error to be handled by react-query
        throw new Error('Failed to fetch initial chats.');
    }
};
*/ 