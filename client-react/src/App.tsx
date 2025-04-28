import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/auth.store";

function App() {
  useEffect(() => {
    useAuthStore.getState().fetchCurrentUser();
  }, []);

  return (
    <div className="bg-background font-dm min-h-screen">
      <Outlet /> {/* This will render the matched route */}
    </div>
  );
}

export default App;
