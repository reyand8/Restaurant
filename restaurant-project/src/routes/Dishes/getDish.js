import {Button, Space, Tag} from 'antd';
import { EditOutlined, DeleteOutlined}  from '@ant-design/icons';
import {deleteDish, createEditDish, clearEditDish} from '../../store/actions/dish';
import '../../App.css';
import './DishList';


export default function getDish(dispatch, navigate, searchedDish) {

    function onDeleteBtnClick(dish) {
        dispatch(deleteDish(dish));
    }

    function onEditBtnClick(dish) {
        dispatch(createEditDish(dish));
        navigate(`/dishes/${dish.id}/edit/`);
    }

    function onDetailBtnClick(dish){
        dispatch(clearEditDish());
        navigate(`/dishes/${dish.id}/details/`);
    }

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            filteredValue: [searchedDish],
            ellipsis: {
                showTitle: false,
            },
            onFilter: (value, record) => {
                return (
                    String(record.name).toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.description).toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.price).toLowerCase()
                        .includes(value.toLowerCase())
                );
            },
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'description',
            className: 'dish-image-display',
            align: 'center',
            render: (_, image) =>
                <img alt="img-food" className="dish-image" src={image.image}/>,

        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            align: 'center',
            className: 'dish-tags-display',
            render: (tags) => (
                <>
                    {tags.split(' ').map((tag) => {
                        return (
                            <Tag color="cyan" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
            className: 'dish-description-display',
            ellipsis: {
                showTitle: false,
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            className: 'price-display',
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, dish) => (
                <Space wrap className="dish-buttons">
                    <Button className="dish-list-button"
                        danger
                        onClick={() => onDeleteBtnClick(dish)}>
                        <DeleteOutlined />Delete
                    </Button>
                    <Button className="dish-list-button"
                        onClick={() =>
                            onEditBtnClick(dish)}>
                        <EditOutlined />Edit
                    </Button>
                    <Button className="dish-list-button-details"
                        onClick={() =>
                            onDetailBtnClick(dish)}>
                        Read more
                    </Button>
                </Space>
            ),
        },
    ];
}