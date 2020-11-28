import React from 'react';
import { connect } from 'react-redux';
import { closeErrorMessage } from './actions';
import ErrorModal from '../common/modal/ErrorModal';
import { StoreState } from '../types';

type Props = {
    errorCode: string;
    errorHeader: string;
    errorMessage: string;
    closeErrorMessage: () => void;
}

const ModalHandling = (props: Props) => (
    <ErrorModal
        closeModal={props.closeErrorMessage}
        headerMessage={props.errorHeader}
        isOpen={props.errorMessage.length > 0}
        errorCode={props.errorCode}
        errorMessage={props.errorMessage}
    />
);

const mapStateToProps = (state: StoreState) => ({
    errorCode: state.modalHandling.errorCode,
    errorHeader: state.modalHandling.errorHeader,
    errorMessage: state.modalHandling.errorMessage
});

const mapDispatchToProps = {
    closeErrorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalHandling);

export { ModalHandling as ModalHandlingUnconnected };
