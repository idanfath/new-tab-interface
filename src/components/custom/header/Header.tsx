import ShinyText from "@/components/ReactBits/ShinyText";
import { useTime } from "@/hooks/useTime";
import { cn, fetchLocalData, openUrl } from "@/lib/utils";
import { GitHubService } from "@/service/githubService";
import { ContributionLevel, ContributionResponse, Links } from "@/types/header";
import { useEffect, useState } from "react";

const CONTRIBUTION_CLASSES: Record<ContributionLevel, string> = {
  [ContributionLevel.None]: "bg-gray-300",
  [ContributionLevel.Light]: "bg-green-300",
  [ContributionLevel.Medium]: "bg-green-500",
  [ContributionLevel.High]: "bg-green-700",
  [ContributionLevel.VeryHigh]: "bg-green-900",
};

const links: Links = {
  github: {
    url: `https://github.com/${fetchLocalData("github_username", "idanfath")}`,
    children: "Gibby",
  },
};

const ContributionGraph = ({ contributions }) => (
  <div className="flex gap-1">
    {contributions?.map((contribution) => (
      <div
        key={contribution.date}
        className={cn(
          "w-2 h-2 rounded-full",
          CONTRIBUTION_CLASSES[contribution.level]
        )}
      />
    ))}
  </div>
);

const NavigationLinks = () => (
  <div className="flex gap-1">
    {Object.entries(links).map(([key, value], index) => (
      <div className="flex gap-1" key={key}>
        <button
          onClick={() => openUrl(value.url)}
          className="cursor-pointer hover:underline"
        >
          {value.children}
        </button>
        {index !== Object.keys(links).length - 1 && (
          <span className="text-white">|</span>
        )}
      </div>
    ))}
  </div>
);

export default function Header() {
  const time = useTime();
  const [githubContributions, setGithubContributions] =
    useState<ContributionResponse | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const data = await GitHubService.getContributions();
        setGithubContributions({
          total: data.total,
          contributions: data.contributions.slice(-7),
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchContributions();
  }, []);

  return (
    <header className="absolute top-[-17px] border group bg-black p-1.5 px-3 select-none hover:top-2 transition-all epic-easing max-w-lg rounded-b-xl w-full rounded-t-xl">
      <div className="group-hover:opacity-100 items-center text-white  text-xs opacity-0 transition-all epic-easing flex w-full justify-between">
        <div className="flex-1">
          <NavigationLinks />
        </div>

        <div className="flex-1 text-right">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="flex w-full justify-between">
        <div className="flex-1">
          <ShinyText text="Danne's Tool" />
        </div>
        <div className="flex-1 flex-center">
          {githubContributions && (
            <ContributionGraph
              contributions={githubContributions?.contributions}
            />
          )}
        </div>
        <div className="flex-1 text-right">
          <ShinyText text={time} />
        </div>
      </div>
    </header>
  );
}
