export type GroupType = {
    code: string;
    groupName: string;
    isNoPriceRange: boolean;
    owner: string;
    participants: string[];
    priceMax: number | null;
    id: string;
    priceMin: number | null;
    displayNameMappings: {
        [key: string]: string;
    }
}

export type GroupTypeKeyed = {
    [key:string]: {
        code: string;
        groupName: string;
        isNoPriceRange: boolean;
        owner: string;
        participants: string[];
        priceMax: number | null;
        priceMin: number | null;
        displayNameMappings: {
            [key: string]: string;
        }
    }
}
