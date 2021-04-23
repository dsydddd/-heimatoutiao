import axios from '@/utils/myaxios'
export const fileUpload = (data) => {
    return axios({
         method: 'post',
        url: `/upload`,
    data
        // headers: { Authorization: localStorage.getItem('heimatoken') }
    })
}