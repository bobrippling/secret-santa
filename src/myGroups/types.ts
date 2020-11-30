import { GroupStatuses } from '../constants';

type WishlistItem = {
    item: string;
    url: string;
}

export type GroupType = {
    code: string;
    groupName: string;
    isNoPriceRange: boolean;
    owner: string;
    participants: string[];
    priceMax: number | null;
    id: string;
    priceMin: number | null;
    status: GroupStatuses;
    displayNameMappings: {
        [key: string]: string;
    },
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
