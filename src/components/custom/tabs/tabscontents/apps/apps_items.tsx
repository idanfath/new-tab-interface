import { getFaviconUrl } from "@/lib/utils";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import dedent from "dedent";
import { CodeSquare, DownloadCloud } from "lucide-react";
import AppCobalt from "./appsitems/cobalt/cobalt";
import AppWakapi from "./appsitems/wakapi/wakapi";

const TabsAppsItems: TabsAppsItem[] = [
    {
        name: "Cobalt",
        description: `Download video or audio from any supported service by simply pasting the URL.`,
        icon: {
            url: getFaviconUrl("https://cobalt.tools/", 128),
            iconComponent: <DownloadCloud />,
        },
        content: <AppCobalt />,
        createdAt: new Date("2025-02-24").getTime(),
    },
    {
        name: "Wakapi",
        description: `Take a glance at your coding activity and see how you're doing.`,
        icon: {
            url: getFaviconUrl("https://wakapi.dev", 128),
            iconComponent: <CodeSquare />,
        },
        content: <AppWakapi />,
        createdAt: new Date("2025-02-27").getTime(),
    },
];

export { TabsAppsItems };
