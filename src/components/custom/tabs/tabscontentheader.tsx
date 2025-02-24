import ShinyText from "@/components/ReactBits/ShinyText";
import { capitalize } from "@/lib/utils";

interface TabsContentHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function TabsContentHeader({
  activeTab,
  setActiveTab,
}: TabsContentHeaderProps) {
  const handleClose = () => {
    setActiveTab("");
  };

  return (
    <header className="flex items-center rounded-t-lg justify-between p-2 px-4 bg-black/40 bg-glass">
      <div className="flex-1">
        <ShinyText text={capitalize(activeTab)} className="font-bold" />
      </div>
      <div className="flex flex-1 justify-end gap-1 *:rounded-full *:h-3 *:w-3 ">
        <div
          className="bg-red-500 hover:bg-opacity-80 cursor-pointer"
          onClick={handleClose}
        ></div>
        <div className="bg-yellow-500 hover:bg-opacity-80"></div>
        <div className="bg-green-500 hover:bg-opacity-80"></div>
      </div>
    </header>
  );
}
