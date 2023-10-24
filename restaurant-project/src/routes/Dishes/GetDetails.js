import {Card, Tag} from "antd"
import '../../App.css'

export default function GetDish({dishEdit}) {
    return (
        <Card
            size="big"
            title={<h4>{dishEdit.name}</h4>}
            className='card-dish-detail'>
            <p className='card-dish-detail-description'>{dishEdit.description}</p>
            <div className='card-dish-detail-price'>
                <p >Price: {dishEdit.price}</p>
            </div>
            <img src={dishEdit.image} alt="img-detail"/>
            <div className='card-dish-detail-tags'>
                <p>Tags: </p>
                {dishEdit.tags.split(' ').map((tag) => {
                    return(
                            <Tag color="cyan" key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        )
                })}
            </div>
        </Card>
    )
}