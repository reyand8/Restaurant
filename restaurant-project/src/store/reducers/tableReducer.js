import {
    ACTION_CREATE_TABLE,
    ACTION_CREATE_EDIT_TABLE,
    ACTION_DELETE_TABLE,
    ACTION_UPDATE_LIST,
    ACTION_SET_TABLE_LIST,
    ACTION_CLEAR_EDIT_TABLE,
} from '../actions/table';

export const DEFAULT_DATA = {
    number: '',
};

const initialState = {
    list: [],
    tableEdit: DEFAULT_DATA,
};

export default function tableReducer(state = initialState, { type, payload }) {
    switch(type) {
    case ACTION_CREATE_TABLE: {
        return {...state,
            list: [
                ...state.list,
                {...payload},
            ]};
    }
    case ACTION_CREATE_EDIT_TABLE: {
        return {...state, tableEdit: payload };
    }
    case ACTION_CLEAR_EDIT_TABLE: {
        return {...state, tableEdit: DEFAULT_DATA };
    }
    case ACTION_DELETE_TABLE: {
        const newList = state.list.filter(table => table.id !== payload.id);
        return {...state, list: newList };
    }
    case ACTION_UPDATE_LIST: {
        const updateList = state.list.map(table => table.id === payload.id ? payload : table);
        return {...state, list: updateList, tableEdit : DEFAULT_DATA };
    }
    case ACTION_SET_TABLE_LIST: return { ...state, list: payload };
    default: return state;
    }
}