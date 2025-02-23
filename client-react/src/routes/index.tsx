import App from '@/App'
import LoginPage from '@/pages/auth/login'
import RegisterPage from '@/pages/auth/register'
import ChatPage from '@/pages/chat'
import { useAuthStore } from '@/stores/auth.store'
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { z } from 'zod'

// Root route
const rootRoute = createRootRoute({
	component: App,
})

// Auth routes
const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auth/login',
	component: LoginPage,
})

const registerRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/auth/register',
	component: RegisterPage,
})

// Chat routes
const chatRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/chat',
	component: ChatPage,
	beforeLoad: () => {
		const { isAuthenticated } = useAuthStore.getState()
		if (!isAuthenticated) {
			throw new Error('Unauthorized')
		}
	},
	errorComponent: () => {
		window.location.href = '/auth/login'
		return null
	},
})

// Define search params schema for chat route
const chatSearchSchema = z.object({
	userId: z.string().optional(),
	groupId: z.string().optional(),
})

// Create and export the router configuration
const routeTree = rootRoute.addChildren([
	loginRoute,
	registerRoute,
	chatRoute.addChildren([
		createRoute({
			getParentRoute: () => chatRoute,
			path: '/direct/$userId',
			validateSearch: chatSearchSchema,
		}),
		createRoute({
			getParentRoute: () => chatRoute,
			path: '/group/$groupId',
			validateSearch: chatSearchSchema,
		}),
	]),
])

export const router = createRouter({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}
