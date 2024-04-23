import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, Button } from 'antd';

import { selectAllOrders } from '../../store/selectors';
import { getOrder } from './getOrder';
import { fetchCommonOrders } from '../../store/actions/common';
import '../../App.css';

export default function OrderList () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const columns = getOrder(dispatch, navigate);
    const list = useSelector(selectAllOrders);


    useEffect(() => {
        dispatch(fetchCommonOrders());
    }, [dispatch]);

    return (
        <div>
            <Row justify="center">
                <Col>
                    <Button className="button-style">
                        <Link to="/orders/create">Add Order</Link>
                    </Button>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={17}>
                    <Table rowKey={'id'} columns={columns} dataSource={list} />
                </Col>
            </Row>
        </div>
    );
}