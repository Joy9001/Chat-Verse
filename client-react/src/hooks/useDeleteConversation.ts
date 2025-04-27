import { deleteConversation } from '@/services/chatService';
import { useChatStore } from '@/store/chatStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/**
 * Custom hook to delete a private conversation using TanStack Query mutation.
 */
export const useDeleteConversation = () => {
    const queryClient = useQueryClient();
    // Use removePrivateChat action
    const { clearSelectedChat, removePrivateChat } = useChatStore();

    return useMutation<
        any,     // Success response type
        Error,
        string   // Variables type (userId)
    >({
        mutationFn: deleteConversation,
        onSuccess: (data, userId) => {
            console.log(`Conversation with ${userId} deleted successfully`, data);
            toast.success('Conversation deleted.');

            // Call removePrivateChat action
            removePrivateChat(userId);

            // Clear the selected chat details and messages (already handled by removePrivateChat if it was selected)
            // clearSelectedChat();

            // Optional: invalidate
        },
        onError: (error, userId) => {
            console.error(`Error deleting conversation with ${userId}:`, error);
            toast.error(error.message || 'Failed to delete conversation.');
        },
    });
}; 