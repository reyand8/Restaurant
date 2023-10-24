import {ACTION_CREATE_ORDER,
        ACTION_SET_EDIT_ORDER,
        ACTION_DELETE_ORDER,
        ACTION_UPDATE_LIST,
        ACTION_SET_ORDER_LIST,
        ACTION_CLEAR_EDIT_ORDER,
        ACTION_SET_BILL_ORDER,
        ACTION_CLEAR_BILL_ORDER,
} from '../actions/order'

export const DEFAULT_ORDER = {
    "waiterId": '',
    "tableId": '',
    "dishes": []
}

const initialState ={
    list : [],
    orderEdit : DEFAULT_ORDER,
    orderBill : DEFAULT_ORDER,
}

export default function orderReducer(state = initialState, { type, payload }) {
    switch(type) {
        case ACTION_CREATE_ORDER: {
            return {...state,
                list: [
                    ...state.list,
                    {...payload}
                ]}
        }
        case ACTION_SET_EDIT_ORDER: {
            return {...state, orderEdit: payload }
        }
        case ACTION_SET_BILL_ORDER: {
            return {...state, orderBill: payload }
        }
        case ACTION_CLEAR_EDIT_ORDER: {
            return {...state, orderEdit: DEFAULT_ORDER }
        }
        case ACTION_CLEAR_BILL_ORDER: {
            return {...state, orderBill: DEFAULT_ORDER }
        }
        case ACTION_DELETE_ORDER: {
            const newList = state.list.filter(order => order.id !== payload.id)
            return {...state, list: newList }
        }
        case ACTION_UPDATE_LIST: {
            const updateList = state.list.map(order => order.id === payload.id ? payload : order)
            return {...state, list: updateList, orderEdit : DEFAULT_ORDER }
        }
        case ACTION_SET_ORDER_LIST:
            return { ...state, list: payload, orderEdit : DEFAULT_ORDER, orderBill: DEFAULT_ORDER }
        default: return state
    }
}