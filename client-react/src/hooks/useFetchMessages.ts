import { useQuery } from '@tanstack/react-query';
import { fetchPrivateMessages, fetchGroupMessages } from '@/services/chatService';
import { useChatStore, SelectedChat } from '@/store/chatStore';
import { Message } from '@/store/chatStore'; // Import Message type

// Define query keys for messages
const messageKeys = {
    all: ['messages'] as const,
    chat: (chatId: string) => [...messageKeys.all, chatId] as const,
};

/**
 * Custom hook to fetch messages for the currently selected chat using TanStack Query.
 */
export const useFetchMessages = () => {
    const { selectedChat } = useChatStore();

    const chatId = selectedChat?.id;
    const chatType = selectedChat?.type;

    return useQuery<
        Message[], // Query function result type
        Error      // Error type
    >({
        queryKey: messageKeys.chat(chatId ?? 'no-chat'), // Use chatId in key, provide fallback
        queryFn: async () => {
            if (!chatId || !chatType) {
                // Should not happen if enabled correctly, but provides type safety
                return [];
            }
            if (chatType === 'private') {
                // Assuming the backend response structure needs mapping
                const response = await fetchPrivateMessages(chatId);
                // TODO: Update selectedChat state with isBlocked, blockedBy info?
                // This might be better handled in a separate effect or action.
                return response.messages || [];
            } else { // chatType === 'group'
                const response = await fetchGroupMessages(chatId);
                // Map groupMessages to messages if needed, based on response structure
                return response.groupMessages || [];
            }
        },
        // Only enable the query if a chat is selected
        enabled: !!chatId && !!chatType,
        staleTime: 1000 * 60 * 1, // Messages can become stale faster, e.g., 1 minute
        refetchOnWindowFocus: true,
        // Keep previous data while fetching new data for smoother transitions
        // keepPreviousData: true, // Consider enabling this
    });
}; 