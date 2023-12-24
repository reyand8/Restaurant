import { TableApi } from '../../api/TableApi';

export const ACTION_CREATE_TABLE ='ACTION_CREATE_TABLE';
export const ACTION_CREATE_EDIT_TABLE ='ACTION_CREATE_EDIT_TABLE';
export const ACTION_DELETE_TABLE ='ACTION_DELETE_TABLE';
export const ACTION_UPDATE_LIST ='ACTION_UPDATE_LIST';
export const ACTION_SET_TABLE_LIST ='ACTION_SET_TABLE_LIST';
export const ACTION_CLEAR_EDIT_TABLE ='ACTION_CLEAR_EDIT_TABLE';


export function fetchList() {
    return (dispatch) => {
        TableApi.getList().then((serverList) => {
            dispatch(setTableList(serverList));
        });
    };
}

export function fetchOne(id) {
    return (dispatch) => {
        TableApi.getOne(id).then((table) => {
            dispatch(createEditTable(table));
        });
    };
}

export function deleteTable(table) {
    return (dispatch) => {
        TableApi.delete(table.id).then(() => {
            dispatch(remove(table));
        });
    };
}

export function save(table) {
    return (dispatch) => {
        if(table.id) {
            TableApi.update(table.id, table).then((table) => {
                dispatch(updateList(table));
            });
        } else {
            TableApi.create(table).then((serverTable) => {
                dispatch(create(serverTable));
            });
        }
    };
}

export function create(table) {
    return{ type: ACTION_CREATE_TABLE, payload: table};
}

export function remove(table) {
    return{ type: ACTION_DELETE_TABLE, payload: table};
}

export function createEditTable(table) {
    return{ type: ACTION_CREATE_EDIT_TABLE, payload: table};
}

export function updateList(table) {
    return{ type: ACTION_UPDATE_LIST, payload: table};
}

export function setTableList(serverList) {
    return{ type: ACTION_SET_TABLE_LIST, payload: serverList};
}