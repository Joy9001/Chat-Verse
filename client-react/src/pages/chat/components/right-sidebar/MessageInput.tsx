import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSendMessage } from "@/hooks/useSendMessage"; // Import the mutation hook
import { useAuthStore } from "@/store/auth.store"; // Import auth store
import { useChatStore } from "@/store/chatStore"; // Import chat store
import { useSocketStore } from "@/store/socketStore"; // Import socket store
import EmojiPicker, { Theme } from "emoji-picker-react"; // Add this line
import { Loader2, Send, Smile } from "lucide-react";
import React, { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// Removed placeholder data

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Get selected chat and current user from stores
  const { selectedChat, addMessage: addMessageToStore } = useChatStore();
  const { user: currentUser } = useAuthStore();
  const { socket } = useSocketStore();
  const { mutate: sendMessageMutate, isPending: isSendingMessage } =
    useSendMessage();

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    // Rename and update signature
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText =
        text.substring(0, start) + emojiData.emoji + text.substring(end); // Use emojiData.emoji
      setMessage(newText);
      // Move cursor after inserted emoji
      // Use setTimeout to ensure state update is processed before setting cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + emojiData.emoji.length; // Use emojiData.emoji.length
        textarea.focus();
      }, 0);
    }
  };

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (
      trimmedMessage === "" ||
      !selectedChat ||
      !currentUser ||
      isSendingMessage
    )
      return; // Prevent sending if pending

    // Optimistic UI update: Add message immediately to the store
    // Create a temporary message object (backend might override _id, createdAt)
    const optimisticMessage = {
      _id: `optimistic-${Date.now()}`,
      senderId: currentUser._id,
      senderName: currentUser.name, // Add sender name for group chats
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      // Add groupId/receiverId if needed by Message type definition
      groupId: selectedChat.type === "group" ? selectedChat.id : undefined,
      receiverId: selectedChat.type === "private" ? selectedChat.id : undefined,
    };
    // Ensure optimisticMessage matches the store's Message type
    addMessageToStore(optimisticMessage as any); // Use type assertion carefully or refine types

    setMessage("");

    console.log(
      `Calling mutation to send message to ${selectedChat.type} chat ${selectedChat.id}:`,
      trimmedMessage,
    );

    // Call the mutation instead of socket.emit
    sendMessageMutate({
      chatId: selectedChat.id,
      chatType: selectedChat.type,
      message: trimmedMessage,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter press (but not Shift+Enter)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline character
      handleSendMessage();
    }
  };

  // Store specific disabled states for better handling
  const noSelectedChat = !selectedChat;
  const socketDisconnected = !socket?.connected;
  const isDisabled = noSelectedChat || socketDisconnected || isSendingMessage;

  return (
    <div
      className={`border-border flex items-center border-t p-4 ${isDisabled ? "pointer-events-none opacity-50" : ""}`}
    >
      {/* Emoji Picker Button/Popover */}
      <Popover>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild disabled={isDisabled}>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Smile className="text-muted-foreground h-6 w-6" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="mb-2 w-auto border-0 p-0">
          <EmojiPicker
            onEmojiClick={handleEmojiClick} // Use onEmojiClick and the renamed handler
            theme={Theme.LIGHT} // Use Theme enum
            // width="100%" // Optional: Adjust width/height if needed
            // height={400} // Optional: Adjust height
            lazyLoadEmojis={true}
            previewConfig={{ showPreview: false }} // Optional: Hide preview if desired
            searchDisabled={true} // Optional: Disable search
            skinTonesDisabled={true} // Optional: Disable skin tones
            // disabled={isDisabled} // Control via PopoverTrigger
          />
        </PopoverContent>
      </Popover>

      {/* Textarea Input */}
      <TextareaAutosize
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          isSendingMessage
            ? "Sending..."
            : socketDisconnected
              ? "Connecting..."
              : noSelectedChat
                ? "Select a chat"
                : "Type a message..."
        }
        className="text-foreground placeholder:text-muted-foreground max-h-32 flex-grow resize-none overflow-y-auto border-none bg-transparent p-2 text-sm focus:ring-0 focus:outline-none"
        maxRows={5}
        minRows={1}
        disabled={isDisabled} // Disable textarea if no chat selected
      />

      {/* Send Button */}
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={handleSendMessage}
              disabled={isDisabled || message.trim() === ""} // Disable if message empty or connection issues
            >
              {isSendingMessage ? (
                <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
              ) : (
                <Send className="text-muted-foreground h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Send</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
