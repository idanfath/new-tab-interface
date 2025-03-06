import { fetchLocalData } from "@/lib/utils";
import Aurora from "../ReactBits/AuroraBackground";

export default function AuroraBackground() {
  const background_default = "/background.jpg";
  const background = fetchLocalData("background", background_default);
  const colors = fetchLocalData(
    "aurora_colors",
    ["#3A29FF", "#FF94B4", "#FF3232"],
    true
  );
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0  bg-black">
      <img
        src={background}
        className="w-full h-full object-cover absolute"
        onError={(e) => {
          (e.target as HTMLImageElement).src = background_default;
        }}
      />
      <div className="opacity-50 w-full h-full">
        <Aurora colorStops={colors} speed={0.5} />
      </div>
    </div>
  );
}
