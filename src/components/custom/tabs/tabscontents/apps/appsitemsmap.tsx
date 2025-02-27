import { getFaviconUrl } from "@/lib/utils";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import dedent from "dedent";
import { CodeSquare, DownloadCloud } from "lucide-react";
import AppCobalt from "./appsitems/cobalt/cobalt";
import AppWakapi from "./appsitems/wakapi/wakapi";

const TabsAppsItems: TabsAppsItem[] = [
  {
    id: "cobalt_self_host",
    name: "Cobalt Selfhost",
    description: dedent`
      Download video or audio from any supported service by simply pasting the URL.
      `,
    icon: {
      url: getFaviconUrl("https://cobalt.tools/", 128),
      iconComponent: <DownloadCloud />,
    },
    content: <AppCobalt />,
    createdAt: new Date("2025-02-24").getTime(),
  },
  {
    id: "wakapi_self_host",
    name: "Wakapi Selfhost",
    description: dedent`
    Take a glance at your coding activity and see how you're doing.
      `,
    icon: {
      url: getFaviconUrl("https://wakapi.dev", 128),
      iconComponent: <CodeSquare />,
    },
    content: <AppWakapi />,
    createdAt: new Date("2025-02-27").getTime(),
  },
];

export { TabsAppsItems };
