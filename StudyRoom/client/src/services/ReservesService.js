import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('reserves', {
            params: {
                search: search
            }
        })
    },
    show(reserveId) {
        return Api().get('reserve/' + reserveId)
    },
    post(reserve) {
        return Api().post('reserve', reserve)
    },
    put(reserve) {
        return Api().put('reserve/' + reserve.id, reserve)
    },
    delete(reserve) {
        return Api().delete('reserve/' + reserve.id, reserve)
    },
}