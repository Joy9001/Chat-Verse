import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chatStore";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";

// Function to format date
const formatTimestamp = (timestamp: string): { time: string; date: string } => {
  try {
    const date = new Date(timestamp);
    // Check if date is valid before formatting
    if (isNaN(date.getTime())) {
      console.warn("Invalid date timestamp received:", timestamp);
      return { time: "--:--", date: "Invalid Date" };
    }
    return {
      time: format(date, "HH:mm"),
      date: format(date, "dd MMM, yyyy"),
    };
  } catch (error) {
    console.error("Error formatting timestamp:", timestamp, error);
    return { time: "--:--", date: "Error" };
  }
};

export default function ChatArea() {
  const {
    selectedChat,
    setMessages,
    messages: messagesFromStore,
  } = useChatStore(); // Get store actions/state
  const { user: currentUser } = useAuthStore();

  // Use the hook to fetch messages
  const {
    data: fetchedMessages,
    isLoading: isLoadingMessages, // Use loading state from query
    isError: isErrorMessages, // Use error state from query
    error: messagesError, // Use error object from query
  } = useFetchMessages();

  console.log("fetchedMessages", fetchedMessages);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Update Zustand store when messages are successfully fetched
  useEffect(() => {
    if (fetchedMessages) {
      console.log(
        "Messages fetched via useQuery, updating store:",
        fetchedMessages,
      );
      setMessages(fetchedMessages);
    }
    // Optionally handle query error here if needed (e.g., global error state)
    // if (isErrorMessages) { setError(messagesError?.message || 'Failed to load messages.') }
  }, [fetchedMessages, setMessages]);

  // Scroll to bottom effect (now depends on store messages and query loading state)
  useEffect(() => {
    if (!isLoadingMessages && scrollAreaRef.current) {
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    // Depend on messagesFromStore to scroll when new messages are added (e.g., via socket)
  }, [messagesFromStore, isLoadingMessages]);

  let lastMessageDate = "";

  // Determine details for the profile section
  const chatName = selectedChat?.name || "";
  const chatAvatar = selectedChat
    ? selectedChat.type === "private"
      ? selectedChat.otherUser.avatar
      : selectedChat.avatar
    : "";
  const chatUsername =
    selectedChat?.type === "private" ? selectedChat.otherUser.username : "";
  const chatDescription =
    selectedChat?.type === "group" ? selectedChat.description : "";

  return (
    <div className="flex flex-grow flex-col overflow-hidden">
      {/* Profile Info Section (Only render if a chat is selected) */}
      {selectedChat && (
        <div className="flex flex-col items-center justify-around px-4 py-4">
          <Avatar className="ring-primary ring-offset-background mb-2 h-16 w-16 ring-2 ring-offset-2">
            <AvatarImage src={chatAvatar} alt={chatName} />
            <AvatarFallback>{chatName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="max-w-[80%] text-center">
            <h1 className="text-foreground truncate text-lg font-semibold">
              {chatName}
            </h1>
            <p className="text-muted-foreground truncate text-sm">
              {selectedChat.type === "private"
                ? `@${chatUsername}`
                : chatDescription}
            </p>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="flex flex-col space-y-4">
          {/* Loading Skeleton */}
          {isLoadingMessages && (
            <div className="space-y-4 p-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex w-full items-end ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                >
                  <Skeleton
                    className={`h-12 rounded-lg ${i % 2 === 0 ? "w-1/2" : "w-2/3"}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {isErrorMessages && !isLoadingMessages && (
            <div className="flex h-full items-center justify-center">
              <p className="text-destructive">
                Error: {messagesError?.message || "Failed to load messages."}
              </p>
            </div>
          )}

          {/* No Messages Info */}
          {!isLoadingMessages &&
            !isErrorMessages &&
            messagesFromStore.length === 0 &&
            selectedChat && (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}

          {/* Render Messages */}
          {!isLoadingMessages &&
            !isErrorMessages &&
            messagesFromStore.map((msg) => {
              const { time, date } = formatTimestamp(msg.createdAt);
              const showDateSeparator = date !== lastMessageDate;
              if (showDateSeparator) lastMessageDate = date;
              // Use currentUser._id for comparison
              const isCurrentUser =
                msg.senderId === currentUser?._id ||
                msg.senderId === "currentUser";

              return (
                <React.Fragment key={msg._id}>
                  {showDateSeparator && (
                    <div className="my-4 flex justify-center">
                      <span className="text-muted-foreground bg-muted rounded-full px-3 py-1 text-xs">
                        {date}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "flex w-full items-end",
                      isCurrentUser ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "flex max-w-[70%] flex-col space-y-1 rounded-lg px-4 py-2 text-base",
                        isCurrentUser
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-muted text-muted-foreground rounded-bl-none",
                      )}
                    >
                      {selectedChat?.type === "group" && !isCurrentUser && (
                        <p className="text-foreground/70 text-xs font-medium">
                          {msg.senderName || "Unknown User"}
                        </p>
                      )}
                      <p className="break-words whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <span
                        className={cn(
                          "self-end pt-1 text-xs",
                          isCurrentUser
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {time}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}
