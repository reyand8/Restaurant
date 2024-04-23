import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {Button, Card} from 'antd';
import { EditOutlined, DeleteOutlined}  from '@ant-design/icons';
import {deleteTable, createEditTable} from '../../store/actions/table';
import '../../App.css';

export default function GetTable({table}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onDeleteClick() {
        dispatch(deleteTable(table));
    }

    function onEditBtnClick() {
        dispatch(createEditTable(table));
        navigate(`/tables/${table.number}/edit/`);
    }

    return (
        <Card
            size="big"
            title={<h3>Table: {table.number}</h3>}
            extra={<Button className="button-style-card"
                onClick={onEditBtnClick}>
                <EditOutlined/>Edit
            </Button>}
            style={{width: 330}}>
            <Button className="button-style-card-danger"
                danger onClick={onDeleteClick}>
                <DeleteOutlined/>Delete
            </Button>
        </Card>
    );
}