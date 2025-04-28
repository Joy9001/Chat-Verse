import { useChatStore } from "@/store/chatStore"; // Import chat store
import ChatArea from "./right-sidebar/ChatArea";
import ChatHeader from "./right-sidebar/ChatHeader";
import MessageInput from "./right-sidebar/MessageInput";

export default function RightSideBar() {
  // Based on client/views/partials/rightSide.ejs
  // Mimics the 'all_chats_container' div

  // Get selected chat from the store
  const { selectedChat } = useChatStore();

  return (
    <div className="relative flex h-full w-[65%] flex-col rounded-r-xl bg-background/60 overflow-hidden">
      {/* Use selectedChat from store for conditional rendering */}
      {selectedChat ? (
        <div className="flex flex-col h-full">
          {/* Render ChatHeader, ChatArea, MessageInput when a chat is selected */}
          <ChatHeader />
          <div className="flex-1 overflow-auto">
            <ChatArea />
          </div>
          <MessageInput />
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">
            Select a chat to start messaging
          </p>
          {/* Or render the initial profile info like in chatMid.ejs */}
        </div>
      )}
    </div>
  );
}
