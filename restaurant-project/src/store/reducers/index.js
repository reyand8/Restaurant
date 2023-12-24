import { combineReducers } from 'redux';
import ordersReducer from './orderReducer';
import waitersReducer from './waiterReducer';
import tablesReducer from './tableReducer';
import dishesReducer from './dishReducer';

export const rootReducer = combineReducers({
    order: ordersReducer,
    waiter: waitersReducer,
    table: tablesReducer,
    dish: dishesReducer,
});