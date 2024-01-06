import {Button, Card} from 'antd';
import '../../App.css';
import {Link} from 'react-router-dom';

export default function GetWaiterDetails({waiterEdit}) {
    return (
        <Card size="big"
            title={ <div className="waiter-details-fullname">
                <p className="waiter-details-firstname">{waiterEdit.firstName}</p>
                <p className="waiter-details-lastname">{waiterEdit.lastName}</p>
            </div>}>
            <img className="waiter-details-photo" src={waiterEdit.photo} alt="img-detail"/>
            <div className="waiter-details-description">
                <p>Address: {waiterEdit.address}</p>
                <p>Phone: {waiterEdit.phone}</p>
            </div>
            <Link to="/orders">
                <Button className="button-style" htmlType="submit">
                    Orders
                </Button>
            </Link>

        </Card>
    );
}