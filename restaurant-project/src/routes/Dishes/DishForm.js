import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Row, Col, Form, Input, Upload, Space, Spin} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import {fetchOne, save} from '../../store/actions/dish';
import { selectDishEdit} from '../../store/selectors';
import '../../App.css';

const { TextArea } = Input;

const PRICE_TEMPLATE = /^\d{1,3}$/;


export default function DishForm () {
    const dishEdit = useSelector(selectDishEdit);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        if (id && !dishEdit?.id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id, dishEdit?.id]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    function onFinish (value) {
        const dish = {
            ...dishEdit,
            ...value,
        };
        dispatch(save(dish));
        navigate('/dishes');
    }

    if (id && !dishEdit?.id) {
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
            <Col span={8}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: 900, marginTop: '80px'}}
                    autoComplete="off"
                    initialValues={dishEdit}
                    onFinish={onFinish}>
                    <Form.Item label="Name" name="name"
                        rules={[
                            {
                                min: 3,
                                message: 'The name of the dish must be longer than 3 symbols',
                            },
                            {
                                required: true,
                                message: 'The field is required',
                            },
                        ]}>
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Description" name="description"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    let description = value.split(' ');
                                    if(description.length <= 5) {
                                        return Promise.reject(new
                                        Error('The description must be longer than 5 words'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                            {
                                required: true,
                                message: 'The field is required',
                            },
                        ]}>
                        <TextArea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/" listType="picture-card" disabled>
                            <div>
                                <PlusOutlined />
                                <div>
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Price" name="price"
                        rules={[
                            {
                                pattern: PRICE_TEMPLATE,
                                message: 'The price must be < 4 symbols',
                            },
                            {
                                required: true,
                                message: 'The field is required',
                            },
                        ]}>
                        <Input placeholder="Price" />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    let tags = value.split(' ');
                                    if(tags.length >= 3) {
                                        return Promise.reject(
                                            new Error('The tag can not be longer than 2 words'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                            {
                                required: true,
                                message: 'The field is required',
                            },
                            {
                                max: 10,
                                message: 'Your tag can not be longer than 10 symbols',
                            },
                        ]}>
                        <Input placeholder="Tag" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 14 }}>
                        <Button className="button-style" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}