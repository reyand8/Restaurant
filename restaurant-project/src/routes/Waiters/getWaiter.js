import {deleteWaiter, clearEditWaiter} from '../../store/actions/waiter';
import {DeleteOutlined, DownOutlined, EditOutlined} from '@ant-design/icons';
import {Button, Dropdown, Space} from 'antd';
export function getWaiter(dispatch, navigate) {
    function onDeleteClick(waiter) {
        dispatch(deleteWaiter(waiter));
    }

    function onEditBtnClick(waiter) {
        navigate(`/waiters/${waiter.id}/edit/`);
        dispatch(clearEditWaiter());
    }

    function onDetailBtnClick(waiter){
        navigate(`/waiters/${waiter.id}/details/`);
        dispatch(clearEditWaiter());
    }

    return [
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            align: 'center',
        },
        {
            title: 'Surname',
            dataIndex: 'lastName',
            key: 'lastName',
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: (_, waiter) => (
                <Space wrap>
                    <Button className="button-details" onClick={() => onDetailBtnClick(waiter)}>Details</Button>
                    <Dropdown
                        menu={{ items: [
                            {
                                key: '1',
                                label: (
                                    <Button className="waiter-button-action"
                                        onClick={() => onEditBtnClick(waiter)}><EditOutlined />Edit</Button>
                                ),
                            },
                            {
                                key: '2',
                                label: (
                                    <Button className="waiter-button-action" danger
                                        onClick={() => onDeleteClick(waiter)}><DeleteOutlined />Delete</Button>
                                ),
                            },
                        ],
                        }}>
                        <a>
                            <Space>
                                <Button>Actions<DownOutlined /></Button>
                            </Space>
                        </a>
                    </Dropdown>
                </Space>
            ),
        },
    ];
}