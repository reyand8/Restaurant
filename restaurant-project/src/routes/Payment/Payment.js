import React from 'react';
import {Space, Spin} from 'antd';
import '../../App.css';



export default function Payment() {
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



