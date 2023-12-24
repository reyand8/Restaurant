import {OrderApi} from '../../api/OrderApi';


export const ACTION_CREATE_ORDER ='ACTION_CREATE_ORDER';
export const ACTION_SET_EDIT_ORDER ='ACTION_SET_EDIT_ORDER';
export const ACTION_DELETE_ORDER ='ACTION_DELETE_ORDER';
export const ACTION_UPDATE_LIST ='ACTION_UPDATE_LIST';
export const ACTION_SET_ORDER_LIST ='ACTION_SET_ORDER_LIST';
export const ACTION_CLEAR_EDIT_ORDER ='ACTION_CLEAR_EDIT_ORDER';

export const ACTION_SET_BILL_ORDER = 'ACTION_SET_BILL_ORDER';
export const ACTION_CLEAR_BILL_ORDER = 'ACTION_CLEAR_BILL_ORDER';


export function fetchList() {
    return (dispatch) => {
        OrderApi.getList().then((serverList) => {
            dispatch(setOrderList(serverList));
        });
    };
}

export function fetchOne(id) {
    return (dispatch) => {
        OrderApi.getOne(id).then((order) => {
            dispatch(setEditOrder(order));
        });
    };
}

export function deleteOrder(order) {
    return (dispatch) => {
        OrderApi.delete(order.id).then(() => {
            dispatch(remove(order));
        });
    };
}

export function fetchOneBill(id) {
    return (dispatch) => {
        OrderApi.getOne(id).then((order) => {
            dispatch(setBill(order));
        });
    };
}

export function fetchListBill(id) {
    return (dispatch) => {
        OrderApi.getList(id).then((order) => {
            dispatch(setBill(order));
        });
    };
}

export function save(order) {
    return (dispatch) => {
        if(order.id) {
            OrderApi.update(order.id, order).then((order) => {
                dispatch(updateList(order));
            });
        } else {
            OrderApi.create(order).then((serverOrder) => {
                dispatch(create(serverOrder));
            });
        }
    };

}

export function create(order) {
    return{ type: ACTION_CREATE_ORDER, payload: order};
}

export function remove(order) {
    return{ type: ACTION_DELETE_ORDER, payload: order};
}

export function setEditOrder(order) {
    return{ type: ACTION_SET_EDIT_ORDER, payload: order};
}

export function setBill(order) {
    return{ type: ACTION_SET_BILL_ORDER, payload: order};
}

export function clearEditOrder() {
    return{ type: ACTION_CLEAR_EDIT_ORDER};
}

export function clearBill() {
    return{ type: ACTION_CLEAR_BILL_ORDER};
}

export function updateList(order) {
    return{ type: ACTION_UPDATE_LIST, payload: order};
}

export function setOrderList(serverList) {
    return{ type: ACTION_SET_ORDER_LIST, payload: serverList};
}