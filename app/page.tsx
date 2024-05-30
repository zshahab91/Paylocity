"use client";
import ReduxProvider from "@/store/redux-provider";
import AuthViewer from "../components/auth/auth-viewer";
import { useEffect, useState } from "react";
const Home = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    isClient ?
      <ReduxProvider>
    <main className="flex flex-row justify-center items-center p-4">
          <AuthViewer />
        </main>
      </ReduxProvider> : '</>'

  );
};
export default Home;