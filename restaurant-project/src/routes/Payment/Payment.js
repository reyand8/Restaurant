import React from 'react';
import {Space, Spin} from 'antd';
import '../../App.css'
import {createEditTable} from "../../store/actions/table";

function onEditBtnClick() {

    navigate(`/tables/${table.number}/edit/`)
}
export default function Payment() {
    return (
        <div className='payment'>
            <Space>
                <Spin tip="Loading" size="large">
                    <div className="payment-information" />
                </Spin>
            </Space>
        </div>

    )
}



