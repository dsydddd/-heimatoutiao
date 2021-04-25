import axios from '@/utils/myaxios'
export const getCateList = () => {
    return axios({
         method: 'get',
        url: '/category',
    })
}