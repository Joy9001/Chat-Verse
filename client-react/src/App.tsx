import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import './App.css'
import { useAuthStore } from './store/auth.store'

function App() {
	useEffect(() => {
		useAuthStore.getState().fetchCurrentUser()
	}, [])

	return (
		<div className="min-h-screen bg-background font-dm">
			<Outlet /> {/* This will render the matched route */}
		</div>
	)
}

export default App
