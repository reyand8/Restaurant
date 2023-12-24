import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {selectDishes} from '../../store/selectors';
import getDish from './getDish';
import {fetchList} from '../../store/actions/dish';
import {Button, Col, Row, Table, Input} from 'antd';
import '../../App.css';


export default function DishList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector(selectDishes);
    const [searchedDish, setSearchedDish] = useState('');
    const dishColumns = getDish(dispatch, navigate, searchedDish);
    useEffect(() => {
        dispatch(fetchList());
    }, [dispatch]);

    return (
        <div>
            <Row justify="center">
                <Col>
                    <Button className="button-style" >
                        <Link to="/dishes/create/">Add dish</Link>
                    </Button>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={18}>
                    <Input.Search
                        placeholder="Search here..."
                        className="input-search-dishes"
                        data={searchedDish}
                        onSearch={(value) => {
                            setSearchedDish(value);
                        }}
                        onChange={(e) => {
                            setSearchedDish(e.target.value);
                        }}
                    />
                </Col>
            </Row>
            <Row justify="center">
                <Col span={18}>
                    <Table
                        size="middle"
                        rowKey={'id'}
                        columns={dishColumns}
                        dataSource={list}
                    />
                </Col>
            </Row>
        </div>
    );
}