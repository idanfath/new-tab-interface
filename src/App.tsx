import "./App.css";
import Header from "@/components/Header";
import Aurora from "@/components/ReactBits/AuroraBackground";
import SideBar from "./components/Sidebar";

function App() {
  return (
    <>
      <AuroraBackground />
      <div className="page relative z-10">
        <Header />
        <SideBar />
      </div>
    </>
  );
}

function AuroraBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0  bg-black">
      <img
        src="/background.jpg"
        className="w-full h-full object-cover absolute"
      />
      <div className="opacity-50 w-full h-full">
        <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.2} />
      </div>
    </div>
  );
}

export default App;
