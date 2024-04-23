import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Col, Row, Table} from 'antd';

import {selectWaiters} from '../../store/selectors';
import { fetchList } from '../../store/actions/waiter';
import { getWaiter } from './getWaiter';


export default function WaiterList () {
    const list = useSelector(selectWaiters);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const waiterColumns = getWaiter(dispatch, navigate);

    useEffect(() => {
        dispatch(fetchList());
    }, [dispatch]);

    return (
        <div >
            <Row  justify="center">
                <Col>
                    <Button className="button-style">
                        <Link to="/waiters/create">Add Waiter</Link>
                    </Button>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={7}>
                    <Table pagination = {{hideOnSinglePage: true}}
                        size="big" rowKey={'id'}
                        columns={waiterColumns}
                        dataSource={list} />
                </Col>
            </Row>
        </div>
    );
}