import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../table';
import {TableApi} from '../../../api/TableApi';


jest.mock('../../../api/TableApi');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Table', () => {
    let store;

    const mockTablesList = [{ id: 1, name: 'Table One'}];
    const mockTable = { id: 1, name: 'Table One'};
    const newTable = { name: 'Table 12'};
    const createdTable = {id: 1, name: 'Table 12'};

    beforeEach(() => {
        store = mockStore([]);
        TableApi.getList.mockClear();
        TableApi.getOne.mockClear();
        TableApi.create.mockClear();
        TableApi.update.mockClear();
        TableApi.delete.mockClear();
    });

    test('should create ACTION_SET_TABLE_LIST', async () => {
        TableApi.getList.mockResolvedValue(mockTablesList);

        const expectedAction = [
            { type: actions.ACTION_SET_TABLE_LIST, payload: mockTablesList},
        ];

        await store.dispatch(actions.fetchList());
        expect(store.getActions()).toEqual(expectedAction);
        expect(TableApi.getList).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_CREATE_EDIT_TABLE', async () => {
        TableApi.getOne.mockResolvedValue(mockTable);

        const expectedAction = [
            { type: actions.ACTION_CREATE_EDIT_TABLE, payload: mockTable},
        ];

        await store.dispatch(actions.fetchOne(1));
        expect(store.getActions()).toEqual(expectedAction);
        expect(TableApi.getOne).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_DELETE_TABLE', async () => {
        TableApi.delete.mockResolvedValue({});

        const expectedAction = [
            { type: actions.ACTION_DELETE_TABLE, payload: mockTable},
        ];

        await store.dispatch(actions.deleteTable(mockTable));
        expect(store.getActions()).toEqual(expectedAction);
        expect(TableApi.delete).toHaveBeenCalledWith(mockTable.id);
    });

    test('should create ACTION_UPDATE_LIST', async () => {
        TableApi.update.mockResolvedValue(mockTable);

        const expectedAction = [
            { type: actions.ACTION_UPDATE_LIST, payload: mockTable},
        ];

        await store.dispatch(actions.save(mockTable));
        expect(store.getActions()).toEqual(expectedAction);
        expect(TableApi.update).toHaveBeenCalledWith(mockTable.id, mockTable);
    });

    test('should create ACTION_CREATE_TABLE', async () => {
        TableApi.create.mockResolvedValue(createdTable);

        const expectedAction = [
            { type: actions.ACTION_CREATE_TABLE, payload: createdTable},
        ];

        await store.dispatch(actions.save(newTable));
        expect(store.getActions()).toEqual(expectedAction);
        expect(TableApi.create).toHaveBeenCalledWith(newTable);
    });
});