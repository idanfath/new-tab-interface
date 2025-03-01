export interface TabsAppsItemBase {
  name: string;
  tags?: string[];
  description: string;
  icon: {
    url?: string;
    iconComponent?: React.ReactNode;
  };
  createdAt: number;
}

export type TabsAppsItem = TabsAppsItemBase &
  (
    | { path: string; content?: never }
    | { path?: never; content: React.ReactNode }
  );
