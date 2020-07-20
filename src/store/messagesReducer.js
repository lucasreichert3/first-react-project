
const ACTIONS = { 
    ADD: 'MESSAGES_ADD',
    CLOSE: 'MESSAGES_CLSOE'
}

const INIT_STATE = {
    message: '',
    showMessage: false
};

export const messagesReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ACTIONS.ADD:
            return {...state, showMessage: true, message: action.message}
        case ACTIONS.CLOSE:
            return {...state, showMessage: false, message: ''}
        default:
            return state;
    }
}

export function newMessage(message) {
    return {
        type: ACTIONS.ADD,
        message
    };
}

export function closeMessage() {
    return {
        type: ACTIONS.CLOSE
    };
}