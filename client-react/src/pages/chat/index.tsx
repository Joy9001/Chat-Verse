import { useAuthStore } from '@/store/auth.store';
import { useSocketStore } from '@/store/socketStore';
import { Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';

export default function ChatPage() {
	const { connectSocket, disconnectSocket } = useSocketStore();
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		if (isAuthenticated) {
			console.log('ChatPage mounted and user authenticated, connecting socket...');
			connectSocket();
		} else {
			console.log('ChatPage mounted but user not authenticated.');
			disconnectSocket();
		}

		return () => {
			console.log('ChatPage unmounting or auth status changed, disconnecting socket...');
			disconnectSocket();
		};
	}, [isAuthenticated, connectSocket, disconnectSocket]);

	return (
		// Mimic the structure from chat.ejs: chat-body and chat-main
		<div className="flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/backImage.avif')" }}>
			{/* Mimic chat-main */}
			<div className="flex h-[95vh] w-[90vw] max-w-screen-xl rounded-xl backdrop-blur-xl bg-background/70 shadow-lg border border-border">
				{/* Placeholder for LeftSideBar */}
				<LeftSideBar />
				{/* Placeholder for RightSideBar */}
				<RightSideBar />
				{/* Outlet might be used later if we add nested routes for specific chats */}
				<Outlet />
			</div>
		</div>
	);
}
