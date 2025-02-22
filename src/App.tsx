import "./App.css";
import Header from "@/components/Header";
import Aurora from "@/components/ReactBits/AuroraBackground";
import ScrollVelocity from "./components/ReactBits/MovingText";
import FadeContent from "./components/ReactBits/FadeContent";

function App() {
  return (
    <>
      <AuroraBackground />
      <ScrollText />

      <div className="page relative z-10">
        <Header />
        <SideBar />
      </div>
    </>
  );
}

function SideBar() {
  return (
    <div className="absolute left-2 bg-black max-h-[400px] max-w-[100px] p-2 rounded-xl w-full">
      a
    </div>
  );
}

function AuroraBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={0.2} />
    </div>
  );
}

function ScrollText() {
  return (
    <div className="fixed bottom-0 z-0 opacity-10">
      <FadeContent blur duration={1000} easing="ease-out" initialOpacity={0}>
        <ScrollVelocity
          texts={["danne's tool"]}
          velocity={50}
          className="custom-scroll-text"
        />
      </FadeContent>
    </div>
  );
}

export default App;
