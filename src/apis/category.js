import axios from '@/utils/myaxios'
export const getCategory = () => {
    return axios({
         method: 'get',
        url: `/category`,
    })
}