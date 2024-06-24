import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../order';
import {OrderApi} from '../../../api/OrderApi';


jest.mock('../../../api/OrderApi');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Order', () => {
    let store;

    const mockOrderList = [{ id: 1, name: 'Order One' }];
    const mockOrder = { id: 1, name: 'Order One' };
    const newOrder = { name: 'New Order' };
    const createdOrder = { id: 2, name: 'New Order' };

    beforeEach(() => {
        store = mockStore([]);
        OrderApi.getList.mockClear();
        OrderApi.getOne.mockClear();
        OrderApi.create.mockClear();
        OrderApi.update.mockClear();
        OrderApi.delete.mockClear();
    });

    test('should create ACTION_SET_ORDER_LIST', async () => {
        OrderApi.getList.mockResolvedValue(mockOrderList);

        const expectedActions = [
            { type: actions.ACTION_SET_ORDER_LIST, payload: mockOrderList },
        ];

        await store.dispatch(actions.fetchList());
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.getList).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_SET_EDIT_ORDER', async () => {
        OrderApi.getOne.mockResolvedValue(mockOrder);

        const expectedActions = [
            { type: actions.ACTION_SET_EDIT_ORDER, payload: mockOrder },
        ];

        await store.dispatch(actions.fetchOne(1));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.getOne).toHaveBeenCalledWith(1);
    });

    test('should create ACTION_DELETE_ORDER', async () => {
        OrderApi.delete.mockResolvedValue({});

        const expectedActions = [
            { type: actions.ACTION_DELETE_ORDER, payload: mockOrder },
        ];

        await store.dispatch(actions.deleteOrder(mockOrder));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.delete).toHaveBeenCalledWith(mockOrder.id);
    });

    it('should create ACTION_UPDATE_LIST', async () => {
        OrderApi.update.mockResolvedValue(mockOrder);

        const expectedActions = [
            { type: actions.ACTION_UPDATE_LIST, payload: mockOrder },
        ];

        await store.dispatch(actions.save(mockOrder));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.update).toHaveBeenCalledWith(mockOrder.id, mockOrder);
    });

    it('should create ACTION_CREATE_ORDER', async () => {
        OrderApi.create.mockResolvedValue(createdOrder);

        const expectedActions = [
            { type: actions.ACTION_CREATE_ORDER, payload: createdOrder },
        ];

        await store.dispatch(actions.save(newOrder));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.create).toHaveBeenCalledWith(newOrder);
    });

    it('should create ACTION_SET_BILL_ORDER', async () => {
        OrderApi.getOne.mockResolvedValue(mockOrder);

        const expectedActions = [
            { type: actions.ACTION_SET_BILL_ORDER, payload: mockOrder },
        ];

        await store.dispatch(actions.fetchOneBill(1));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.getOne).toHaveBeenCalledWith(1);
    });

    it('should create ACTION_SET_BILL_ORDER', async () => {
        OrderApi.getList.mockResolvedValue(mockOrderList);

        const expectedActions = [
            { type: actions.ACTION_SET_BILL_ORDER, payload: mockOrderList },
        ];

        await store.dispatch(actions.fetchListBill(1));
        expect(store.getActions()).toEqual(expectedActions);
        expect(OrderApi.getList).toHaveBeenCalledWith(1);
    });
});