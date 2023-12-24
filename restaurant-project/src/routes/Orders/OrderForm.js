import {Form, Select, Space, Button, Input, Row, Col, Spin} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectOrderEdit, selectAction } from '../../store/selectors';
import { fetchNewOrders } from '../../store/actions/common';
import { save, fetchOne } from '../../store/actions/order';
import '../../App.css';
const { Option } = Select;
const ORDER_TEMPLATE = /^\d{1,3}$/;
export default function OrderForm() {
    const [form] = Form.useForm();
    let { id } = useParams();
    const orderEdit = useSelector(selectOrderEdit);
    const action = useSelector(selectAction);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && !orderEdit?.id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id, orderEdit?.id]);

    useEffect(() => {
        dispatch(fetchNewOrders());
    }, [dispatch]);

    function onFormSubmit(value) {
        let i = 1;
        const dishList = value.dishes.map((dish) => {
            return {
                id: i++,
                count: parseInt(dish.count),
                dishId: dish.dishId,
            };
        });
        const order = {
            ...orderEdit,
            ...value,
            'dishes': dishList,
        };
        dispatch(save(order));
        navigate('/');
    }

    if (id && !orderEdit?.id) {
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
        <Row style={{ margin: '30px '}} justify="center">
            <Col lg={8} md={14} sm={18}>
                <Form
                    form={form}
                    layout="horizontal"
                    onFinish={onFormSubmit}
                    initialValues={orderEdit}>
                    <Form.Item name="tableId" label="Table"
                        rules={[
                            {
                                required: true,
                                message: 'Choose a Table!',
                            },
                        ]}>
                        <Select style={{width: 240}} options={action.table}/>
                    </Form.Item>
                    <Form.Item name="waiterId" label="Waiter"
                        rules={[
                            {
                                required: true,
                                message: 'Choose a Waiter!',
                            },
                        ]}>
                        <Select style={{width: 234}} options={action.waiter}/>
                    </Form.Item>
                    <h3>Dishes</h3>
                    <Form.List name="dishes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline" wrap>
                                        <Form.Item noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.waiterId === curValues.waiterId}>
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'dishId']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Error',
                                                        },
                                                    ]}>
                                                    <Select placeholder="Dishes"
                                                        style={{width: 240}}>
                                                        {(action.dish).map((item) => (
                                                            <Option key={item.value} value={item.value}>
                                                                {item.label}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>)}
                                        </Form.Item>
                                        <Form.Item {...field} name={[field.name, 'count']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Input the count',
                                                },
                                                {
                                                    pattern: ORDER_TEMPLATE,
                                                    message: 'Your number is longer then 3 symbols!',
                                                },
                                            ]}>
                                            <Input placeholder="Count" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add New Dish
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                        <Button className="button-style" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}