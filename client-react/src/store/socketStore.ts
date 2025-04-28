import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import { useAuthStore } from "./auth.store"; // Import auth store if needed for user ID
import { Message, useChatStore } from "./chatStore"; // Import chat store to add messages

// Define the structure for a received message event (adjust based on actual payload)
interface NewMessagePayload extends Message {
  groupId?: string; // Or some other identifier to link message to chat
  receiverId?: string; // Needed for private chat routing check
  // Add other fields sent by the backend
}

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[]; // Assuming backend sends usernames or IDs

  // Actions
  connectSocket: () => void;
  disconnectSocket: () => void;
  setOnlineUsers: (users: string[]) => void;
}

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "YOUR_PRODUCTION_SOCKET_URL" // Replace with your actual production URL
    : "http://localhost:3001"; // Assuming backend runs on 3001

let socketInstance: Socket | null = null;

// --- Listener Functions ---
// Define listeners outside so they can be referenced for 'off'
const onConnect = (set: Function) => () => {
  console.log("Socket connected successfully! ID:", socketInstance?.id);
  set({ isConnected: true });
  // TODO: Authenticate or join rooms if needed post-connect
};

const onDisconnect = (set: Function) => (reason: Socket.DisconnectReason) => {
  console.log("Socket disconnected:", reason);
  // Only clear state here, actual instance nulling happens in disconnectSocket action
  set({ isConnected: false, onlineUsers: [] });
  // If disconnect was not initiated by client, maybe attempt reconnect? (optional)
  if (reason === "io server disconnect") {
    // Server disconnected the socket, maybe auth issue?
    // Consider if socketInstance should be nulled here too.
  }
};

const onConnectError = (set: Function) => (error: Error) => {
  console.error("Socket connection error:", error);
  // Don't null socketInstance here, allow potential retries or manual connect later
  set({ isConnected: false, socket: null }); // Clear socket from state on error
};

const onGetOnlineUsers = (set: Function) => (users: string[]) => {
  console.log("Received online users:", users);
  set({ onlineUsers: users });
};

const onNewMessage = (
  message: NewMessagePayload,
  senderUsername: string,
  callback: Function,
) => {
  console.log("Received newMessage event:", message);
  const { selectedChat, addMessage: addMessageToStore } =
    useChatStore.getState();
  const currentUser = useAuthStore.getState().user;

  let belongsToSelectedChat = false;
  // Ensure currentUser exists before accessing its properties
  if (selectedChat && currentUser) {
    // Determine if the incoming message belongs to the currently open chat
    // This logic needs refinement based on your exact data structure
    // Case 1: Group Chat - message has groupId matching selectedChat.id
    if (selectedChat.type === "group" && message.groupId === selectedChat.id) {
      belongsToSelectedChat = true;
    }
    // Case 2: Private Chat - message sender/receiver matches selectedChat.id (which is otherUser's encryptedId)
    // AND the other participant matches the current user.
    // Note: Backend might send private messages differently (e.g., only to involved parties)
    else if (selectedChat.type === "private") {
      const otherUserId = selectedChat.id; // selectedChat.id is the other user's encryptedId
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
    // Ensure message object matches the Message type expected by addMessage
    // You might need to map fields from NewMessagePayload to Message
    const formattedMessage: Message = { ...message }; // Basic spread, adjust if mapping needed
    addMessageToStore(formattedMessage);
    // TODO: Invalidate message query cache?
    if (callback) callback({ status: "success" });
  } else {
    // TODO: Handle unread count update
    console.log("Received message for non-active chat from:", senderUsername);
    if (callback) callback({ status: "unread" });
  }
};

const onDeleteMessage = (deletedMsgId: string, chatId: string) => {
  console.log(
    `Received deleteMessage event for msg ${deletedMsgId} in chat ${chatId}`,
  );
  // TODO: Implement removeMessage in chatStore
  // useChatStore.getState().removeMessage(deletedMsgId, chatId);
};

// --- Store Definition ---
export const useSocketStore = create<SocketState>((set, get) => {
  // Moved listener function definitions outside

  // Wrap set calls for listeners
  const handleConnect = onConnect(set);
  const handleDisconnect = onDisconnect(set);
  const handleConnectError = onConnectError(set);
  const handleGetOnlineUsers = onGetOnlineUsers(set);
  // onNewMessage and onDeleteMessage interact with other stores directly

  const setupListeners = () => {
    if (!socketInstance) return;
    console.log("Setting up socket listeners...");
    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);
    socketInstance.on("getOnlineUsers", handleGetOnlineUsers);
    socketInstance.on("newMessage", onNewMessage);
    socketInstance.on("deleteMessage", onDeleteMessage);
    // Add other listeners here
  };

  const cleanupListeners = () => {
    if (!socketInstance) return;
    console.log("Cleaning up socket listeners...");
    socketInstance.off("connect", handleConnect);
    socketInstance.off("disconnect", handleDisconnect);
    socketInstance.off("connect_error", handleConnectError);
    socketInstance.off("getOnlineUsers", handleGetOnlineUsers);
    socketInstance.off("newMessage", onNewMessage);
    socketInstance.off("deleteMessage", onDeleteMessage);
    // Remove other listeners here
  };

  return {
    socket: null,
    isConnected: false,
    onlineUsers: [],

    connectSocket: () => {
      // Avoid creating multiple instances if connectSocket is called rapidly
      if (socketInstance && socketInstance.active) {
        console.log("Socket instance already exists and is active.");
        // Optionally trigger connect if somehow disconnected but instance exists
        if (!get().isConnected) socketInstance.connect();
        return;
      }
      // If instance exists but is not active (e.g., after disconnectSocket), reuse it
      if (socketInstance && !socketInstance.active) {
        console.log("Reusing existing socket instance. Connecting...");
        // Listeners should still be attached if setupListeners was called before
        socketInstance.connect();
        return;
      }

      console.log("Creating new socket instance and connecting...");
      socketInstance = io(SOCKET_URL, {
        withCredentials: true,
        autoConnect: false, // *** Use autoConnect: false ***
        // Optional: Add reconnection attempts/delay
        // reconnectionAttempts: 5,
        // reconnectionDelay: 1000,
      });

      set({ socket: socketInstance });
      setupListeners(); // Setup listeners for the new instance
      socketInstance.connect(); // *** Manually connect ***
    },

    disconnectSocket: () => {
      if (socketInstance) {
        console.log("Disconnecting socket and cleaning up listeners...");
        cleanupListeners(); // *** Clean up listeners ***
        socketInstance.disconnect();
        // Consider if nullifying the instance is always desired.
        // Keeping it allows reuse in connectSocket if called again.
        // socketInstance = null; // Optional: Uncomment to force new instance creation next time
      }
      // Ensure state reflects disconnection regardless
      set({ socket: null, isConnected: false, onlineUsers: [] });
    },

    // Kept setOnlineUsers in case it's needed for direct manipulation elsewhere
    setOnlineUsers: (users) => set({ onlineUsers: users }),
  };
});
