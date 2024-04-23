import { WaiterApi } from '../../api/WaiterApi';

export const ACTION_CREATE_WAITER ='ACTION_CREATE_WAITER';
export const ACTION_CREATE_EDIT_WAITER ='ACTION_CREATE_EDIT_CONTACT';
export const ACTION_DELETE_WAITER ='ACTION_CREATE_EDIT_WAITER';
export const ACTION_UPDATE_LIST ='ACTION_UPDATE_LIST';
export const ACTION_SET_WAITER_LIST ='ACTION_SET_WAITER_LIST';
export const ACTION_CLEAR_EDIT_WAITER ='ACTION_CLEAR_EDIT_WAITER';


export function fetchList() {
    return (dispatch) => {
        WaiterApi.getList()
            .then((serverList) => {
                dispatch(setWaiterList(serverList));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function fetchOne(id) {
    return (dispatch) => {
        WaiterApi.getOne(id)
            .then((waiter) => {
                dispatch(createEditWaiter(waiter));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function deleteWaiter(waiter) {
    return (dispatch) => {
        WaiterApi.delete(waiter.id)
            .then(() => {
                dispatch(remove(waiter));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function save(waiter) {
    return (dispatch) => {
        if(waiter.id) {
            WaiterApi.update(waiter.id, waiter)
                .then((waiter) => {
                    dispatch(updateList(waiter));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            WaiterApi.create(waiter)
                .then((serverWaiter) => {
                    dispatch(create(serverWaiter));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
}

export function create(waiter) {
    return{ type: ACTION_CREATE_WAITER, payload: waiter};
}

export function remove(waiter) {
    return{ type: ACTION_DELETE_WAITER, payload: waiter};
}

export function createEditWaiter(waiter) {
    return{ type: ACTION_CREATE_EDIT_WAITER, payload: waiter};
}

export function clearEditWaiter() {
    return{ type: ACTION_CLEAR_EDIT_WAITER};
}

export function updateList(waiter) {
    return{ type: ACTION_UPDATE_LIST, payload: waiter};
}

export function setWaiterList(serverList) {
    return{ type: ACTION_SET_WAITER_LIST, payload: serverList};
}