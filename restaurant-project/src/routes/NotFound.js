import React from 'react';
import { Button, Result } from 'antd';
import '../App.css';
import {Link} from 'react-router-dom';

export default function NotFunction() {
    return (
        <Result
            status="warning"
            title="The page is not found"
            extra={
                <Button className="button-style" key="console">
                    <Link to="/">Go Back</Link>
                </Button>
            }
        />
    );
}



