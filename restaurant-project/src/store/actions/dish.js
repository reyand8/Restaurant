import { DishApi } from '../../api/DishApi';


export const ACTION_CREATE_DISH ='ACTION_CREATE_DISH';
export const ACTION_CREATE_EDIT_DISH ='ACTION_CREATE_EDIT_DISH';
export const ACTION_DELETE_DISH ='ACTION_DELETE_DISH';
export const ACTION_UPDATE_LIST ='ACTION_UPDATE_LIST';
export const ACTION_SET_DISH_LIST ='ACTION_SET_DISH_LIST';
export const ACTION_CLEAR_EDIT_DISH ='ACTION_CLEAR_EDIT_DISH';


export function fetchList() {
    return (dispatch) => {
        DishApi.getList()
            .then((serverList) => {
                dispatch(setDishList(serverList));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function fetchOne(id) {
    return (dispatch) => {
        DishApi.getOne(id)
            .then((dish) => {
                dispatch(createEditDish(dish));
            })
            .catch((error) => {
                console.log(error);
            });

    };
}

export function deleteDish(dish) {
    return (dispatch) => {
        DishApi.delete(dish.id)
            .then(() => {
                dispatch(remove(dish));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function save(dish) {
    return (dispatch) => {
        if(dish.id) {
            DishApi.update(dish.id, dish)
                .then((dish) => {
                    dispatch(updateList(dish));
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            DishApi.create(dish)
                .then((serverTable) => {
                    dispatch(create(serverTable));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
}

export function create(dish) {
    return{ type: ACTION_CREATE_DISH, payload: dish};
}

export function remove(dish) {
    return{ type: ACTION_DELETE_DISH, payload: dish};
}

export function createEditDish(dish) {
    return{ type: ACTION_CREATE_EDIT_DISH, payload: dish};
}

export function clearEditDish() {
    return{ type: ACTION_CLEAR_EDIT_DISH};
}

export function updateList(dish) {
    return{ type: ACTION_UPDATE_LIST, payload: dish};
}

export function setDishList(serverList) {
    return{ type: ACTION_SET_DISH_LIST, payload: serverList};
}