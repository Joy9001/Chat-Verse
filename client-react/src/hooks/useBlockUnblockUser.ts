import { blockUser, unblockUser } from '@/services/chatService';
import { useChatStore } from '@/store/chatStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface BlockUnblockVariables {
    userId: string;
    action: 'block' | 'unblock';
}

/**
 * Custom hook to block or unblock a user using TanStack Query mutation.
 */
export const useBlockUnblockUser = () => {
    const queryClient = useQueryClient();
    const { updatePrivateChatBlockStatus } = useChatStore(); // Need an action to update store

    return useMutation<
        any,                      // Success response type (adjust based on API return)
        Error,
        BlockUnblockVariables
    >({
        mutationFn: async ({ userId, action }: BlockUnblockVariables) => {
            if (action === 'block') {
                return await blockUser(userId);
            } else {
                return await unblockUser(userId);
            }
        },
        onSuccess: (data, variables) => {
            const { userId, action } = variables;
            const successMessage = action === 'block' ? 'User blocked successfully' : 'User unblocked successfully';
            console.log(successMessage, data);
            toast.success(successMessage);

            // Update the block status in the chatStore
            // Assuming the action was initiated by the current user
            updatePrivateChatBlockStatus(userId, action === 'block', true);

            // Optionally, refetch messages or chat details if block status affects them
            // queryClient.invalidateQueries({ queryKey: ['messages', userId] });
            // queryClient.invalidateQueries({ queryKey: ['chats', 'initial'] }); // Or invalidate chat list query
        },
        onError: (error, variables) => {
            const { action } = variables;
            const errorMessage = action === 'block' ? 'Failed to block user' : 'Failed to unblock user';
            console.error(`${errorMessage}:`, error);
            toast.error(error.message || `${errorMessage}.`);
        },
    });
}; 