import { Table, Row, Col, Button, Space } from 'antd'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { fetchOneBill, deleteOrder, clearBill } from '../../store/actions/order'
import { selectBill, selectDishes} from '../../store/selectors'
import { fetchNewOrders } from '../../store/actions/common'
import { getBill } from './getBill'
import '../../App.css'
export default function OrderBill() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dishList = useSelector(selectDishes)
    const order = useSelector(selectBill)
    const orderDishesList = order.dishes
    const dishArrayOrder = getDishArray(orderDishesList, dishList)
    let { id } = useParams()
    const bill = getBill()


    const total = dishArrayOrder.reduce((acc, dish) => {
        acc += (dish.count * dish.price)
        return acc
    }, 0)

    useEffect(() => {
        if (id && !order?.id) {
            dispatch(fetchOneBill(id))
        }
    }, [dispatch, id, order?.id])

    useEffect(() => {
        dispatch(fetchNewOrders())
    }, [dispatch])

    function getDishArray(orderDishesList, dishList) {
        let allDishes = []
        for (let order of orderDishesList) {
            for (let dish of dishList) {
                if (order.dishId === dish.id) {
                    allDishes.push({
                        ...order,
                        price: dish.price,
                        name: dish.name,
                    })
                }
            }
        }
        return allDishes
    }

    function onNextPageClick() {
        dispatch(clearBill())
        navigate('/orders')
    }

    function onDeleteBtnClick() {
        dispatch(deleteOrder(order))
        navigate('/orders')
    }

    if (id && !order?.id) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='order-bill'>
            <Row className='order-bill-options'>
                <Col >
                    <Space>
                        <Button onClick={onNextPageClick}>Return</Button>
                        <Button danger onClick={onDeleteBtnClick}>Delete</Button>
                    </Space>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={10}>
                    <Table pagination={{ hideOnSinglePage: true }}
                           dataSource={dishArrayOrder}
                           className='order-bill-table'
                           rowKey={'id'}
                           columns={bill} />
                </Col>
            </Row>
            <div className='order-bill-total'>
                <p>Total: {total}</p>
            </div>

            <Link className='order-bill-pay' level={5} to='/orders/pay'>
                <Button>PAY</Button>
            </Link>
        </div>
    )
}