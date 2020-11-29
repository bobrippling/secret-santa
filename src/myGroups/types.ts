export type GroupType = {
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

export type GroupTypeKeyed = {
    [key:string]: GroupType
}
