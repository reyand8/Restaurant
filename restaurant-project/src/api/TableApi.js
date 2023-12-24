export class TableApi {
    static API = 'http://localhost:4000/tables/';
    static request(error, url='', method='GET', body) {
        return fetch(TableApi.API + url, {
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
        return TableApi.request('Can not get table list from server!');
    }

    static getOne(id){
        return TableApi.request('Can not get one table from server!', id);
    }

    static create(data){
        return TableApi.request('Can not create table on server!', '', 'POST', data);
    }

    static update(id, changes){
        return TableApi.request('Can not update table on server!', id, 'PUT', changes);
    }

    static delete(id){
        return TableApi.request('Can not delete table on server!', id, 'DELETE');
    }
}