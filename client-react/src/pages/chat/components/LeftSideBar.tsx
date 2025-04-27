import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuthStore } from '@/store/auth.store';
import { GroupChat, PrivateChat, useChatStore } from '@/store/chatStore';
import { useSocketStore } from '@/store/socketStore';
import { LogOut, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";


// Type for individual chat item props
interface ChatItemProps {
    chat: PrivateChat | GroupChat;
    isActive?: boolean;
    isOnline?: boolean; // Add isOnline prop
    onClick: (chat: PrivateChat | GroupChat) => void;
}

const ChatListItem: React.FC<ChatItemProps> = ({ chat, isActive, isOnline, onClick }) => {
    const getAvatarUrl = (chat: PrivateChat | GroupChat) => {
        return chat.type === 'private' ? chat.otherUser.avatar : chat.avatar;
    }
    const getName = (chat: PrivateChat | GroupChat) => {
        return chat.type === 'private' ? chat.otherUser.name : chat.name;
    }
    const getSecondaryText = (chat: PrivateChat | GroupChat) => {
        return chat.type === 'private' ? `@${chat.otherUser.username}` : chat.description;
    }

    return (
        <div
            key={chat.id}
            onClick={() => onClick(chat)}
            className={`flex items-center p-3 hover:bg-muted cursor-pointer rounded-md group transition-colors duration-150 ${isActive ? 'bg-muted' : ''}`}
        >
            <div className={`relative mr-3 ${isOnline ? 'after:content-[""] after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:bg-green-500 after:rounded-full after:border-2 after:border-background' : ''}`}>
                <Avatar className="h-12 w-12">
                    <AvatarImage src={getAvatarUrl(chat)} alt={getName(chat)} />
                    <AvatarFallback>{getName(chat).charAt(0).toUpperCase()}</AvatarFallback>
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
    const {
        privateChats,
        groupChats,
        selectedChat,
        setSelectedChat,
        // setPrivateChats, // Keep setters if needed for socket updates
        // setGroupChats
    } = useChatStore();
    const { onlineUsers } = useSocketStore();

    const [isChangeDetailsModalOpen, setIsChangeDetailsModalOpen] = useState(false);
    const [editName, setEditName] = useState(user?.name || '');
    const [editUsername, setEditUsername] = useState(user?.username || '');
    const [editGender, setEditGender] = useState(user?.gender || 'male');
    const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

    useEffect(() => {
        if (user) {
            setEditName(user.name);
            setEditUsername(user.username);
            setEditGender(user.gender as 'male' | 'female' | 'other'); // Ensure type safety
            setEditAvatar(user.avatar);
        }
        // TODO: If not fetching initial chats via hook, how are lists populated?
    }, [user]);

    const handleAvatarChange = async () => {
        console.log("Fetching new avatar...");
        try {
            const res = await fetch('/api/get-avatar');
            if (!res.ok) throw new Error('Failed to fetch avatar');
            const data = await res.json();
            setEditAvatar(data.avatar); // Update local state for modal preview
        } catch (err) {
            console.error('Error fetching avatar:', err);
            toast.error("Failed to fetch new avatar.");
        }
    };

    const handleChangeDetailsSubmit = async () => {
        if (!user) return;

        const updatedDetails = {
            // Use correct id field if it exists in your User type
            // id: user.id, 
            name: editName,
            username: editUsername,
            gender: editGender,
            avatar: editAvatar,
        };
        console.log("Submitting changes:", updatedDetails);

        try {
            // --- Placeholder Success Logic (Update with actual API call later) ---
            await new Promise(resolve => setTimeout(resolve, 500));
            // Construct the updated user object based on your actual User type structure
            const updatedUser = { ...user, ...updatedDetails };
            const result = { success: true, user: updatedUser, message: 'Details updated successfully!' };
            // --- End Placeholder --- 

            if (result.success) {
                setUser(result.user); // Update the user in the Zustand store
                toast.success(result.message);
                setIsChangeDetailsModalOpen(false);
            } else {
                toast.error(result.message || 'Failed to update details.');
                if (result.message === 'Username already taken') {
                    setEditUsername(user.username); // Reset username from original store user
                }
            }
        } catch (err: any) {
            console.error('Error changing details:', err);
            toast.error(err.message || 'An error occurred while updating details.');
        }
    };

    const handleLogout = () => {
        console.log("Logging out...");
        storeLogout();
        window.location.href = '/auth/login';
    };

    const handleChatSelect = (chat: PrivateChat | GroupChat) => {
        console.log("Selected chat:", chat.id, chat.type);
        setSelectedChat(chat); // Update the selected chat in the store
        // TODO: Fetch messages for this chat -> this should trigger automatically
        // when selectedChat changes if using useEffect in ChatArea or via a dedicated action
    };

    if (!user) {
        // Render a loading state or redirect to login if not authenticated
        // This depends on how initial auth check is handled
        // return <div>Loading user...</div>; // Or redirect, or null
        // For now, let's assume the parent route handles unauthorized access
        // and just render nothing or a minimal sidebar if no user.
        return null;
    }

    // --- DEBUGGING LOGS ---
    console.log('[LeftSideBar] User object:', user);
    console.log('[LeftSideBar] User avatar URL:', user?.avatar);
    // --- END DEBUGGING LOGS ---

    return (
        <div className="relative flex h-full w-[35%] flex-col rounded-l-xl border-r border-border bg-background/80">
            {/* Header section */}
            <div className="m-4 flex h-16 items-center justify-between rounded-lg border-2 border-primary bg-primary p-2 shadow-md">
                {/* Title */}
                <div className="ml-4 text-xl font-bold text-primary-foreground max-lg:text-lg max-md:text-base max-sm:text-sm">
                    <h1>ChatVerse</h1>
                </div>
                {/* Add User/Group Button & Dialog */}
                <Dialog>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="mr-2 h-10 w-10 hover:bg-primary-foreground/10 group">
                                        <UserPlus className="h-6 w-6 text-primary-foreground group-hover:text-primary-foreground" />
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="bg-accent text-accent-foreground">
                                <p>New User/Group</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
                        <DialogHeader>
                            <DialogTitle>Add New Chat / Group</DialogTitle>
                            {/* TODO: Implement Tabs from addUsers.ejs (New Chat / New Group) */}
                        </DialogHeader>
                        <div className="p-4">
                            Placeholder for Add User/Group Content
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* All messages title & User Details Trigger */}
            <div className="mx-5 mb-2 flex items-center justify-between text-foreground">
                <h1 className="text-2xl font-bold max-lg:text-lg max-md:text-base max-sm:hidden">All Chats</h1>
                <Dialog open={isChangeDetailsModalOpen} onOpenChange={setIsChangeDetailsModalOpen}>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <div className="avatar online cursor-pointer">
                                        <Avatar className="h-12 w-12 scale-100 transition delay-100 duration-200 ease-in-out hover:scale-110">
                                            <AvatarImage src={user?.avatar} alt={user?.name} />
                                            <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="bg-accent text-accent-foreground">
                                <p>{user.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/* Change User Details Modal Content */}
                    <DialogContent className="sm:max-w-md bg-card text-card-foreground">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-4 p-4">
                            {/* Avatar */}
                            <div className="flex flex-col items-center space-y-3">
                                <Label htmlFor="change-details-profilePic" className="text-lg font-semibold text-primary">
                                    Profile Picture
                                </Label>
                                <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2 ring-offset-background">
                                    <AvatarImage id="change-details-profilePic" src={editAvatar || ''} alt={editName || ''} />
                                    <AvatarFallback>{editName?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="sm" onClick={handleAvatarChange}>Change</Button>
                            </div>
                            {/* Name Input */}
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="change-details-name" className="text-primary">Name</Label>
                                <Input id="change-details-name" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter your name" className="bg-background text-foreground focus:border-primary" />
                            </div>
                            {/* Username Input */}
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="change-details-username" className="text-primary">Username</Label>
                                <Input id="change-details-username" type="text" value={editUsername} onChange={(e) => setEditUsername(e.target.value)} placeholder="Enter your username" className="bg-background text-foreground focus:border-primary" />
                            </div>
                            {/* Gender Select */}
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="change-details-gender" className="text-primary">Gender</Label>
                                <Select value={editGender} onValueChange={(value) => setEditGender(value as 'male' | 'female' | 'other')}>
                                    <SelectTrigger id="change-details-gender" className="w-full bg-background text-foreground focus:ring-primary">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="justify-between px-6 pb-4 sm:justify-between">
                            <Button variant="destructive" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                            <div className="flex space-x-2">
                                <DialogClose asChild> <Button type="button" variant="secondary">Cancel</Button> </DialogClose>
                                <Button type="button" onClick={handleChangeDetailsSubmit}>Save Changes</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Chat List Area - Render directly from store state */}
            <ScrollArea className="flex-grow px-2 mb-2">
                <Accordion type="multiple" defaultValue={['private-chats', 'group-chats']} className="w-full">
                    <AccordionItem value="private-chats" className="border-b-0">
                        <AccordionTrigger className="px-4 py-2 text-lg font-bold hover:no-underline text-foreground/80">
                            Private Chats
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                            <div className="flex flex-col space-y-1 px-1">
                                {privateChats.length === 0 ? (
                                    <p className="p-4 text-center text-sm text-muted-foreground">No private chats yet.</p>
                                ) : (
                                    privateChats.map((chat) => {
                                        const isUserOnline = onlineUsers.includes(chat.otherUser.username);
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
                            Group Chats
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                            <div className="flex flex-col space-y-1 px-1">
                                {groupChats.length === 0 ? (
                                    <p className="p-4 text-center text-sm text-muted-foreground">No group chats yet.</p>
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

            {/* Old Alert Section - Replaced by sonner toasts */}
            {/*
            {notification.show && (
                 <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 z-10">
                    <Alert variant="default" className="bg-background border-primary text-primary">
                        <Info className="h-4 w-4 stroke-primary" />
                        <AlertTitle>Notification</AlertTitle>
                        <AlertDescription>
                            {notification.message}
                         </AlertDescription>
                    </Alert>
                 </div>
             )}
             */}
        </div>
    );
} 