const pre = 'AUTH/';

export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;

export const signOut = () => ({
    type: SIGN_OUT
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS
});
