import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Row, Col, Form, Input, Space, Spin} from 'antd';
import React, { useEffect } from 'react';

import {selectTables, selectTableEdit} from '../../store/selectors';
import {fetchOne, save} from '../../store/actions/table';

const TABLE_TEMPLATE = /^\d{1,2}$/;

export default function TableForm () {
    const tableEdit = useSelector(selectTableEdit);
    const list = useSelector(selectTables);
    let { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id && !tableEdit?.id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id, tableEdit?.id]);

    function onFinish (value) {
        const table = {
            ...tableEdit,
            ...value,
        };
        dispatch(save(table));
        navigate('/tables');
    }

    if (id && !tableEdit?.id) {
        return (
            <div className="data-loading">
                <Space>
                    <Spin tip="Loading" size="large">
                        <div className="loading-information" />
                    </Spin>
                </Space>
            </div>
        );
    }

    return (
        <Row justify="center">
            <Col span={6}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    style={{ marginTop: '80px'}}
                    autoComplete="off"
                    initialValues={tableEdit}
                    onFinish={onFinish}>
                    <Form.Item
                        label="Number"
                        name="number"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    for(let table of list) {
                                        if(table.number === Number(value)) {
                                            return Promise.reject(new Error('Error! Create a new table'));
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            }),
                            {
                                pattern: TABLE_TEMPLATE,
                                message: 'Error! Your number is longer than 3 symbols',
                            },
                            {
                                required: true,
                                message: 'The field is required',
                            },
                        ]}>
                        <Input placeholder="Number"/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                        <Button className="button-style" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}