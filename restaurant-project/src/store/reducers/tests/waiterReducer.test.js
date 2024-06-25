import {
    ACTION_CREATE_WAITER,
    ACTION_CREATE_EDIT_WAITER,
    ACTION_DELETE_WAITER,
    ACTION_UPDATE_LIST,
    ACTION_SET_WAITER_LIST,
    ACTION_CLEAR_EDIT_WAITER,
} from '../../actions/waiter';

import waiterReducer, {
    DEFAULT_DATA,
} from '../waiterReducer';



describe('waiterReducer', () => {
    const initialState = {
        list: [],
        waiterEdit: DEFAULT_DATA,
    };

    const waiterTestList = [
        { id: 1, firstName: 'Peter', lastName: 'Peter', photo: 'John.jpg',
            address: 'new address', phone: '12345' },
        { id: 2, firstName: 'John', lastName: 'John', photo: 'John.jpg',
            address: 'new address', phone: '123345' },
    ];

    test('should return initial state', () => {
        expect(waiterReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle ACTION_CREATE_WAITER', () => {
        const newWaiter = { id: 1, firstName: 'John', lastName: 'John', photo: 'john.jpg',
            address: 'new address', phone: '12345' };

        const action = { type: ACTION_CREATE_WAITER, payload: newWaiter };
        const expectedState = {
            ...initialState,
            list: [newWaiter],
        };

        expect(waiterReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CREATE_EDIT_WAITER', () => {
        const editWaiter = { id: 1, firstName: 'Peter', lastName: 'Peter', photo: 'John.jpg',
            address: 'new address', phone: '12345' };
        const action = { type: ACTION_CREATE_EDIT_WAITER, payload: editWaiter};
        const expectedState = {
            ...initialState,
            waiterEdit: editWaiter,
        };

        expect(waiterReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CLEAR_EDIT_WAITER', () => {
        const stateWithWaiterEdit = {
            ...initialState,
            waiterEdit: { id: 1, firstName: 'Peter', lastName: 'Peter', photo: 'John.jpg',
                address: 'new address', phone: '12345' },
        };
        const action = { type: ACTION_CLEAR_EDIT_WAITER};

        expect(waiterReducer(stateWithWaiterEdit, action)).toEqual(initialState);
    });

    test('should handle ACTION_DELETE_WAITER', () => {
        const stateWithList = {
            ...initialState,
            list: waiterTestList,
        };
        const action = { type: ACTION_DELETE_WAITER, payload: {id: 1}};
        const expectedState = {
            ...initialState,
            list: [{ id: 2, firstName: 'John', lastName: 'John', photo: 'John.jpg',
                address: 'new address', phone: '123345' }],
        };

        expect(waiterReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_UPDATE_LIST waiter', () => {
        const stateWithList = {
            ...initialState,
            list: waiterTestList,
        };
        const updateWaiter =  { id: 1, firstName: 'John', lastName: 'New John', photo: 'John.jpg',
            address: 'new address', phone: '12345' };
        const action = { type: ACTION_UPDATE_LIST, payload: updateWaiter};
        const expectedState = {
            ...initialState,
            list: [
                updateWaiter,
                { id: 2, firstName: 'John', lastName: 'John', photo: 'John.jpg',
                    address: 'new address', phone: '123345' },
            ],
        };

        expect(waiterReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_SET_WAITER_LIST', () => {
        const newList = waiterTestList;
        const action = { type: ACTION_SET_WAITER_LIST, payload: newList};
        const expectedState = {
            ...initialState,
            list: newList,
        };

        expect(waiterReducer(initialState, action)).toEqual(expectedState);
    });

});
