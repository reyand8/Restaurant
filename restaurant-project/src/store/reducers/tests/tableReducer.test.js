import {
    ACTION_CREATE_TABLE,
    ACTION_CREATE_EDIT_TABLE,
    ACTION_CLEAR_EDIT_TABLE,
    ACTION_DELETE_TABLE,
    ACTION_UPDATE_LIST,
    ACTION_SET_TABLE_LIST,
} from '../../actions/table';

import tableReducer, {
    DEFAULT_DATA,
} from '../tableReducer';



describe('tableReducer', () => {
    const initialState = {
        list: [],
        tableEdit: DEFAULT_DATA,
    };

    const tableTestList = [
        { id: 1, number: '11' },
        { id: 2, number: '22' },
    ]

    test('should return initial state', () => {
        expect(tableReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle ACTION_CREATE_TABLE', () => {
        const newTable = { id: 1, number: '11' };

        const action = { type: ACTION_CREATE_TABLE, payload: newTable };
        const expectedState = {
            ...initialState,
            list: [newTable],
        };

        expect(tableReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CREATE_EDIT_TABLE', () => {
        const editTable = { id: 1, number: '14' };
        const action = { type: ACTION_CREATE_EDIT_TABLE, payload: editTable};
        const expectedState = {
            ...initialState,
            tableEdit: editTable,
        };

        expect(tableReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CLEAR_EDIT_TABLE', () => {
        const stateWithTableEdit = {
            ...initialState,
            tableEdit: { id: 1, number: '14' },
        };
        const action = { type: ACTION_CLEAR_EDIT_TABLE};

        expect(tableReducer(stateWithTableEdit, action)).toEqual(initialState);
    });

    test('should handle ACTION_DELETE_TABLE', () => {
        const stateWithList = {
            ...initialState,
            list: tableTestList
        };
        const action = { type: ACTION_DELETE_TABLE, payload: {id: 1}};
        const expectedState = {
            ...initialState,
            list: [{ id: 2, number: '22' }],
        };

        expect(tableReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_UPDATE_LIST table', () => {
        const stateWithList = {
            ...initialState,
            list: tableTestList
        };
        const updateTable =  { id: 1, number: '31' };
        const action = { type: ACTION_UPDATE_LIST, payload: updateTable};
        const expectedState = {
            ...initialState,
            list: [
                updateTable,
                { id: 2, number: '22' },
            ],
        };

        expect(tableReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_SET_TABLE_LIST', () => {
        const newList = tableTestList;
        const action = { type: ACTION_SET_TABLE_LIST, payload: newList};
        const expectedState = {
            ...initialState,
            list: newList,
        };

        expect(tableReducer(initialState, action)).toEqual(expectedState);
    });

});
