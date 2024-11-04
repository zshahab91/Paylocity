"use client";
import MainPage from "@/components/mainPage";
import ReduxProvider from "@/store/redux-provider";
const Home = () => {
  return (

    <ReduxProvider>
      <main className="justify-center items-center p-4">
        <MainPage/>
      </main>
    </ReduxProvider>

  );
};
export default Home;