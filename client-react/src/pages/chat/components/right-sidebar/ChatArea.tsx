import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteMessage } from "@/hooks/useDeleteMessage";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useChatStore } from "@/store/chatStore";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";

const formatTimestamp = (timestamp: string): { time: string; date: string } => {
  try {
    const date = new Date(timestamp);
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
  } = useChatStore();
  const { user: currentUser } = useAuthStore();
  const { mutate: deleteMessage } = useDeleteMessage();

  const {
    data: fetchedMessages,
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    error: messagesError,
  } = useFetchMessages();

  console.log("fetchedMessages", fetchedMessages);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fetchedMessages) {
      console.log(
        "Messages fetched via useQuery, updating store:",
        fetchedMessages,
      );
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages, setMessages]);

  // Add an additional effect to manage loading state based on query state
  useEffect(() => {
    const { setLoadingMessages } = useChatStore.getState();
    setLoadingMessages(isLoadingMessages);
  }, [isLoadingMessages]);

  useEffect(() => {
    if (!isLoadingMessages) {
      const timerId = setTimeout(() => {
        const lastMessageElement =
          scrollAreaRef.current?.querySelector("#last-message");

        if (lastMessageElement) {
          lastMessageElement.scrollIntoView({
            behavior: "smooth",
          });
        } else if (scrollAreaRef.current && messagesFromStore.length > 0) {
          scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timerId);
    }
  }, [messagesFromStore, isLoadingMessages, selectedChat]);

  const handleDeleteMessage = (messageId: string) => {
    if (!selectedChat) return;

    deleteMessage({
      messageId,
      chatId: selectedChat.id,
      chatType: selectedChat.type,
    });
  };

  let lastMessageDate = "";

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

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="flex flex-col space-y-4">
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

          {isErrorMessages && !isLoadingMessages && (
            <div className="flex h-full items-center justify-center">
              <p className="text-destructive">
                Error: {messagesError?.message || "Failed to load messages."}
              </p>
            </div>
          )}

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

          {!isLoadingMessages &&
            !isErrorMessages &&
            messagesFromStore.map((msg, index) => {
              const { time, date } = formatTimestamp(msg.createdAt);
              const showDateSeparator = date !== lastMessageDate;
              if (showDateSeparator) lastMessageDate = date;
              const isCurrentUser =
                msg.senderId === currentUser?._id ||
                msg.senderId === "currentUser";
              const isLastMessage = index === messagesFromStore.length - 1;

              return (
                <div
                  key={msg._id}
                  id={isLastMessage ? "last-message" : undefined}
                >
                  {showDateSeparator && (
                    <div className="my-4 flex justify-center">
                      <span className="text-muted-foreground bg-muted rounded-full px-3 py-1 text-xs">
                        {date}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "flex w-full items-end gap-2",
                      isCurrentUser ? "justify-end" : "justify-start",
                    )}
                  >
                    {isCurrentUser ? (
                      <div className="flex items-start justify-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-full opacity-70 transition-opacity hover:bg-white/10 hover:opacity-100"
                            >
                              <MoreVertical className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-36 rounded-lg border border-slate-600/50 bg-zinc-700/95 p-1 shadow-lg backdrop-blur-sm"
                          >
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-zinc-600/80 focus:bg-zinc-600/80">
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-zinc-600/80 focus:bg-zinc-600/80">
                              Forward
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-zinc-600/80 focus:bg-zinc-600/80">
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-zinc-600/80 focus:bg-zinc-600/80">
                              Report
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer rounded-md px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-zinc-600/80 focus:bg-zinc-600/80"
                              onClick={() => handleDeleteMessage(msg._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div
                          className={cn(
                            "relative max-w-[70%] flex-col space-y-1 rounded-lg px-4 py-2 text-base",
                            "bg-primary text-primary-foreground rounded-br-none",
                          )}
                        >
                          {selectedChat?.type === "group" && (
                            <p className="text-foreground/70 text-xs font-medium">
                              {msg.senderName || "Unknown User"}
                            </p>
                          )}
                          <p className="break-words whitespace-pre-wrap">
                            {msg.message}
                          </p>
                          <span className="text-primary-foreground/70 block text-right text-xs">
                            {time}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "relative max-w-[70%] flex-col space-y-1 rounded-lg px-4 py-2 text-base",
                          "bg-muted text-muted-foreground rounded-bl-none",
                        )}
                      >
                        {selectedChat?.type === "group" && (
                          <p className="text-foreground/70 text-xs font-medium">
                            {msg.senderName || "Unknown User"}
                          </p>
                        )}
                        <p className="break-words whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <span className="text-muted-foreground/70 block text-right text-xs">
                          {time}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
}
