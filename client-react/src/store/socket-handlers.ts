import { useAuthStore } from "./auth.store";
import { Message, useChatStore } from "./chatStore";

// Define the structure for a received message event (adjust based on actual payload)
export interface NewMessagePayload extends Message {
  groupId?: string; // Or some other identifier to link message to chat
  receiverId?: string; // Needed for private chat routing check
  // Add other fields sent by the backend
}

// Type-safe set function for socket handlers
type SetState = (partial: any, replace?: boolean) => void;

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
  useChatStore.getState().removeMessage(deletedMsgId);
};

export const onBlockUser = (senderId: string) => {
  console.log(`User ${senderId} blocked you`);
  const { updatePrivateChatBlockStatus } = useChatStore.getState();
  // Update the chat list/status
  updatePrivateChatBlockStatus(senderId, true, false); // blocked=true, byMe=false
};

export const onUnblockUser = (senderId: string) => {
  console.log(`User ${senderId} unblocked you`);
  const { updatePrivateChatBlockStatus } = useChatStore.getState();
  updatePrivateChatBlockStatus(senderId, false, false); // blocked=false, byMe=false
};

export const onDeleteConversation = (senderUsername: string) => {
  console.log(`Conversation deleted by ${senderUsername}`);
  const { privateChats, removePrivateChat } = useChatStore.getState();
  // Find chat by username (inefficient, but what we have)
  const chat = privateChats.find(
    (c) => c.otherUser.username === senderUsername,
  );
  if (chat) {
    removePrivateChat(chat.id);
  }
};

export const onReceiverChangedDetails = (
  oldDetails: any,
  newDetails: any,
  callback?: (response: any) => void,
) => {
  console.log("Receiver changed details:", newDetails);
  const { privateChats, setPrivateChats, selectedChat, setSelectedChat } =
    useChatStore.getState();

  // Update in list
  const updatedChats = privateChats.map((chat) => {
    if (chat.otherUser.username === oldDetails.username) {
      return {
        ...chat,
        otherUser: {
          ...chat.otherUser,
          name: newDetails.name,
          username: newDetails.username,
          avatar: newDetails.avatar,
        },
      };
    }
    return chat;
  });
  setPrivateChats(updatedChats);

  // Update selected chat if it matches
  if (
    selectedChat &&
    selectedChat.type === "private" &&
    selectedChat.otherUser.username === oldDetails.username
  ) {
    setSelectedChat({
      ...selectedChat,
      otherUser: {
        ...selectedChat.otherUser,
        name: newDetails.name,
        username: newDetails.username,
        avatar: newDetails.avatar,
      },
    });
  }

  if (callback) callback({ status: "success", message: "details updated" });
};

export const onJoinGroup = (data: any) => {
  console.log("Joined group:", data);
  // Need to emit join-room to server
  // This might be handled better in the socketStore directly as it needs the socket instance
  // Or we just refresh the group list
  // useChatStore.getState().addGroupChat(data.groupInfo); // Assuming we have this action
};
