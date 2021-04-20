import axios from '@/utils/myaxios'
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login',
        data
    })
}