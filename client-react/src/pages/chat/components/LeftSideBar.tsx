import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/auth.store";
import { GroupChat, PrivateChat, useChatStore } from "@/store/chatStore";
import { useSocketStore } from "@/store/socketStore";
import { api } from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { LogOut, UserPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// Interface for the expected API response
interface ChatsApiResponse {
  privateChats: PrivateChat[];
  groupChats: GroupChat[];
}

// Type for individual chat item props
interface ChatItemProps {
  chat: PrivateChat | GroupChat;
  isActive?: boolean;
  isOnline?: boolean; // Add isOnline prop
  onClick: (chat: PrivateChat | GroupChat) => void;
}

const ChatListItem: React.FC<ChatItemProps> = ({
  chat,
  isActive,
  isOnline,
  onClick,
}) => {
  const getAvatarUrl = (chat: PrivateChat | GroupChat) => {
    return chat.type === "private" ? chat.otherUser.avatar : chat.avatar;
  };
  const getName = (chat: PrivateChat | GroupChat) => {
    return chat.type === "private" ? chat.otherUser.name : chat.name;
  };
  const getSecondaryText = (chat: PrivateChat | GroupChat) => {
    return chat.type === "private"
      ? `@${chat.otherUser.username}`
      : chat.description;
  };

  return (
    <div
      key={chat.id}
      onClick={() => onClick(chat)}
      className={`flex items-center p-3 hover:bg-muted cursor-pointer rounded-md group transition-colors duration-150 ${isActive ? "bg-muted" : ""}`}
    >
      <div
        className={`relative mr-3 ${isOnline ? 'after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:border-2 after:border-background' : ""}`}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={getAvatarUrl(chat)} alt={getName(chat)} />
          <AvatarFallback>
            {getName(chat).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow overflow-hidden mr-2">
        <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-foreground">
          {getName(chat)}
        </h4>
        <h4 className="text-xs text-muted-foreground truncate group-hover:text-muted-foreground">
          {getSecondaryText(chat)}
        </h4>
      </div>
      {chat.unreadCount > 0 && (
        <Badge variant="secondary" className="h-6 px-2">
          {chat.unreadCount}
        </Badge>
      )}
    </div>
  );
};

export default function LeftSideBar() {
  const { user, setUser, logout: storeLogout } = useAuthStore();
  const { selectedChat, setSelectedChat, setPrivateChats, setGroupChats } =
    useChatStore();
  const { onlineUsers } = useSocketStore();

  const [isChangeDetailsModalOpen, setIsChangeDetailsModalOpen] =
    useState(false);
  const [editName, setEditName] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editGender, setEditGender] = useState<"male" | "female" | "other">(
    "male",
  );
  const [editAvatar, setEditAvatar] = useState("");

  useEffect(() => {
    if (user) {
      // console.log("[LeftSideBar] Updating edit form state from user:", user);
      setEditName(user.name);
      setEditUsername(user.username);
      const validGender = ["male", "female", "other"].includes(user.gender)
        ? (user.gender as "male" | "female" | "other")
        : "male";
      setEditGender(validGender);
      setEditAvatar(user.avatar);
    } else {
      setEditName("");
      setEditUsername("");
      setEditGender("male");
      setEditAvatar("");
    }
  }, [user]);

  const fetchChatsFn = async (): Promise<ChatsApiResponse> => {
    try {
      console.log(
        "[TanStack Query] Fetching initial chat lists via api.get...",
      );
      const response = await api.get<ChatsApiResponse>("/conversations/chats");
      const data = response.data;
      if (
        !data ||
        !Array.isArray(data.privateChats) ||
        !Array.isArray(data.groupChats)
      ) {
        console.error(
          "[TanStack Query] Invalid chat data structure received:",
          data,
        );
        throw new Error("Invalid chat data format received from API.");
      }
      console.log("[TanStack Query] Fetched chats via api.get:", data);
      return data;
    } catch (error: any) {
      console.error("[TanStack Query] Error in fetchChatsFn:", error);
      throw new Error(error.message || "Failed to fetch chats");
    }
  };

  const {
    data: chatData,
    error: chatError,
    isLoading: isLoadingChats,
  } = useQuery<ChatsApiResponse, Error>({
    queryKey: ["chats", user?._id],
    queryFn: fetchChatsFn,
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    retry: 1,
  });

  useEffect(() => {
    if (chatData) {
      console.log(
        "[LeftSideBar] Updating chat store with fetched data:",
        chatData,
      );
      setPrivateChats(chatData.privateChats);
      setGroupChats(chatData.groupChats);
    }
  }, [chatData, setPrivateChats, setGroupChats]);

  useEffect(() => {
    if (chatError) {
      console.error(
        "[TanStack Query] Final error state after fetch/retry:",
        chatError,
      );
      toast.error(`Failed to load chat lists: ${chatError.message}`);
    }
  }, [chatError]);

  useEffect(() => {
    if (!user) {
      console.log("[LeftSideBar] User logged out, clearing chat store.");
      setPrivateChats([]);
      setGroupChats([]);
    }
  }, [user, setPrivateChats, setGroupChats]);

  const handleAvatarChange = async () => {
    console.log("Fetching new avatar via api.get...");
    try {
      const response = await api.get<{ avatar: string }>("/get-avatar");
      setEditAvatar(response.data.avatar);
    } catch (error: any) {
      console.error("Error fetching avatar:", error);
      toast.error(error.message || "Failed to fetch new avatar.");
    }
  };

  const handleChangeDetailsSubmit = async () => {
    if (!user) return;

    const updatedDetails = {
      name: editName,
      username: editUsername,
      gender: editGender,
      avatar: editAvatar,
    };
    console.log("Submitting changes:", updatedDetails);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const updatedAuthStoreUser = {
        ...user,
        ...updatedDetails,
      };
      const result = {
        success: true,
        user: updatedAuthStoreUser,
        message: "Details updated successfully!",
      };

      if (result.success) {
        setUser(result.user);
        toast.success(result.message);
        setIsChangeDetailsModalOpen(false);
      } else {
        toast.error(result.message || "Failed to update details.");
        if (result.message === "Username already taken") {
          setEditUsername(user.username);
        }
      }
    } catch (err: any) {
      console.error("Error changing details:", err);
      toast.error(err.message || "An error occurred while updating details.");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    storeLogout();
    window.location.href = "/auth/login";
  };

  const handleChatSelect = (chat: PrivateChat | GroupChat) => {
    console.log("Selected chat:", chat.id, chat.type);
    setSelectedChat(chat);
  };

  const privateChats = useChatStore((state) => state.privateChats);
  const groupChats = useChatStore((state) => state.groupChats);

  if (!user) {
    return null;
  }

  return (
    <div className="relative flex h-full w-[35%] flex-col rounded-l-xl border-r border-border bg-background/80">
      <div className="m-4 flex h-16 items-center justify-between rounded-lg border-2 border-primary bg-primary p-2 shadow-md">
        <div className="ml-4 text-xl font-bold text-primary-foreground max-lg:text-lg max-md:text-base max-sm:text-sm">
          <h1>ChatVerse</h1>
        </div>
        <Dialog>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 h-10 w-10 hover:bg-primary-foreground/10 group"
                  >
                    <UserPlus className="h-6 w-6 text-primary-foreground group-hover:text-primary-foreground" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-accent text-accent-foreground"
              >
                <p>New User/Group</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle>Add New Chat / Group</DialogTitle>
            </DialogHeader>
            <div className="p-4">Placeholder for Add User/Group Content</div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mx-5 mb-2 flex items-center justify-between text-foreground">
        <h1 className="text-2xl font-bold max-lg:text-lg max-md:text-base max-sm:hidden">
          All Chats
        </h1>
        <Dialog
          open={isChangeDetailsModalOpen}
          onOpenChange={setIsChangeDetailsModalOpen}
        >
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <div className="avatar online cursor-pointer">
                    <Avatar className="h-12 w-12 scale-100 transition delay-100 duration-200 ease-in-out hover:scale-110">
                      <AvatarImage
                        src={user?.avatar || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-accent text-accent-foreground"
              >
                <p>{user?.name || "User Profile"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DialogContent className="sm:max-w-md bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="flex flex-col items-center space-y-3">
                <Label
                  htmlFor="change-details-profilePic"
                  className="text-lg font-semibold text-primary"
                >
                  Profile Picture
                </Label>
                <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2 ring-offset-background">
                  <AvatarImage
                    id="change-details-profilePic"
                    src={editAvatar || ""}
                    alt={editName || ""}
                  />
                  <AvatarFallback>
                    {editName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAvatarChange}
                >
                  Change
                </Button>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="change-details-name" className="text-primary">
                  Name
                </Label>
                <Input
                  id="change-details-name"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-background text-foreground focus:border-primary"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label
                  htmlFor="change-details-username"
                  className="text-primary"
                >
                  Username
                </Label>
                <Input
                  id="change-details-username"
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-background text-foreground focus:border-primary"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="change-details-gender" className="text-primary">
                  Gender
                </Label>
                <Select
                  value={editGender}
                  onValueChange={(value) =>
                    setEditGender(value as "male" | "female" | "other")
                  }
                >
                  <SelectTrigger
                    id="change-details-gender"
                    className="w-full bg-background text-foreground focus:ring-primary"
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="justify-between px-6 pb-4 sm:justify-between">
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
              <div className="flex space-x-2">
                <DialogClose asChild>
                  {" "}
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>{" "}
                </DialogClose>
                <Button type="button" onClick={handleChangeDetailsSubmit}>
                  Save Changes
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="flex-grow px-2 mb-2">
        <Accordion
          type="multiple"
          defaultValue={["private-chats", "group-chats"]}
          className="w-full"
        >
          <AccordionItem value="private-chats" className="border-b-0">
            <AccordionTrigger className="px-4 py-2 text-lg font-bold hover:no-underline text-foreground/80">
              Private Chats{" "}
              {isLoadingChats && (
                <span className="ml-2 text-xs font-normal">(Loading...)</span>
              )}
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="flex flex-col space-y-1 px-1">
                {privateChats.length === 0 && !isLoadingChats ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    No private chats yet.
                  </p>
                ) : (
                  privateChats.map((chat) => {
                    const isUserOnline =
                      chat.otherUser &&
                      onlineUsers.includes(chat.otherUser.username);
                    return (
                      <ChatListItem
                        key={chat.id}
                        chat={chat}
                        isActive={selectedChat?.id === chat.id}
                        isOnline={isUserOnline}
                        onClick={handleChatSelect}
                      />
                    );
                  })
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="group-chats" className="border-b-0">
            <AccordionTrigger className="px-4 py-2 text-lg font-bold hover:no-underline text-foreground/80">
              Group Chats{" "}
              {isLoadingChats && (
                <span className="ml-2 text-xs font-normal">(Loading...)</span>
              )}
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="flex flex-col space-y-1 px-1">
                {groupChats.length === 0 && !isLoadingChats ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    No group chats yet.
                  </p>
                ) : (
                  groupChats.map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      chat={chat}
                      isActive={selectedChat?.id === chat.id}
                      onClick={handleChatSelect}
                    />
                  ))
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
