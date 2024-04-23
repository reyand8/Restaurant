import {useDispatch, useSelector} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {useEffect} from 'react';

import {Button, Col,Row, Space} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

import GetWaiterDetails from './GetWaiterDetails';
import {fetchOne} from '../../store/actions/waiter';
import {selectWaiterEdit} from '../../store/selectors';

export default function WaiterDetails () {
    const waiterEdit = useSelector(selectWaiterEdit);
    let { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && !waiterEdit?.id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id, waiterEdit?.id]);


    return (
        <Row justify="center">
            <Col span={8} className="waiter-details">
                <Button className="button-style">
                    <Link to="/waiters"><ArrowLeftOutlined /> Return</Link>
                </Button>
                <Space align="center" wrap direction="horizontal" size="small">
                    <GetWaiterDetails waiterEdit={waiterEdit} key={waiterEdit.id}/>
                </Space>
            </Col>
        </Row>
    );
}