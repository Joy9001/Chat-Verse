import App from "@/App";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ChatPage from "@/pages/chat";
import { useAuthStore } from "@/store/auth.store";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { z } from "zod";

// Root route
const rootRoute = createRootRoute({
  component: App,
  notFoundComponent: NotFoundPage,
});

// Auth routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: LoginPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/chat" });
    }
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/register",
  component: RegisterPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/chat" });
    }
  },
});

// Chat routes
const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: ChatPage,
  beforeLoad: async () => {
    const { isAuthenticated, fetchCurrentUser } = useAuthStore.getState();

    if (!isAuthenticated) {
      try {
        await fetchCurrentUser();

        const { isAuthenticated: updatedAuth } = useAuthStore.getState();

        if (!updatedAuth) {
          throw new Error("Unauthorized");
        }
      } catch {
        throw new Error("Unauthorized");
      }
    }
  },
  errorComponent: () => {
    window.location.href = "/auth/login";
    return null;
  },
});

// Define search params schema for chat route
const chatSearchSchema = z.object({
  userId: z.string().optional(),
  groupId: z.string().optional(),
});

// Index route - redirects to chat if authenticated, otherwise to login
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/chat" });
    } else {
      throw redirect({ to: "/auth/login" });
    }
  },
});

// Create and export the router configuration
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  chatRoute.addChildren([
    createRoute({
      getParentRoute: () => chatRoute,
      path: "/direct/$userId",
      validateSearch: chatSearchSchema,
    }),
    createRoute({
      getParentRoute: () => chatRoute,
      path: "/group/$groupId",
      validateSearch: chatSearchSchema,
    }),
  ]),
]);

export const router = createRouter({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
