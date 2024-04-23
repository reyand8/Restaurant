import {Card, Tag} from 'antd';
import '../../App.css';

export default function GetDish({dishEdit}) {

    const {name, description, price, image, tags} = dishEdit;

    return (
        <Card
            size="big"
            title={<h4>{name}</h4>}
            className="card-dish-detail">
            <p className="card-dish-detail-description">{description}</p>
            <div className="card-dish-detail-price">
                <p >Price: {price}</p>
            </div>
            <img src={image} alt="img-detail"/>
            <div className="card-dish-detail-tags">
                <p>Tags: </p>
                {tags.split(' ').map((tag) => {
                    return(
                        <Tag color="cyan" key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </div>
        </Card>
    );
}