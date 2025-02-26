import { getFaviconUrl } from "@/lib/utils";
import { TabsAppsItem } from "@/types/tabstypes/apps";
import dedent from "dedent";
import { DownloadCloud } from "lucide-react";
import AppCobalt from "./appsitems/cobalt";

const TabsAppsItems: TabsAppsItem[] = [
  {
    name: "Cobalt Selfhost",
    description: dedent`
      Download video or audio from any supported service by simply pasting the URL.
      `,
    icon: {
      url: getFaviconUrl("https://cobalt.tools/", 128),
      iconComponent: <DownloadCloud />,
    },
    content: <AppCobalt />,
    createdAt: Date.now() - 1000,
  },
];

export default TabsAppsItems;
