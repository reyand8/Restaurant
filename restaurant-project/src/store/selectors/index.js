import { createSelector } from 'reselect';

export const selectWaiters = state => state.waiter.list;
export const selectWaiterEdit= state => state.waiter.waiterEdit;

export const selectTables = state => state.table.list;
export const selectTableEdit= state => state.table.tableEdit;

export const selectDishes = state => state.dish.list;
export const selectDishEdit= state => state.dish.dishEdit;

export const selectOrders = state => state.order.list;
export const selectOrderEdit= state => state.order.orderEdit;

export const selectBill= state => state.order.orderBill;

export const selectAllOrders = createSelector(
    selectOrders,
    selectWaiters,
    selectTables,
    (orders, waiters, tables) => {
        const waitersMap = waiters.reduce((acc, waiter) => {
            acc[waiter.id] = waiter;
            return acc;
        }, {});
        const tablesMap = tables.reduce((acc, tables) => {
            acc[tables.id] = tables;
            return acc;
        }, {});
        return orders.map((order) => ({
            ...order,
            table: tablesMap[order.tableId],
            waiter: waitersMap[order.waiterId],

        })
        );
    }
);

export const selectAction = createSelector(
    selectTables,
    selectWaiters,
    selectDishes,
    (tableList, waiterList, dishList) => {
        const newTableList = tableList.map((table) => {
            return {
                'label': `${table.number}`,
                'value': table.id,
            };
        });
        const newWaiterList = waiterList.map((waiter) => {
            return {
                'label': `${waiter.firstName}`,
                'value': waiter.id,
            };
        });
        const newDishList = dishList.map((dish) => {
            return {
                'label': `${dish.name}`,
                'value': dish.id,
            };
        });
        return {
            table: newTableList,
            waiter: newWaiterList,
            dish: newDishList,
        };
    }
);

