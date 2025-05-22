import { useAuthStore } from "./auth.store";
import { Message, useChatStore } from "./chatStore";

// Define the structure for a received message event (adjust based on actual payload)
export interface NewMessagePayload extends Message {
  groupId?: string; // Or some other identifier to link message to chat
  receiverId?: string; // Needed for private chat routing check
  // Add other fields sent by the backend
}

// Type-safe set function for socket handlers
type SetState = (fn: (state: any) => any) => void;

// --- Listener Functions ---
// Define listeners outside so they can be referenced for 'off'
export const onConnect = (set: SetState) => () => {
  console.log("Socket connected successfully!");
  set({ isConnected: true });
  // TODO: Authenticate or join rooms if needed post-connect
};

export const onDisconnect = (set: SetState) => (reason: string) => {
  console.log("Socket disconnected:", reason);
  // Only clear state here, actual instance nulling happens in disconnectSocket action
  set({ isConnected: false, onlineUsers: [] });
  // If disconnect was not initiated by client, maybe attempt reconnect? (optional)
  if (reason === "io server disconnect") {
    // Server disconnected the socket, maybe auth issue?
  }
};

export const onConnectError = (set: SetState) => (error: Error) => {
  console.error("Socket connection error:", error);
  // Don't null socketInstance here, allow potential retries or manual connect later
  set({ isConnected: false, socket: null }); // Clear socket from state on error
};

export const onGetOnlineUsers = (set: SetState) => (users: string[]) => {
  console.log("Received online users:", users);
  set({ onlineUsers: users });
};

export const onNewMessage = (
  message: NewMessagePayload,
  senderUsername: string,
  callback?: (response: { status: string }) => void,
) => {
  console.log("Received newMessage event:", message);
  const {
    selectedChat,
    addMessage: addMessageToStore,
    setMessages,
    messages,
  } = useChatStore.getState();
  const currentUser = useAuthStore.getState().user;

  let belongsToSelectedChat = false;
  // Ensure currentUser exists before accessing its properties
  if (selectedChat && currentUser) {
    // Determine if the incoming message belongs to the currently open chat
    if (selectedChat.type === "group" && message.groupId === selectedChat.id) {
      belongsToSelectedChat = true;
    } else if (selectedChat.type === "private") {
      const otherUserId = selectedChat.otherUser.id;
      const myId = currentUser._id;
      // Check if message involves the current user and the other user in the selected chat
      if (
        (message.senderId === myId && message.receiverId === otherUserId) ||
        (message.senderId === otherUserId && message.receiverId === myId)
      ) {
        belongsToSelectedChat = true;
      }
    }
  }

  if (belongsToSelectedChat) {
    // If this message belongs to the selected chat, add it to the messages
    // This ensures it appears immediately without requiring a refetch
    const formattedMessage: Message = { ...message };

    // Make sure we don't add duplicate messages
    const existingMessageIndex = messages.findIndex(
      (msg) => msg._id === message._id,
    );
    if (existingMessageIndex === -1) {
      // Add the new message to the existing messages array
      addMessageToStore(formattedMessage);
    }

    if (callback) callback({ status: "success" });
  } else {
    // Handle unread count update for non-active chat
    if (message.groupId) {
      // Update unread count for group chat
      const { setGroupChats, groupChats } = useChatStore.getState();
      const updatedGroupChats = groupChats.map((chat) => {
        if (chat.id === message.groupId) {
          return { ...chat, unreadCount: chat.unreadCount + 1 };
        }
        return chat;
      });
      setGroupChats(updatedGroupChats);
    } else if (message.senderId) {
      // Update unread count for private chat
      const { setPrivateChats, privateChats } = useChatStore.getState();
      const updatedPrivateChats = privateChats.map((chat) => {
        if (chat.type === "private" && chat.otherUser.id === message.senderId) {
          return { ...chat, unreadCount: chat.unreadCount + 1 };
        }
        return chat;
      });
      setPrivateChats(updatedPrivateChats);
    }

    console.log("Received message for non-active chat from:", senderUsername);
    if (callback) callback({ status: "unread" });
  }
};

export const onDeleteMessage = (deletedMsgId: string, chatId: string) => {
  console.log(
    `Received deleteMessage event for msg ${deletedMsgId} in chat ${chatId}`,
  );
  // Use the removeMessage function we added to chatStore to remove the message
  useChatStore.getState().removeMessage(deletedMsgId);
};
