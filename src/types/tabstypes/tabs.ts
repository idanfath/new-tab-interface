/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TabItem {
  name: string;
  icon: any;
  content: any;
}

export type TabsName = {
  [K in TabItem["name"]]: TabItem;
};
