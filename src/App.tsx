import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import ReactNotification from 'react-notifications-component';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import SuccessModal from './common/modal/SuccessModal';
import { StoreState } from './types';
import Notifications from './notifications/Notifications';
import { updateDisplayNameRequest } from './profile/actions';
import * as textInputConstants from './common/TextInput/constants';
import StyledButton from './common/StyledButton/StyledButton';
import TextInput from './common/TextInput/TextInput';
import Navbar from './navbar/Navbar';
import RenderRoutes from './RenderRoutes';
import LoadingDiv from './common/loadingDiv/LoadingDiv';
import styles from './App.module.scss';
import ModalHandling from './modalHandling/ModalHandling';
import { getProfile } from './profile/selectors';

type Props = {
    auth: {
        isLoaded: boolean;
        isEmpty: boolean;
    };
    history: any;
    profile: {
        displayName: string;
        isLoaded: boolean;
    };
    updateDisplayNameRequest: (name: string) => void;
    updatingDisplayName: boolean;
  };

const App: React.FC<Props> = (props : Props) => {
    const [newDisplayName, setNewDisplayName] = React.useState<string>('');
    return (
        props.auth && props.auth.isLoaded
            ? (
                <ConnectedRouter history={props.history}>
                    <>
                        <CssBaseline />
                        <div className={styles.app}>
                            <Container className={styles.appContainer}>
                                <Navbar />
                                <Toolbar />
                                <ReactNotification />
                                <RenderRoutes />
                            </Container>
                        </div>
                        <ModalHandling />
                        <Notifications />
                        <SuccessModal
                            backdrop
                            isOpen={!props.profile?.displayName && props.profile.isLoaded}
                            headerMessage="Set your display name"
                        >
                            <TextInput
                                icon={textInputConstants.textInputIcons.user}
                                iconColor="primary"
                                value={newDisplayName}
                                onChange={setNewDisplayName}
                                label="Set Display Name"
                            />
                            <div className={styles.setDisplayName}>
                                <LoadingDiv
                                    isLoading={props.updatingDisplayName}
                                    isBorderRadius
                                    isFitContent
                                >
                                    <StyledButton
                                        color="primary"
                                        text="Confirm"
                                        onClick={() => props.updateDisplayNameRequest(
                                            newDisplayName
                                        )}
                                        disabled={!newDisplayName || props.updatingDisplayName}
                                    />
                                </LoadingDiv>
                            </div>
                        </SuccessModal>
                    </>
                </ConnectedRouter>
            ) : null
    );
};

const mapStateToProps = (state: StoreState) => ({
    auth: state.firebase.auth,
    profile: getProfile(state),
    updatingDisplayName: state.profile.updatingDisplayName
});

const mapDispatchToProps = {
    updateDisplayNameRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
