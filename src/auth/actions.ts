const pre = 'AUTH/';

export const SIGN_OUT = `${pre}SIGN_OUT`;
export const SIGN_OUT_SUCCESS = `${pre}SIGN_OUT_SUCCESS`;

type SignOut = {type: typeof SIGN_OUT}
type SignOutSuccess = {type: typeof SIGN_OUT_SUCCESS}
// type SignOut = {type: typeof SIGN_OUT, payload: string}

export const signOut = (): SignOut => ({
    type: SIGN_OUT
});

export const signOutSuccess = (): SignOutSuccess => ({
    type: SIGN_OUT_SUCCESS
});

export type AuthActions = SignOut | SignOutSuccess;
