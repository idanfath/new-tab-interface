import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { sonnerMap } from "@/consts/sonnermap";
import { userData } from "@/types/tabstypes/appstypes/wakapi";
import axios from "axios";
import { CalendarDays, LucideCalendar1 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Components/StatDisplay.tsx
interface StatItem {
  name: string;
  text: string;
  percent: number;
}

interface StatDisplayProps {
  label: string;
  items: StatItem[];
  className?: string;
}

function StatDisplay({ label, items, className }: StatDisplayProps) {
  if (!items?.length) return null;
  const [first, ...rest] = items;

  return (
    <div className={className}>
      {label}:{" "}
      <span className="text-white">
        {first.name} - {first.text} ({first.percent}%)
      </span>
      {rest.length > 0 && (
        <HoverCard>
          <HoverCardTrigger>
            <span className="underline cursor-pointer text-white ml-1">
              +{rest.length} more
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-wrap gap-1.5 max-h-[300px] overflow-scroll select-none">
            {rest.map((item, index) => (
              <div key={item.name} className="text-white">
                {index + 2}. {item.name} - {item.text} ({item.percent}%)
              </div>
            ))}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
}

export default function AppWakapi() {
  const [{ initialLoading, sR }, setState] = useState({
    initialLoading: true,
    sR: null as userData | null,
  });

  useEffect(() => {
    const wakapiUsername = import.meta.env.VITE_WAKAPI_USERNAME;
    if (!wakapiUsername) {
      toast("Wakapi username is not set", sonnerMap.error);
      setState({ initialLoading: false, sR: null });
      return;
    }

    const fetchWakapi = async () => {
      try {
        const endpoints = ["", "stats/last_7_days", "stats/all_time"];

        const [user, stats_l7d, stats] = await Promise.all(
          endpoints.map((endpoint) => {
            return axios.get(`/api/wakapi/users/${wakapiUsername}/${endpoint}`);
          })
        );

        if (!user.data.data || !stats_l7d.data.data || !stats.data.data) {
          console.log(user, stats_l7d, stats);
          throw new Error("Failed to fetch Wakapi data");
        }

        setState({
          initialLoading: false,
          sR: {
            ...user.data.data,
            stats_l7d: stats_l7d.data.data,
            stats: stats.data.data,
          },
        });
      } catch (error) {
        console.error(error);
        setState({ initialLoading: false, sR: null });
      }
    };

    fetchWakapi();
  }, []);

  const statusIndicator = {
    loading: { color: "bg-neutral-500", text: "Loading server status..." },
    online: { color: "bg-green-500", text: "Server is online" },
    offline: { color: "bg-red-500", text: "Server is offline" },
  };

  const status = initialLoading ? "loading" : sR ? "online" : "offline";

  return (
    <div className="flex flex-col gap-1.5">
      <Alert>
        <AlertTitle>
          <div className="flex items-center">
            <div
              className={`w-1 h-1 mr-2 rounded-full ${statusIndicator[status].color}`}
            />
            <div>{statusIndicator[status].text}</div>
          </div>
        </AlertTitle>
        <AlertDescription>
          {initialLoading ? (
            "Please wait..."
          ) : sR ? (
            <div className="text-sm text-neutral-300">
              <div>
                Logged in as{" "}
                <HoverCard>
                  <HoverCardTrigger>
                    <span className="underline cursor-pointer text-white">
                      {sR.display_name}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-full">
                    <BuildHoverCardUserData userData={sR} />
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          ) : (
            <>
              <div className="text-sm">
                Turn on the server to start using this feature.
              </div>
            </>
          )}
        </AlertDescription>
      </Alert>

      {sR && (
        <>
          {["stats_l7d", "stats"].map((period) => (
            <Alert key={period}>
              {period === "stats_l7d" ? (
                <CalendarDays className="h-4 w-4" />
              ) : (
                <LucideCalendar1 className="h-4 w-4" />
              )}
              <AlertTitle>
                <div>
                  {period === "stats_l7d" ? "Last 7 Days" : "All Time"} Overview
                </div>
              </AlertTitle>
              <AlertDescription>
                <div className="flex flex-col gap-1 text-sm text-neutral-400">
                  <div>
                    Total Time:{" "}
                    <span className="text-white">
                      {sR[period].human_readable_total}
                    </span>
                  </div>
                  <div>
                    Daily Average:{" "}
                    <span className="text-white">
                      {sR[period].human_readable_daily_average}
                    </span>
                  </div>
                  {[
                    "operating_systems",
                    "projects",
                    "editors",
                    "languages",
                    "machines",
                  ].map((stat) => (
                    <StatDisplay
                      key={stat}
                      label={`Most Used ${stat
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}`}
                      items={sR[period][stat]}
                    />
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </>
      )}
    </div>
  );
}

function BuildHoverCardUserData(props) {
  return (
    <div className="grid grid-cols-2 gap-1 text-sm">
      <span className="text-neutral-400">ID</span>
      <span>{props.userData.id}</span>

      <span className="text-neutral-400">Email</span>
      <span>{props.userData.email}</span>

      <span className="text-neutral-400">Timezone</span>
      <span>{props.userData.timezone}</span>

      <span className="text-neutral-400">Last Activity</span>
      <span>{new Date(props.userData.last_heartbeat_at).toLocaleString()}</span>

      <span className="text-neutral-400">Last Project</span>
      <span>{props.userData.last_project}</span>

      <span className="text-neutral-400">Editor</span>
      <span>{props.userData.last_plugin_name}</span>

      <span className="text-neutral-400">Member Since</span>
      <span>{new Date(props.userData.created_at).toLocaleDateString()}</span>
    </div>
  );
}
