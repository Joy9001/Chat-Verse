import { create } from "zustand";

// --- Interfaces/Types --- //

// Reuse User type if defined elsewhere, or define here
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  // Add other relevant fields like isOnline (might come from socket state)
  isOnline?: boolean;
}

export interface BaseChat {
  id: string; // Corresponds to encryptedId for private, groupId for group
  name: string;
  avatar: string;
  unreadCount: number;
  type: "private" | "group";
}

export interface PrivateChat extends BaseChat {
  type: "private";
  otherUser: User; // Details of the other user in the chat
  isBlocked?: boolean;
  blockedByMe?: boolean;
  amIBlocked?: boolean;
}

export interface GroupChat extends BaseChat {
  type: "group";
  description: string;
  participants: User[];
  // Add admin info if needed
}

// Type for the currently selected chat (can be either type)
export type SelectedChat = PrivateChat | GroupChat | null;

export interface Message {
  _id: string; // From backend
  senderId: string; // Could be User ID or 'currentUser' identifier
  senderName?: string; // Usually needed for group chats
  message: string;
  createdAt: string; // ISO Date string
  // Add other fields like status (sent, delivered, read) if needed
}

// --- Store State & Actions --- //

interface ChatState {
  privateChats: PrivateChat[];
  groupChats: GroupChat[];
  selectedChat: SelectedChat;
  messages: Message[];
  isLoadingMessages: boolean;
  chatError: string | null;

  // Actions
  setPrivateChats: (chats: PrivateChat[]) => void;
  setGroupChats: (chats: GroupChat[]) => void;
  setSelectedChat: (chat: SelectedChat) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearSelectedChat: () => void;
  // TODO: Add more actions as needed (e.g., updateChat, removeChat, markAsRead, fetchMessages)
  setLoadingMessages: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // New action to update block status
  updatePrivateChatBlockStatus: (
    userId: string,
    isBlocked: boolean,
    blockedByMe: boolean,
  ) => void;
  // New actions
  removePrivateChat: (userId: string) => void;
  removeGroupChat: (groupId: string) => void;
  removeMessage: (messageId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial State
  privateChats: [],
  groupChats: [],
  selectedChat: null,
  messages: [],
  isLoadingMessages: false,
  chatError: null,

  // Actions
  setPrivateChats: (chats) => set({ privateChats: chats }),
  setGroupChats: (chats) => set({ groupChats: chats }),
  setSelectedChat: (chat) => {
    if (chat) {
      // Update specific chat properties including resetting unread count
      if (chat.type === "private") {
        set((state) => ({
          privateChats: state.privateChats.map((pc) =>
            pc.id === chat.id
              ? {
                  ...pc,
                  unreadCount: 0, // Reset unread count when selected
                  isBlocked: chat.isBlocked,
                  blockedByMe: chat.blockedByMe,
                  amIBlocked: chat.amIBlocked,
                }
              : pc,
          ),
        }));
      } else if (chat.type === "group") {
        set((state) => ({
          groupChats: state.groupChats.map((gc) =>
            gc.id === chat.id
              ? {
                  ...gc,
                  unreadCount: 0, // Reset unread count when selected
                }
              : gc,
          ),
        }));
      }
    }

    set({
      selectedChat: chat,
      messages: [],
      isLoadingMessages: false,
      chatError: null,
    });
  },
  setMessages: (messages) =>
    set({ messages: messages, isLoadingMessages: false }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      // Note: Unread count for non-selected chats is handled in socketStore's onNewMessage function
    })),
  clearSelectedChat: () => set({ selectedChat: null, messages: [] }),
  setLoadingMessages: (loading) => set({ isLoadingMessages: loading }),
  setError: (error) => set({ chatError: error, isLoadingMessages: false }),

  // Implementation for updating block status
  updatePrivateChatBlockStatus: (userId, isBlocked, blockedByMe) =>
    set((state) => {
      const newPrivateChats = state.privateChats.map((chat) => {
        if (chat.type === "private" && chat.id === userId) {
          // Determine amIBlocked based on who initiated the block
          // This logic might need adjustment based on how backend/socket reports it
          const amIBlocked = isBlocked && !blockedByMe;
          return { ...chat, isBlocked, blockedByMe, amIBlocked };
        }
        return chat;
      });
      // Also update selectedChat if it's the one being blocked/unblocked
      const newSelectedChat =
        state.selectedChat?.id === userId &&
        state.selectedChat.type === "private"
          ? ({
              ...state.selectedChat,
              isBlocked,
              blockedByMe,
              amIBlocked: isBlocked && !blockedByMe,
            } as PrivateChat)
          : state.selectedChat;

      return { privateChats: newPrivateChats, selectedChat: newSelectedChat };
    }),

  // New action implementations
  removePrivateChat: (userId) =>
    set((state) => ({
      privateChats: state.privateChats.filter((chat) => chat.id !== userId),
      // Clear selected chat if the removed one was selected
      selectedChat:
        state.selectedChat?.id === userId ? null : state.selectedChat,
      messages: state.selectedChat?.id === userId ? [] : state.messages, // Clear messages too
    })),
  removeGroupChat: (groupId) =>
    set((state) => ({
      groupChats: state.groupChats.filter((chat) => chat.id !== groupId),
      // Clear selected chat if the removed one was selected
      selectedChat:
        state.selectedChat?.id === groupId ? null : state.selectedChat,
      messages: state.selectedChat?.id === groupId ? [] : state.messages, // Clear messages too
    })),

  // Remove a specific message from the messages array
  removeMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== messageId),
    })),

  // TODO: Implement more complex actions combining state updates and API calls
  // e.g., fetchMessagesForChat(chatId, chatType)
}));
