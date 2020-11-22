import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Navbar from './navbar/Navbar';
import RenderRoutes from './RenderRoutes';
import styles from './App.module.scss';

type Props = {
    auth: any;
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
                    <RenderRoutes auth={props.auth} />
                </Container>
            </div>
        </>
    </ConnectedRouter>
);

const mapStateToProps = (state: any) => ({
    auth: state.firebase.auth
});

export default connect(mapStateToProps, null)(App);
