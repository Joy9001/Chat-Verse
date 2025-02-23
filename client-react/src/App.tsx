import { Outlet } from '@tanstack/react-router'
import './App.css'

function App() {
	return (
		<div className="min-h-screen bg-background font-dm">
			<Outlet /> {/* This will render the matched route */}
		</div>
	)
}

export default App
