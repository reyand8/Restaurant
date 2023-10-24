import { useEffect } from 'react'
import {selectWaiters} from '../../store/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchList } from '../../store/actions/waiter'
import { getWaiter } from "./getWaiter";
import {Button, Col, Row, Table} from "antd";
import {Link, useNavigate} from "react-router-dom";

export default function WaiterList () {
    const list = useSelector(selectWaiters)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const waiterColumns = getWaiter(dispatch, navigate)
    useEffect(() => {
        dispatch(fetchList())
    }, [dispatch])
    console.log(list)
    return (
        <div >
            <Row  justify='center'>
                <Col>
                    <Button className='button-style'>
                        <Link to='/waiters/create'>Add Waiter</Link>
                    </Button>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={7}>
                    <Table pagination = {{hideOnSinglePage: true}}
                           size='big' rowKey={'id'}
                           columns={waiterColumns}
                           dataSource={list} />
                </Col>
            </Row>
        </div>
    )
}