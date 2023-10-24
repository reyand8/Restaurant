export class DishApi {
    static API = 'http://localhost:4000/dishes/'
    static request(error, url='', method='GET', body) {
        return fetch(DishApi.API + url, {
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
        return DishApi.request('Can not get dish list from server!')
    }

    static getOne(id){
        return DishApi.request('Can not get one dish from server!', id)
    }

    static create(data){
        return DishApi.request('Can not create dish on server!', '', 'POST', data)
    }

    static update(id, changes){
        return DishApi.request('Can not update dish on server!', id, 'PUT', changes)
    }

    static delete(id){
        return DishApi.request('Can not delete dish on server!', id, 'DELETE')
    }
}