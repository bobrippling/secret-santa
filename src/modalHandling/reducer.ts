import * as actions from './actions';

export type ModalState = {
    errorCode: string;
    errorHeader: string;
    errorMessage: string;
}

export const initialState: ModalState = {
    errorCode: '',
    errorHeader: '',
    errorMessage: ''
};

const errorReducer = (state = initialState, action: any) => {
    switch (action.type) {
    case actions.SET_ERROR_MESSAGE: {
        return {
            ...state,
            errorMessage: action.error.message,
            errorCode: action.error.code,
            errorHeader: action.header
        };
    }
    case actions.CLOSE_ERROR_MESSAGE: {
        return {
            ...state,
            errorMessage: '',
            errorCode: '',
            errorHeader: ''
        };
    }
    default:
        return state;
    }
};

export default errorReducer;
