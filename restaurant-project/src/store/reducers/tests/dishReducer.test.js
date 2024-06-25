import {
    ACTION_CREATE_DISH,
    ACTION_CREATE_EDIT_DISH,
    ACTION_DELETE_DISH,
    ACTION_UPDATE_LIST,
    ACTION_SET_DISH_LIST,
    ACTION_CLEAR_EDIT_DISH,
} from '../../actions/dish';

import dishesReducer, {
    DEFAULT_DATA,
} from '../dishReducer';


describe('dishesReducer', () => {
    const initialState = {
        list: [],
        dishEdit: DEFAULT_DATA,
    };

    test('should return initial state', () => {
        expect(dishesReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle ACTION_CREATE_DISH', () => {
        const newDish = {
            id:1, name: 'Food', image: 'food.jpeg',
            tags: 'spanish', description: 'New food',
            price: '100',
        };
        const action = { type: ACTION_CREATE_DISH, payload: newDish };
        const expectedState = {
            ...initialState,
            list: [newDish],
        };

        expect(dishesReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CREATE_EDIT_DISH', () => {
        const editDish = {
            id:1, name: 'Pizza', image: 'food.jpeg',
            tags: 'italian', description: 'New food',
            price: '100',
        };
        const action = { type: ACTION_CREATE_EDIT_DISH, payload: editDish};
        const expectedState = {
            ...initialState,
            dishEdit: editDish,
        };

        expect(dishesReducer(initialState, action)).toEqual(expectedState);
    });

    test('should handle ACTION_CLEAR_EDIT_DISH', () => {
        const stateWithDishEdit = {
            ...initialState,
            dishEdit: {
                id:1, name: 'Pizza', image: 'food.jpeg',
                tags: 'italian', description: 'New food',
                price: '100',
            },
        };
        const action = { type: ACTION_CLEAR_EDIT_DISH};

        expect(dishesReducer(stateWithDishEdit, action)).toEqual(initialState);
    });

    test('should handle ACTION_DELETE_DISH', () => {
        const stateWithList = {
            ...initialState,
            list: [
                {id:1, name: 'Pizza', image: 'food.jpeg', tags: 'italian',
                    description: 'New food', price: '100',
                },
                {id: 2, name: 'New Pizza', image: 'pizza.jpg', tags: 'Italian',
                    description: 'Pizza!!!', price: '23',
                },
            ],
        };
        const action = { type: ACTION_DELETE_DISH, payload: {id: 1}};
        const expectedState = {
            ...initialState,
            list: [{id: 2, name: 'New Pizza', image: 'pizza.jpg', tags: 'Italian',
                description: 'Pizza!!!', price: '23',
            }],
        };

        expect(dishesReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_UPDATE_LIST', () => {
        const stateWithList = {
            ...initialState,
            list: [
                {id:1, name: 'Pizza', image: 'food.jpeg', tags: 'italian',
                    description: 'New food', price: '100',
                },
                {id: 2, name: 'New Pizza', image: 'pizza.jpg', tags: 'Italian',
                    description: 'Pizza!!!', price: '23',
                },
            ],
        };
        const updateDish =  {id:1, name: 'Pasta', image: 'food.jpeg', tags: 'italian',
            description: 'New Pasta', price: '130',
        };
        const action = { type: ACTION_UPDATE_LIST, payload: updateDish};
        const expectedState = {
            ...initialState,
            list: [
                updateDish,
                {id: 2, name: 'New Pizza', image: 'pizza.jpg', tags: 'Italian',
                    description: 'Pizza!!!', price: '23',
                },
            ],
        };

        expect(dishesReducer(stateWithList, action)).toEqual(expectedState);
    });

    test('should handle ACTION_SET_DISH_LIST', () => {
        const newList = [
            {id:1, name: 'Pizza', image: 'food.jpeg', tags: 'italian',
                description: 'New food', price: '100',
            },
            {id: 2, name: 'New Pizza', image: 'pizza.jpg', tags: 'Italian',
                description: 'Pizza!!!', price: '23',
            },
        ];
        const action = { type: ACTION_SET_DISH_LIST, payload: newList};
        const expectedState = {
            ...initialState,
            list: newList,
        };

        expect(dishesReducer(initialState, action)).toEqual(expectedState);
    });

});