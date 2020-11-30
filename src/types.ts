/* eslint-disable  @typescript-eslint/no-explicit-any */
import { AuthActions } from './auth/actions';
import { ModalActions } from './modalHandling/actions';
import { ModalState } from './modalHandling/reducer';
import { ProfileState } from './profile/reducer';
import { MyGroupsState } from './myGroups/reducer';
import { GroupDetailsState } from './groupDetails/reducer';

export type StoreState = {
    groupDetails: GroupDetailsState;
    firebase: any; // https://github.com/prescottprue/react-redux-firebase/blob/master/docs/getting_started.md
    firestore: any;
    modalHandling: ModalState;
    myGroups: MyGroupsState;
    profile: ProfileState;
    router: any;
}

export type Actions = ModalActions | AuthActions
