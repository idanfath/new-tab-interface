/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TabItem {
    name: string;
    icon: any;
    content: () => React.ReactNode;
}

export type TabsName = {
    [K in TabItem['name']]: TabItem;
}
