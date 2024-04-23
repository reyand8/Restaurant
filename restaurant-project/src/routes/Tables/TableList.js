import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Row, Space} from 'antd';

import { fetchList } from '../../store/actions/table';
import GetTable from './getTable';
import {selectTables} from '../../store/selectors';


export default function Tables () {
    const list = useSelector(selectTables);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchList());
    }, [dispatch]);

    return (
        <div>
            <Row justify="center">
                <Col>
                    <Button className="button-style">
                        <Link to="/tables/create/">Add Table</Link>
                    </Button>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={17}>
                    <Space align="center" className="card-table" direction="horizontal" size="small">
                        {list.map(table => <GetTable table={table} key={table.id} />)}
                    </Space>
                </Col>
            </Row>
        </div>
    );
}