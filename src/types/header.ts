export interface Contribution {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionResponse {
    total: {
        [year: number]: number
        [year: string]: number // 'lastYear'
    }
    contributions: Array<Contribution>
}

export interface NestedContributionResponse {
    total: {
        [year: number]: number
        [year: string]: number // 'lastYear;
    }
    contributions: {
        [year: number]: {
            [month: number]: {
                [day: number]: Contribution
            }
        }
    }
}

export enum ContributionLevel {
    None = 0,
    Light = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4,
}

export interface Link {
    url: string;
    children: string;
}

export interface Links {
    [key: string]: Link;
}
