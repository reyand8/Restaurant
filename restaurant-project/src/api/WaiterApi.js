export class WaiterApi {
    static API = 'http://localhost:4000/waiters/'
    static request(error, url='', method='GET', body) {
        return fetch(WaiterApi.API + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }
            throw new Error(error)
        })
    }

    static getList() {
        return WaiterApi.request('Can not get waiter list from server!')
    }

    static getOne(id){
        return WaiterApi.request('Can not get one waiter from server!', id)
    }

    static create(data){
        return WaiterApi.request('Can not create waiter on server!', '', 'POST', data)
    }

    static update(id, changes){
        return WaiterApi.request('Can not update waiter on server!', id, 'PUT', changes)
    }

    static delete(id){
        return WaiterApi.request('Can not delete waiter on server!', id, 'DELETE')
    }
}