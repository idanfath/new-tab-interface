export interface TabsAppsItem {
  name: string;
  description: string;
  icon: {
    url?: string;
    iconComponent?: React.ReactNode;
  };
  content: React.ReactNode;
  createdAt: number;
}
