import {Link} from 'react-router-dom';

import {Button, Card} from 'antd';

import '../../App.css';

export default function GetWaiterDetails({waiterEdit}) {
    const {firstName, lastName, photo, address, phone} = waiterEdit;
    return (
        <Card size="big"
            title={ <div className="waiter-details-fullname">
                <p className="waiter-details-firstname">{firstName}</p>
                <p className="waiter-details-lastname">{lastName}</p>
            </div>}>
            <img className="waiter-details-photo" src={photo} alt="img-detail"/>
            <div className="waiter-details-description">
                <p>Address: {address}</p>
                <p>Phone: {phone}</p>
            </div>
            <Link to="/orders">
                <Button className="button-style" htmlType="submit">
                    Orders
                </Button>
            </Link>
        </Card>
    );
}