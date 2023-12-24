export class OrderApi {
    static API = 'http://localhost:4000/orders/';
    static request(error, url='', method='GET', body) {
        return fetch(OrderApi.API + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(error);
        });
    }

    static getList() {
        return OrderApi.request('Can not get order list from server!');
    }

    static getOne(id){
        return OrderApi.request('Can not get one order from server!', id);
    }

    static create(data){
        return OrderApi.request('Can not create order on server!', '', 'POST', data);
    }

    static update(id, changes){
        return OrderApi.request('Can not update order on server!', id, 'PUT', changes);
    }

    static delete(id){
        return OrderApi.request('Can not delete order on server!', id, 'DELETE');
    }
}