import {
    ACTION_CREATE_ORDER,
    ACTION_SET_EDIT_ORDER,
    ACTION_CLEAR_EDIT_ORDER,
    ACTION_DELETE_ORDER,
    ACTION_UPDATE_LIST,
    ACTION_SET_ORDER_LIST,
    ACTION_SET_BILL_ORDER,
    ACTION_CLEAR_BILL_ORDER,
} from '../../actions/order';

import orderReducer, {
    DEFAULT_ORDER,
} from '../orderReducer';

describe('orderReducer', () => {
    const initialState = {
        list: [],
        orderEdit: DEFAULT_ORDER,
        orderBill: DEFAULT_ORDER,
    };

    const orderTestList = [
        { id: 1, waiterId: '3', tableId: '22', dishes: [] },
        { id: 2, waiterId: '2', tableId: '31', dishes: [] },
    ];

    test('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle ACTION_CREATE_ORDER', () => {
        const newOrder = { id: 1, waiterId: '1', tableId: '1', dishes: [] };
        const action = { type: ACTION_CREATE_ORDER, payload: newOrder };
        const expectedState = {
            ...initialState,
            list: [newOrder],
        };

        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_SET_EDIT_ORDER', () => {
        const editOrder = { id: 1, waiterId: '1', tableId: '2', dishes: [] };
        const action = { type: ACTION_SET_EDIT_ORDER, payload: editOrder };
        const expectedState = {
            ...initialState,
            orderEdit: editOrder,
        };

        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CLEAR_EDIT_ORDER', () => {
        const stateWithEditOrder = {
            ...initialState,
            orderEdit: { id: 1, waiterId: '1', tableId: '2', dishes: [] },
        };
        const action = { type: ACTION_CLEAR_EDIT_ORDER };

        expect(orderReducer(stateWithEditOrder, action)).toEqual(initialState);
    });

    test('should handle ACTION_SET_BILL_ORDER', () => {
        const billOrder = { id: 1, waiterId: '1', tableId: '2', dishes: [] };
        const action = { type: ACTION_SET_BILL_ORDER, payload: billOrder };
        const expectedState = {
            ...initialState,
            orderBill: billOrder,
        };

        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CLEAR_BILL_ORDER', () => {
        const stateWithBillOrder = {
            ...initialState,
            orderBill: { id: 1, waiterId: '1', tableId: '2', dishes: [] },
        };
        const action = { type: ACTION_CLEAR_BILL_ORDER };
        expect(orderReducer(stateWithBillOrder, action)).toEqual(initialState);
    });

    test('should handle ACTION_DELETE_ORDER', () => {
        const stateWithOrders = {
            ...initialState,
            list: orderTestList,
        };
        const action = { type: ACTION_DELETE_ORDER, payload: { id: 1 } };
        const expectedState = {
            ...initialState,
            list: [{ id: 2, waiterId: '2', tableId: '31', dishes: [] }],
        };
        expect(orderReducer(stateWithOrders, action)).toEqual(expectedState);
    });

    test('should handle ACTION_UPDATE_LIST', () => {
        const stateWithOrders = {
            ...initialState,
            list: orderTestList,
        };
        const updatedOrder = { id: 1, waiterId: '1', tableId: '2', dishes: ['Updated Dish'] };
        const action = { type: ACTION_UPDATE_LIST, payload: updatedOrder };
        const expectedState = {
            ...initialState,
            list: [
                updatedOrder,
                { id: 2, waiterId: '2', tableId: '31', dishes: [] },
            ],
            orderEdit: DEFAULT_ORDER,
        };
        expect(orderReducer(stateWithOrders, action)).toEqual(expectedState);
    });

    test('should handle ACTION_SET_ORDER_LIST', () => {
        const newList = orderTestList;
        const action = { type: ACTION_SET_ORDER_LIST, payload: newList };
        const expectedState = {
            ...initialState,
            list: newList,
            orderEdit: DEFAULT_ORDER,
            orderBill: DEFAULT_ORDER,
        };
        expect(orderReducer(initialState, action)).toEqual(expectedState);
    });
});
