import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../dish';
import { DishApi } from '../../../api/DishApi';


jest.mock('../../../api/DishApi');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Dish', () => {
    let store;

    const mockDishList = [{ id: 1, name: 'Dish One' }];
    const mockDish = { id: 1, name: 'Dish One' };
    const newDish = { name: 'New Dish' };
    const createdDish = { id: 1, name: 'New Dish' };

    beforeEach(() => {
        store = mockStore([]);
        DishApi.getList.mockClear();
        DishApi.getOne.mockClear();
        DishApi.create.mockClear();
        DishApi.update.mockClear();
        DishApi.delete.mockClear();
    });

    test('should create ACTION_SET_DISH_LIST', async () => {
        DishApi.getList.mockResolvedValue(mockDishList);

        const expectedAction = [
            { type: actions.ACTION_SET_DISH_LIST, payload: mockDishList },
        ];

        await store.dispatch(actions.fetchList());
        expect(store.getActions()).toEqual(expectedAction);
        expect(DishApi.getList).toHaveBeenCalledTimes(1);
    });

    test('should create ACTION_CREATE_EDIT_DISH', async () => {
        DishApi.getOne.mockResolvedValue(mockDish);

        const expectedAction = [
            { type: actions.ACTION_CREATE_EDIT_DISH, payload: mockDish },
        ];

        await store.dispatch(actions.fetchOne(1));
        expect(store.getActions()).toEqual(expectedAction);
        expect(DishApi.getOne).toHaveBeenCalledWith(1);
    });

    test('should create ACTION_DELETE_DISH', async () => {
        DishApi.delete.mockResolvedValue({});

        const expectedAction = [
            { type: actions.ACTION_DELETE_DISH, payload: mockDish },
        ];

        await store.dispatch(actions.deleteDish(mockDish));
        expect(store.getActions()).toEqual(expectedAction);
        expect(DishApi.delete).toHaveBeenCalledWith(mockDish.id);
    });

    test('should create ACTION_UPDATE_LIST', async () => {
        DishApi.update.mockResolvedValue(mockDish);

        const expectedAction = [
            { type: actions.ACTION_UPDATE_LIST, payload: mockDish },
        ];

        await store.dispatch(actions.save(mockDish));
        expect(store.getActions()).toEqual(expectedAction);
        expect(DishApi.update).toHaveBeenCalledWith(mockDish.id, mockDish);
    });

    test('should create ACTION_CREATE_DISH', async () => {
        DishApi.create.mockResolvedValue(createdDish);

        const expectedAction = [
            { type: actions.ACTION_CREATE_DISH, payload: createdDish },
        ];

        await store.dispatch(actions.save(newDish));
        expect(store.getActions()).toEqual(expectedAction);
        expect(DishApi.create).toHaveBeenCalledWith(newDish);
    });
});
