import { useEffect, useState } from "react";
import ShinyText from "./ReactBits/ShinyText";
import { Github } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US"));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const links = {
    github: {
      url: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`,
      children: <Github size={16} />,
    },
  };

  return (
    <>
      <header
        className="absolute top-[-20px] group bg-black p-1.5 px-3 select-none
      hover:top-2 transition-all epic-easing max-w-lg rounded-b-xl w-full rounded-t-xl
      "
      >
        <div className="group-hover:opacity-100 text-white items-end text-xs opacity-0 transition-all epic-easing flex w-full justify-between">
          <div>
            {Object.entries(links).map(([key, value]) => (
              <div
                onClick={() => window.open(value.url, "_self")}
                key={key}
                className="cursor-pointer"
              >
                {value.children}
              </div>
            ))}
          </div>
          <div>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className=" flex w-full justify-between">
          <ShinyText text="Danne's Tool" speed={6} />
          <ShinyText text={time} speed={6} />
        </div>
      </header>
    </>
  );
}
