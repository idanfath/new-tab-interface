import "./App.css";
import Header from "@/components/custom/header/Header";
import Aurora from "@/components/ReactBits/AuroraBackground";
import SplashCursor from "./components/ReactBits/SplashCursor";

function App() {
  return (
    <>
      <AuroraBackground />
      <SplashCursor />
      <div className="page relative z-10">
        <Header />
      </div>
    </>
  );
}

function AuroraBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black">
      <img
        src="/background.jpg"
        className="w-full h-full object-cover absolute "
      />
      <div className="opacity-50 w-full h-full">
        <Aurora colorStops={["#1A1A40", "#4B0082", "#8B0000"]} speed={0.2} />
      </div>
    </div>
  );
}

export default App;
