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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
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
  const { socket } = useSocketStore(); // Get socket instance
  const { mutate: sendMessageMutate, isPending: isSendingMessage } =
    useSendMessage(); // Use the mutation hook

  const handleEmojiSelect = (emoji: any) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const newText =
        text.substring(0, start) + emoji.native + text.substring(end);
      setMessage(newText);
      // Move cursor after inserted emoji
      // Use setTimeout to ensure state update is processed before setting cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + emoji.native.length;
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

  // Disable input if no chat is selected or socket is not connected
  const isDisabled = !selectedChat || !socket?.connected || isSendingMessage;

  return (
    <div
      className={`flex items-center p-4 border-t border-border ${!selectedChat || !socket?.connected ? "opacity-50 pointer-events-none" : ""}`}
    >
      {/* Emoji Picker Button/Popover */}
      <Popover>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild disabled={isDisabled}>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Smile className="h-6 w-6 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Emoji</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-auto p-0 border-0 mb-2">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            maxFrequentRows={1}
            disabled={isDisabled} // Disable picker if no chat selected
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
          isDisabled
            ? isSendingMessage
              ? "Sending..."
              : socket?.connected
                ? "Select a chat"
                : "Connecting..."
            : "Type a message..."
        }
        className="flex-grow resize-none border-none bg-transparent focus:outline-none focus:ring-0 p-2 text-sm max-h-32 overflow-y-auto text-foreground placeholder:text-muted-foreground"
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
                <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
              ) : (
                <Send className="h-6 w-6 text-muted-foreground" />
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
