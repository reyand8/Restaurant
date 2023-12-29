import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Space, Button} from 'antd';
import { useEffect } from 'react';
import GetDetails from './GetDetails';
import {fetchOne} from '../../store/actions/dish';
import {selectDishEdit} from '../../store/selectors';
import { ArrowLeftOutlined}  from '@ant-design/icons';
import '../../App.css';


export default function DishDetails () {
    const dishEdit = useSelector(selectDishEdit);
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        if (id && !dishEdit?.id) {
            dispatch(fetchOne(id));
        }
    }, [dispatch, id, dishEdit?.id]);

    return (

        <Row justify="center">
            <Col span={8} className="dish-details">
                <Button className="button-style">
                    <Link to="/dishes"><ArrowLeftOutlined /> Return</Link>
                </Button>
                <Space align="center" wrap direction="horizontal" size="small">
                    <GetDetails dishEdit={dishEdit} key={dishEdit.id}/>
                </Space>
            </Col>
        </Row>
    );
}