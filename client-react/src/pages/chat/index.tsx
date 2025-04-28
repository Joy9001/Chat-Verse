import { useAuthStore } from "@/store/auth.store";
import { useSocketStore } from "@/store/socketStore";
import { useEffect } from "react";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";

export default function ChatPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthStore();

  useEffect(() => {
    const { connectSocket, disconnectSocket } = useSocketStore.getState();

    if (!isAuthLoading && isAuthenticated) {
      console.log(
        "ChatPage mounted, auth check complete, user authenticated. Connecting socket...",
      );
      connectSocket();
    } else if (!isAuthLoading && !isAuthenticated) {
      console.log(
        "ChatPage mounted, auth check complete, user NOT authenticated.",
      );
      disconnectSocket();
    } else {
      console.log("ChatPage mounted, waiting for auth check to complete...");
    }

    return () => {
      const { disconnectSocket } = useSocketStore.getState();
      console.log(
        "ChatPage unmounting or auth status/loading changed, disconnecting socket...",
      );
      disconnectSocket();
    };
  }, [isAuthenticated, isAuthLoading]);

  return (
    // Mimic the structure from chat.ejs: chat-body and chat-main
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      {/* Mimic chat-main */}
      <div className="flex h-[95vh] w-[90vw] max-w-screen-xl rounded-xl backdrop-blur-xl bg-background/70 shadow-lg border border-border">
        {/* Placeholder for LeftSideBar */}
        <LeftSideBar />
        {/* Placeholder for RightSideBar */}
        <RightSideBar />
        {/* Outlet removed to fix overflow issue */}
      </div>
    </div>
  );
}
