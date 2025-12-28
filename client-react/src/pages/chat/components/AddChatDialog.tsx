import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  addPersonToChat,
  createGroup,
  searchPeople,
} from "@/services/chatService";
import { User } from "@/store/chatStore";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Check, Loader2, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

interface AddChatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended User type to handle API response _id vs store id
interface APIUser extends Omit<User, "id"> {
  _id: string;
  id?: string;
}

export function AddChatDialog({ isOpen, onOpenChange }: AddChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounceValue(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<APIUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Group creation state
  const [selectedUsers, setSelectedUsers] = useState<APIUser[]>([]);
  const [isCreatingGroupDetails, setIsCreatingGroupDetails] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupAvatar, setGroupAvatar] = useState(
    `https://api.dicebear.com/9.x/thumbs/svg?seed=${Math.floor(Math.random() * 10000)}`,
  );
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedSearchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await searchPeople(debouncedSearchQuery);
        // Cast response people to APIUser to allow access to _id if present
        setSearchResults((response.people as unknown as APIUser[]) || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsSearching(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery]);

  const handleStartPrivateChat = async (user: APIUser) => {
    try {
      // API expects _id or id depending on implementation. addPersonToChat takes receiverId string.
      await addPersonToChat(user._id || user.id!);
      toast.success(`Chat with ${user.name} started`);
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to start chat");
    }
  };

  const toggleUserSelection = (user: APIUser) => {
    const userId = user._id || user.id;
    if (selectedUsers.some((u) => (u._id || u.id) === userId)) {
      setSelectedUsers(selectedUsers.filter((u) => (u._id || u.id) !== userId));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Group name is required");
      return;
    }

    setIsCreatingGroup(true);
    try {
      const memberIds = selectedUsers.map((u) => u._id || u.id!);

      await createGroup({
        groupName,
        groupDescription,
        groupAvatar,
        members: memberIds,
      });

      toast.success("Group created successfully");
      onOpenChange(false);
      queryClient.invalidateQueries({ queryKey: ["chats"] });

      // Reset state
      setIsCreatingGroupDetails(false);
      setSelectedUsers([]);
      setGroupName("");
      setGroupDescription("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create group");
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const changeGroupAvatar = () => {
    const newSeed = Math.floor(Math.random() * 10000);
    setGroupAvatar(`https://api.dicebear.com/9.x/thumbs/svg?seed=${newSeed}`);
  };

  const renderUserList = (
    users: APIUser[],
    action: (user: APIUser) => void,
    isSelection = false,
  ) => (
    <div className="space-y-2">
      {users.length === 0 && !isSearching && searchQuery && (
        <p className="text-muted-foreground text-center text-sm">
          No users found
        </p>
      )}
      {users.map((user) => {
        const userId = user._id || user.id;
        return (
        <div
          key={userId}
          className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-lg p-2"
          onClick={() => action(user)}
        >
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-sm">@{user.username}</p>
            </div>
          </div>
          {isSelection && (
            <Checkbox
              checked={selectedUsers.some((u) => (u._id || u.id) === userId)}
              onCheckedChange={() => action(user)}
            />
          )}
        </div>
      )})}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-card-foreground sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isCreatingGroupDetails ? "Group Details" : "New Chat"}
          </DialogTitle>
        </DialogHeader>

        {isCreatingGroupDetails ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={groupAvatar} />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={changeGroupAvatar}>
                Change Avatar
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="group-desc">Description</Label>
              <Textarea
                id="group-desc"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setIsCreatingGroupDetails(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleCreateGroup} disabled={isCreatingGroup}>
                {isCreatingGroup && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Group
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat">New Chat</TabsTrigger>
              <TabsTrigger value="group">New Group</TabsTrigger>
            </TabsList>

            <div className="my-4 relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                placeholder="Search people..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearching && (
                <Loader2 className="text-muted-foreground absolute top-2.5 right-2.5 h-4 w-4 animate-spin" />
              )}
            </div>

            <TabsContent value="chat" className="mt-0">
              <ScrollArea className="h-[300px]">
                {renderUserList(searchResults, handleStartPrivateChat)}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="group" className="mt-0">
              {selectedUsers.length > 0 && (
                <div className="mb-2">
                  <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex w-max space-x-2 p-1">
                      {selectedUsers.map((user) => {
                        const userId = user._id || user.id;
                        return (
                        <div
                          key={userId}
                          className="bg-secondary relative flex items-center space-x-2 rounded-full px-3 py-1"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                          <button
                            onClick={() => toggleUserSelection(user)}
                            className="hover:text-destructive ml-1 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )})}
                    </div>
                  </ScrollArea>
                  <div className="mt-2 flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => setIsCreatingGroupDetails(true)}
                    >
                      Next <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              <ScrollArea className="h-[250px]">
                {renderUserList(searchResults, toggleUserSelection, true)}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}
