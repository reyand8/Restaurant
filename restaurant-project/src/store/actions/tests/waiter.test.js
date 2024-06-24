import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../waiter';
import {WaiterApi} from '../../../api/WaiterApi';

jest.mock('../../../api/WaiterApi');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Table', () => {
    let store;

    const mockWaitersList = [{ id: 1, name: 'Waiter One'}];
    const mockWaiter = { id: 1, name: 'Waiter One'};
    const newWaiter = { name: 'Waiter Two'};
    const createdWaiter = {id: 1, name: 'Waiter Two'};

    beforeEach(() => {
        store = mockStore([]);
        WaiterApi.getList.mockClear();
        WaiterApi.getOne.mockClear();
        WaiterApi.create.mockClear();
        WaiterApi.update.mockClear();
        WaiterApi.delete.mockClear();
    });

    test('should create ACTION_SET_WAITER_LIST', async () => {
        WaiterApi.getList.mockResolvedValue(mockWaitersList);

        const expectedAction = [
            { type: actions.ACTION_SET_WAITER_LIST, payload: mockWaitersList},
        ];

        await store.dispatch(actions.fetchList());
        expect(store.getActions()).toEqual(expectedAction);
        expect(WaiterApi.getList).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_CREATE_EDIT_WAITER', async () => {
        WaiterApi.getOne.mockResolvedValue(mockWaiter);

        const expectedAction = [
            { type: actions.ACTION_CREATE_EDIT_WAITER, payload: mockWaiter},
        ];

        await store.dispatch(actions.fetchOne(1));
        expect(store.getActions()).toEqual(expectedAction);
        expect(WaiterApi.getOne).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_DELETE_WAITER', async () => {
        WaiterApi.delete.mockResolvedValue({});

        const expectedAction = [
            { type: actions.ACTION_DELETE_WAITER, payload: mockWaiter},
        ];

        await store.dispatch(actions.deleteWaiter(mockWaiter));
        expect(store.getActions()).toEqual(expectedAction);
        expect(WaiterApi.delete).toHaveBeenCalledWith(mockWaiter.id);
    });

    test('should create ACTION_UPDATE_LIST', async () => {
        WaiterApi.update.mockResolvedValue(mockWaiter);

        const expectedAction = [
            { type: actions.ACTION_UPDATE_LIST, payload: mockWaiter},
        ];

        await store.dispatch(actions.save(mockWaiter));
        expect(store.getActions()).toEqual(expectedAction);
        expect(WaiterApi.update).toHaveBeenCalledWith(mockWaiter.id, mockWaiter);
    });

    test('should create ACTION_CREATE_WAITER', async () => {
        WaiterApi.create.mockResolvedValue(createdWaiter);

        const expectedAction = [
            { type: actions.ACTION_CREATE_WAITER, payload: createdWaiter},
        ];

        await store.dispatch(actions.save(newWaiter));
        expect(store.getActions()).toEqual(expectedAction);
        expect(WaiterApi.create).toHaveBeenCalledWith(newWaiter);
    });
});