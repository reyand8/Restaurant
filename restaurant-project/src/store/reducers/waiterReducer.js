import {
    ACTION_CREATE_WAITER,
    ACTION_CREATE_EDIT_WAITER,
    ACTION_DELETE_WAITER,
    ACTION_UPDATE_LIST,
    ACTION_SET_WAITER_LIST,
    ACTION_CLEAR_EDIT_WAITER,
} from '../actions/waiter';

export const DEFAULT_DATA = {
    firstName: '',
    lastName: '',
    photo: '',
    address: '',
    phone: '',
};

const initialState = {
    list: [],
    waiterEdit: DEFAULT_DATA,
};

export default function waiterReducer(state=initialState, {type, payload}) {
    switch (type) {
    case ACTION_CREATE_WAITER: {
        return {
            ...state,
            list: [
                ...state.list,
                {...payload},
            ]};
    }
    case ACTION_CREATE_EDIT_WAITER: {
        return {...state, waiterEdit: payload};
    }
    case ACTION_CLEAR_EDIT_WAITER: {
        return {...state, waiterEdit: DEFAULT_DATA};
    }
    case ACTION_DELETE_WAITER: {
        const newList = state.list.filter(waiter => waiter.id !== payload.id);
        return {...state, list: newList};
    }
    case ACTION_UPDATE_LIST: {
        const updateList = state.list.map(waiter => waiter.id === payload.id ? payload : waiter);
        return {...state, list: updateList, waiterEdit: DEFAULT_DATA};
    }
    case ACTION_SET_WAITER_LIST: {
        return {...state, list: payload};
    }
    default: return state;
    }
}