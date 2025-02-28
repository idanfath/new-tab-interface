import "./App.css";
import Aurora from "@/components/ReactBits/AuroraBackground";
import Header from "./components/custom/header/Header";
import TabsComponent from "./components/custom/tabs/tabs";
import ContextMenuWrap from "./components/wrapper/contextmenuwrap";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ContextMenuWrap className="select-none">
      <AuroraBackground />
      <Toaster />
      <div className="page relative z-10">
        <Header />
        <TabsComponent />
      </div>
    </ContextMenuWrap>
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
