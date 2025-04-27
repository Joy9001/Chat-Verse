import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';
import { useAuthStore } from './auth.store'; // Import auth store if needed for user ID
import { Message, useChatStore } from './chatStore'; // Import chat store to add messages

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

const SOCKET_URL = process.env.NODE_ENV === 'production'
    ? 'YOUR_PRODUCTION_SOCKET_URL' // Replace with your actual production URL
    : 'http://localhost:3001'; // Assuming backend runs on 3001

let socketInstance: Socket | null = null;

export const useSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    isConnected: false,
    onlineUsers: [],

    connectSocket: () => {
        if (get().socket) {
            console.log('Socket already connected.');
            return;
        }

        console.log('Attempting to connect socket...');
        socketInstance = io(SOCKET_URL, {
            withCredentials: true,
        });

        set({ socket: socketInstance });

        socketInstance.on('connect', () => {
            console.log('Socket connected successfully! ID:', socketInstance?.id);
            set({ isConnected: true });
            // TODO: Authenticate or join rooms if needed
        });

        socketInstance.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            set({ isConnected: false, socket: null, onlineUsers: [] });
            socketInstance = null;
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            set({ isConnected: false, socket: null });
            socketInstance?.disconnect();
            socketInstance = null;
        });

        // --- Custom Listeners ---
        socketInstance.on('getOnlineUsers', (users: string[]) => {
            console.log('Received online users:', users);
            set({ onlineUsers: users });
        });

        socketInstance.on('newMessage', (message: NewMessagePayload, senderUsername: string, callback: Function) => {
            console.log('Received newMessage event:', message);
            const { selectedChat, addMessage: addMessageToStore } = useChatStore.getState();
            const currentUser = useAuthStore.getState().user;

            let belongsToSelectedChat = false;
            if (selectedChat) {
                // Determine if the incoming message belongs to the currently open chat
                // This logic needs refinement based on your exact data structure
                // Case 1: Group Chat - message has groupId matching selectedChat.id
                if (selectedChat.type === 'group' && message.groupId === selectedChat.id) {
                    belongsToSelectedChat = true;
                }
                // Case 2: Private Chat - message sender/receiver matches selectedChat.id (which is otherUser's encryptedId)
                // AND the other participant matches the current user.
                // Note: Backend might send private messages differently (e.g., only to involved parties)
                else if (selectedChat.type === 'private') {
                    const otherUserId = selectedChat.id; // selectedChat.id is the other user's encryptedId
                    const myId = currentUser?._id;
                    // Check if message involves the current user and the other user in the selected chat
                    if ((message.senderId === myId && message.receiverId === otherUserId) ||
                        (message.senderId === otherUserId && message.receiverId === myId)) {
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
                if (callback) callback({ status: 'success' });
            } else {
                // TODO: Handle unread count update
                console.log('Received message for non-active chat from:', senderUsername);
                if (callback) callback({ status: 'unread' });
            }
        });

        socketInstance.on('deleteMessage', (deletedMsgId: string, chatId: string) => {
            console.log(`Received deleteMessage event for msg ${deletedMsgId} in chat ${chatId}`);
            // TODO: Implement removeMessage in chatStore
            // useChatStore.getState().removeMessage(deletedMsgId, chatId);
        });

        // TODO: Add more listeners (userBlocked, userUnblocked, etc.)

    },

    disconnectSocket: () => {
        console.log('Disconnecting socket...');
        get().socket?.disconnect();
        set({ socket: null, isConnected: false, onlineUsers: [] });
        socketInstance = null;
    },

    setOnlineUsers: (users) => set({ onlineUsers: users }),

})); 