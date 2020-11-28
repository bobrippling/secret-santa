import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import ReactNotification from 'react-notifications-component';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Notifications from './notifications/Notifications';
import Navbar from './navbar/Navbar';
import RenderRoutes from './RenderRoutes';
import styles from './App.module.scss';
import ModalHandling from './modalHandling/ModalHandling';

type Props = {
    auth: {
        isLoaded: boolean;
        isEmpty: boolean;
    };
    history: any;
  };

const App: React.FC<Props> = (props : Props) => (
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
        </>
    </ConnectedRouter>
);

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, null)(App);
