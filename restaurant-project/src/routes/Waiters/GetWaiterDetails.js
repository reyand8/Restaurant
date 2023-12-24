import {Button, Card} from 'antd';
import '../../App.css';

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
            <Button className="button-style" htmlType="submit">
                See orders
            </Button>
        </Card>
    );
}