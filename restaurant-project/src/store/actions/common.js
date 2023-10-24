import { OrderApi } from '../../api/OrderApi'
import { TableApi } from '../../api/TableApi'
import { WaiterApi } from '../../api/WaiterApi'
import {DishApi} from "../../api/DishApi"
import { setOrderList } from './order'
import { setTableList } from './table'
import { setWaiterList } from './waiter'
import { setDishList } from "./dish"

export function fetchCommonOrders () {
    return (dispatch) => {
        Promise.all([
            OrderApi.getList(),
            TableApi.getList(),
            WaiterApi.getList(),
        ]).then((res) => {
            dispatch(setOrderList(res[0]))
            dispatch(setTableList(res[1]))
            dispatch(setWaiterList(res[2]))
        })
    }
}

export function fetchNewOrders() {
    return (dispatch) => {
        Promise.all([
            TableApi.getList(),
            WaiterApi.getList(),
            DishApi.getList(),
        ])
            .then((res) => {
                dispatch(setTableList(res[0]))
                dispatch(setWaiterList(res[1]))
                dispatch(setDishList(res[2]))
            })

    }
}