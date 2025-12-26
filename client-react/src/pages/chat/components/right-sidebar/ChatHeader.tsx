// This component is complex and will require state management (Zustand) for selected chat data
// and potentially API calls (TanStack Query) for participants.
// Using placeholder data and local state for now.

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBlockUnblockUser } from "@/hooks/useBlockUnblockUser"; // Import hook
import { useDeleteConversation } from "@/hooks/useDeleteConversation"; // Import hook
import { useLeaveGroup } from "@/hooks/useLeaveGroup"; // Import hook
// import { useAuthStore } from "@/store/auth.store"; // Needed for block/unblock logic later
import { useChatStore } from "@/store/chatStore"; // Import chat store
import {
  DoorClosed,
  Info,
  Link2,
  Loader2,
  Trash2,
  UserX,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChatHeader() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  // Get selected chat details directly from the chat store
  const { selectedChat } = useChatStore();
  // Get current user for block/unblock logic (TODO)
  // const { user: currentUser } = useAuthStore();

  // Use the mutation hooks
  const { mutate: blockUnblockUserMutate, isPending: isBlockingUnblocking } =
    useBlockUnblockUser();
  const {
    mutate: deleteConversationMutate,
    isPending: isDeletingConversation,
  } = useDeleteConversation();
  const { mutate: leaveGroupMutate, isPending: isLeavingGroup } =
    useLeaveGroup();

  // Return null or a placeholder if no chat is selected
  if (!selectedChat) {
    return (
      <div className="border-border bg-primary m-4 flex h-16 items-center justify-between rounded-md border-b px-4 shadow-sm">
        {/* Placeholder when no chat is selected */}
      </div>
    );
  }

  // --- Action Handlers (using selectedChat from store) ---
  const handleCopyLink = () => {
    if (selectedChat.type !== "group") return;
    const joinLink = `${window.location.origin}/join-group?id=${encodeURIComponent(selectedChat.id)}`;
    navigator.clipboard
      .writeText(joinLink)
      .then(() => toast.success("Group invite link copied!"))
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link.");
      });
  };

  const handleBlockUnblock = () => {
    if (selectedChat?.type !== "private" || isBlockingUnblocking) return;
    const action = selectedChat.blockedByMe ? "unblock" : "block";
    console.log(`${action} user ${selectedChat.otherUser.username}...`);
    blockUnblockUserMutate({ userId: selectedChat.id, action });
    setIsInfoModalOpen(false); // Close modal immediately
  };

  const handleDeleteConversation = () => {
    if (selectedChat?.type !== "private" || isDeletingConversation) return;
    console.log(
      `Deleting conversation with ${selectedChat.otherUser.username}...`,
    );
    // TODO: Add confirmation dialog before deleting?
    deleteConversationMutate(selectedChat.id);
    setIsInfoModalOpen(false); // Close modal immediately
  };

  const handleLeaveGroup = () => {
    if (selectedChat?.type !== "group" || isLeavingGroup) return;
    console.log(`Leaving group ${selectedChat.name}...`);
    // TODO: Add confirmation dialog before leaving?
    leaveGroupMutate(selectedChat.id);
    setIsInfoModalOpen(false); // Close modal immediately
  };

  const handleSelectParticipant = (participantId: string) => {
    // TODO: Implement logic to select/start private chat with participant
    console.log("Selected participant for potential chat:", participantId);
    toast.info(`Selected ${participantId} (TODO: Start chat)`);
    // Close the info modal? Or just the dropdown?
    // setIsInfoModalOpen(false);
  };
  // --- End Action Handlers ---

  // Determine details based on selectedChat type
  const chatName = selectedChat.name;
  const chatAvatar =
    selectedChat.type === "private"
      ? selectedChat.otherUser.avatar
      : selectedChat.avatar;
  const chatUsername =
    selectedChat.type === "private" ? selectedChat.otherUser.username : "";
  const chatDescription =
    selectedChat.type === "group" ? selectedChat.description : "";
  const isOnline =
    selectedChat.type === "private" ? selectedChat.otherUser.isOnline : false; // TODO: Get real online status
  const amIBlocked =
    selectedChat.type === "private" ? selectedChat.amIBlocked : false;
  const blockedByMe =
    selectedChat.type === "private" ? selectedChat.blockedByMe : false;

  // Disable buttons if a mutation is pending
  const isActionPending =
    isBlockingUnblocking || isDeletingConversation || isLeavingGroup;

  return (
    <div className="border-border bg-secondary m-4 flex h-16 items-center justify-between rounded-md border-b px-4 shadow-sm">
      {/* Left side: Avatar, Name, Copy Link Button */}
      <div className="flex items-center space-x-3">
        <div
          className={`relative ${isOnline ? 'after:border-primary after:absolute after:right-0 after:bottom-0 after:h-3 after:w-3 after:rounded-full after:border-2 after:bg-green-500 after:content-[""]' : ""}`}
        >
          <Avatar className="border-primary-foreground/50 h-10 w-10 border-2">
            <AvatarImage src={chatAvatar} alt={chatName} />
            <AvatarFallback>{chatName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-primary text-lg font-semibold">
          <h1>{chatName}</h1>
        </div>
        {selectedChat.type === "group" && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopyLink}
                  variant="ghost"
                  size="icon"
                  className="group hover:bg-primary-foreground/10 h-8 w-8"
                >
                  <Link2 className="text-primary-foreground group-hover:text-primary-foreground h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-accent text-accent-foreground">
                <p>Copy Group Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Right side: Info Button & Dialog */}
      <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="group bg-primary hover:bg-primary/80 h-9 w-9 hover:cursor-pointer"
                >
                  <Info className="text-primary-foreground group-hover:text-primary-foreground h-6 w-6" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-accent text-accent-foreground">
              <p>Info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="bg-card text-card-foreground p-0 sm:max-w-xs">
          {/* Info Header with Avatar/Name */}
          <DialogHeader className="p-4 pb-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={chatAvatar} alt={chatName} />
                <AvatarFallback>
                  {chatName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <DialogTitle className="truncate text-base font-bold">
                  {chatName}
                </DialogTitle>
                <p className="text-muted-foreground truncate text-sm">
                  {selectedChat.type === "private"
                    ? `@${chatUsername}`
                    : chatDescription}
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Options Section */}
          <div className="flex flex-col space-y-1 px-2 py-2">
            {selectedChat.type === "private" && (
              <>
                {/* Block/Unblock Button */}
                {!amIBlocked ? (
                  <Button
                    variant="ghost"
                    className="hover:bg-muted group h-10 w-full justify-start text-base font-semibold hover:cursor-pointer"
                    onClick={handleBlockUnblock}
                    disabled={isActionPending}
                  >
                    {isBlockingUnblocking ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <UserX className="text-destructive group-hover:text-destructive mr-2 h-5 w-5" />
                    )}
                    {blockedByMe ? "Unblock" : "Block"}
                  </Button>
                ) : (
                  <div className="text-destructive flex items-center p-3 text-sm font-semibold">
                    <UserX className="mr-2 h-5 w-5" /> You have been blocked
                  </div>
                )}
                {/* Delete Conversation Button */}
                {!amIBlocked && (
                  <Button
                    variant="ghost"
                    className="hover:bg-muted text-destructive group h-10 w-full justify-start text-base font-semibold hover:cursor-pointer"
                    onClick={handleDeleteConversation}
                    disabled={isActionPending}
                  >
                    {isDeletingConversation ? (
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                      <Trash2 className="group-hover:text-destructive mr-2 h-5 w-5" />
                    )}
                    Delete Conversation
                  </Button>
                )}
              </>
            )}
            {selectedChat.type === "group" && (
              <>
                {/* Leave Group Button */}
                <Button
                  variant="ghost"
                  className="hover:bg-muted text-destructive group h-10 w-full justify-start text-base font-semibold"
                  onClick={handleLeaveGroup}
                  disabled={isActionPending}
                >
                  {isLeavingGroup ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <DoorClosed className="group-hover:text-destructive mr-2 h-5 w-5" />
                  )}
                  Leave and Delete Group
                </Button>
                {/* Show Participants Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:bg-muted group h-10 w-full justify-start text-base font-semibold"
                    >
                      <Users className="group-hover:text-foreground mr-2 h-5 w-5" />
                      Show All Members
                      <Badge variant="secondary" className="ml-auto">
                        {selectedChat.participants.length}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border-border mr-2 max-h-60 w-60 overflow-hidden p-0">
                    <DropdownMenuLabel className="p-2 text-base font-semibold">
                      All Members ({selectedChat.participants.length})
                    </DropdownMenuLabel>
                    <ScrollArea className="h-48">
                      <div className="p-1">
                        {selectedChat.participants.map((member) => (
                          <DropdownMenuItem
                            key={member.id}
                            className="hover:bg-muted flex cursor-pointer items-center p-2"
                            onSelect={() => handleSelectParticipant(member.id)}
                          >
                            <Avatar className="mr-2 h-8 w-8">
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow overflow-hidden">
                              <p className="truncate text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-muted-foreground truncate text-xs">
                                @{member.username}
                              </p>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
