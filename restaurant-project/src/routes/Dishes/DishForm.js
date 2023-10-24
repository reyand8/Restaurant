import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Row, Col, Form, Input, Upload, Tag} from 'antd'
import { useEffect } from 'react'

import {fetchOne, save} from '../../store/actions/dish'
import { selectDishEdit} from "../../store/selectors"
import '../../App.css'
import {PlusOutlined} from "@ant-design/icons";

const PRICE_TEMPLATE = /^\d{1,3}$/
import DishFormTags from './DishFormTags'


export default function DishForm () {
    const dishEdit = useSelector(selectDishEdit)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { id } = useParams()



    useEffect(() => {
        if (id && !dishEdit?.id) {
            dispatch(fetchOne(id))
        }
    }, [dispatch, id, dishEdit?.id])

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
        }
        dispatch(save(dish))
        navigate('/dishes')
    }

    if (id && !dishEdit?.id) {
        return <div>Loading...</div>
    }

    return (
        <Row justify='center'>
            <Col span={8}>
                <Form
                    labelCol={{ span: 8, }}
                    wrapperCol={{ span: 14, }}
                    style={{ maxWidth: 900, marginTop: '80px'}}
                    autoComplete="off"
                    initialValues={dishEdit}
                    onFinish={onFinish}>
                    <Form.Item label="Name" name="name"
                               rules={[
                                   {
                                       min: 3,
                                       message: 'Dish name must be longer than 3 symbols!',
                                   },
                                   {
                                       required: true,
                                       message: 'Please input dish name!',
                                   },
                               ]}>
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item label="Description" name="description"
                               rules={[
                                   () => ({
                                       validator(_, value) {
                                           let description = value.split(' ')
                                           if(description.length <= 5) {
                                               return Promise.reject(new Error('The description must be longer then 5 words!'));
                                           }
                                           return Promise.resolve();
                                       },
                                   }),
                                   {
                                       required: true,
                                       message: 'Please input dish description!',
                                   },
                               ]}>
                        <Input placeholder='Description'/>
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
                                       message: 'Dish price must be < 4 symbols',
                                   },
                                   {
                                       required: true,
                                       message: 'Please input dish price!',
                                   },
                               ]}>
                        <Input placeholder='Price' />
                    </Form.Item>
                    <Form.Item label="Tags" name="tags"
                               rules={[
                                   () => ({
                                       validator(_, value) {
                                           let tags = value.split(' ')
                                           if(tags.length >= 3) {
                                               return Promise.reject(
                                                   new Error('The tag can not be longer then 2 words!'));
                                           }
                                           return Promise.resolve();
                                       },
                                   }),
                                   {
                                       required: true,
                                       message: 'Please input dish description!',
                                   },
                                   {
                                       max: 10,
                                       message: 'Your tag can not be longer than 10 symbols!',
                                   },
                               ]}
                        >
                                <div className=''>
                                    {/*{dishEdit.tags.split(' ').map((tag) => {*/}
                                    {/*    return(*/}
                                    {/*        <Tag color="cyan" key={tag}>*/}
                                    {/*            {tag.toUpperCase()}*/}
                                    {/*        </Tag>*/}
                                    {/*    )*/}


                                    {/*})}*/}
                                <DishFormTags/>
                                </div>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 14, }}>
                        <Button className='button-style' htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}