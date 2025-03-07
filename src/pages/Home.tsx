import ShortcutsContent from "@/components/custom/shortcuts/shortcuts";
import MainLayout from "@/layouts/mainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div
        className={
          "h-full w-full max-w-[80vw] max-h-[80vh] flex flex-col border border-white/5  bg-black/40 bg-glass rounded-lg"
        }
      >
        <header className="flex items-center rounded-t-lg justify-between p-2 px-4 bg-black/40 bg-glass">
          <div className="flex-1"></div>
          <div className="flex flex-1 justify-end gap-1 *:rounded-full *:h-3 *:w-3 ">
            <div className="bg-red-500 hover:bg-opacity-80"></div>
            <div className="bg-yellow-500 hover:bg-opacity-80"></div>
            <div className="bg-green-500 hover:bg-opacity-80"></div>
          </div>
        </header>
        <div className="p-4 flex-1 flex overflow-scroll no-scrollbar">
          <ShortcutsContent />
        </div>
      </div>
    </MainLayout>
  );
}
