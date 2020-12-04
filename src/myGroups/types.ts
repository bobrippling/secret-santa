import { GroupStatuses } from '../constants';

type WishlistItem = {
    item: string;
    url: string;
}

export type DisplayNameMappings = {
    [key: string]: string;
};

export type GiftRestrictions = {
    [id: string]: string[];
}

export type GroupType = {
    code: string;
    displayNameMappings: DisplayNameMappings;
    groupName: string;
    id: string;
    isNoPriceRange: boolean;
    owner: string;
    participants: string[];
    priceMax: number | null;
    priceMin: number | null;
    restrictions: GiftRestrictions;
    status: GroupStatuses;
    wishlist: {
        [key: string]: WishlistItem[];
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
        },
        wishlist: {
            [key: string]: WishlistItem[];
        }
    }
}
