import {
    ACTION_CREATE_DISH,
    ACTION_CREATE_EDIT_DISH,
    ACTION_DELETE_DISH,
    ACTION_UPDATE_LIST,
    ACTION_SET_DISH_LIST,
    ACTION_CLEAR_EDIT_DISH,
} from '../actions/dish';

export const DEFAULT_DATA = {
    name: '',
    image:'',
    tags: '',
    description: '',
    price: '',
};

const initialState = {
    list: [],
    dishEdit: DEFAULT_DATA,
};

export default function dishesReducer(state = initialState, { type, payload }) {
    switch(type) {
    case ACTION_CREATE_DISH: {
        return {...state,
            list: [
                ...state.list,
                {...payload},
            ]};
    }
    case ACTION_CREATE_EDIT_DISH: {
        return {...state, dishEdit: payload };
    }
    case ACTION_CLEAR_EDIT_DISH: {
        return {...state, dishEdit: DEFAULT_DATA };
    }
    case ACTION_DELETE_DISH: {
        const newList = state.list.filter(dish => dish.id !== payload.id);
        return {...state, list: newList };
    }
    case ACTION_UPDATE_LIST: {
        const updateList = state.list.map(dish => dish.id === payload.id ? payload : dish);
        return {...state, list: updateList, dishEdit : DEFAULT_DATA };
    }
    case ACTION_SET_DISH_LIST: return { ...state, list: payload };
    default: return state;
    }
}