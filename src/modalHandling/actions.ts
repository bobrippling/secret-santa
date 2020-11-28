const pre = 'MODAL/';

export const SET_ERROR_MESSAGE = `${pre}SET_ERROR_MESSAGE`;
export const CLOSE_ERROR_MESSAGE = `${pre}CLOSE_ERROR_MESSAGE`;

type Error = {
    code: string;
    message: string;
}

export type SetErrorMessage = {type: typeof SET_ERROR_MESSAGE, header: string, error: Error}
type CloseErrorMessage = {type: typeof CLOSE_ERROR_MESSAGE}

export const setErrorMessage = (header: string, error: Error):SetErrorMessage => ({
    type: SET_ERROR_MESSAGE,
    header,
    error
});

export const closeErrorMessage = (): CloseErrorMessage => ({
    type: CLOSE_ERROR_MESSAGE
});

export type ModalActions = SetErrorMessage | CloseErrorMessage;
