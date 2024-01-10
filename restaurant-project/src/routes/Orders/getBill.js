export function getBill() {
    return [
        {
            title: 'Dish',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
        },
        {
            title: 'Amount',
            key: 'amount',
            align: 'center',
            render: (_, dish) => dish.count * dish.price,
        },
    ];
}