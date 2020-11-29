/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AuthActions } from './auth/actions';
import { ModalActions } from './modalHandling/actions';
import { ModalState } from './modalHandling/reducer';
import { ProfileState } from './profile/reducer';

export type StoreState = {
    firebase: any; // https://github.com/prescottprue/react-redux-firebase/blob/master/docs/getting_started.md
    firestore: any;
    modalHandling: ModalState;
    profile: ProfileState;
    router: any;
}

export type Actions = ModalActions | AuthActions
