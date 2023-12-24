import { Button, Space } from 'antd';
import {clearBill, clearEditOrder} from '../../store/actions/order';
import '../../App.css';
export function getOrder (dispatch, navigate) {
    function onBillBtnClick(order) {
        navigate(`/orders/${order.id}/bill`);
        dispatch(clearBill());
    }

    function onEditBtnClick(order) {
        navigate(`/orders/${order.id}/edit`);
        dispatch(clearEditOrder());
    }

    return [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Waiter',
            dataIndex: 'waiterId',
            key: 'waiterId',
            render: (_, record) => record.waiter.firstName,
        },
        {
            title: 'Table',
            dataIndex: 'tableId',
            key: 'tableId',
            render: (_, record) => record.table.number,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, order) => (
                <Space wrap>
                    <Button className="button-style-get-bill" onClick={() => onBillBtnClick(order)}>Get Bill</Button>
                    <Button onClick={() => onEditBtnClick(order)}>Edit</Button>
                </Space>
            ),
        },
    ];
}